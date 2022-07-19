import 'whatwg-fetch'
import './style.css'

document.querySelector('#app').innerHTML = `
  <form class="captcha-form" action="" id="captcha-form">
    <div class="captcha-container">
      <img src="" alt="" id="captcha-image" class="captcha-image">
      <a href="#" id="retry-captcha-button" class="retry-button">
        Другой код
      </a>
    </div>
    <div class="submit-container">
      <div class="input-container">
        <label for="entered-captcha">Введите код:</label>
        <input type="text" class="captcha-input" id="entered-captcha" autocomplete="off">
      </div>
      <button class="validate-button" id="validate-captcha-button" type="submit" disabled>
        Отправить
      </button>
    </div>
    <input type="text" hidden id="captcha-uuid">
  </form>
`

const enteredCaptchaInput = document.getElementById('entered-captcha');
const validateCaptchaButton = document.getElementById('validate-captcha-button');
const retryCaptchaButton = document.getElementById('retry-captcha-button');
const captchaImageElement = document.getElementById('captcha-image');
const captchaUuid = document.getElementById('captcha-uuid');

const checkIfFormValid = (value) => value.replace(/\s+/g, '').length !== 0;

const handleDataChange = (e) => {
  validateCaptchaButton.disabled = !checkIfFormValid(e.target.value);
}

enteredCaptchaInput.addEventListener('input', handleDataChange);

const isDev = window.location.origin.startsWith('file');

const apiUrl = isDev ? 'http://localhost:3000' : window.location.origin;
const captchaEndpoint = `${isDev ? '' : 'api'}/v3/auth/captcha`;


function getHeaders() {
  const headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Cache-control', 'no-cache');
  headers.append('Cache-control', 'no-store');
  headers.append('Pragma', 'no-cache');
  headers.append('Accept', 'application/vnd.smartspace.v2.13+json');
  headers.append('Accept-Language', 'ru-RU');

  return headers;
}

function getOptions(method, options) {
  return {
    method,
    mode: 'cors',
    body: JSON.stringify(options.body),
    headers: getHeaders(),
  };
}

function send(url, options) {
  return fetch(`${apiUrl}/${url}`, options)
    .then(async (response) => {
      return {
        body: response.status !== 204 ? await response.json() : {},
        status: response.status
      }
    }).catch((error) => error);
}

function getMethod(method) {
  return function (url, options = {}) {
    return send(url, getOptions(method, options));
  };
}

const api = {
  get: getMethod('GET'),
  post: getMethod('POST'),
};

const retry = (e) => {
  if (e) {
    e.preventDefault();
  }
  api.post(`${captchaEndpoint}/create/`).then(response => {
    captchaImageElement.src = response.body.data.data;
    captchaUuid.value = response.body.data.uuid;
    validateCaptchaButton.disabled = true;
    enteredCaptchaInput.value = "";
  })
  return false;
};

const validate = (e) => {
  if (e) {
    e.preventDefault();
  }
  if (!checkIfFormValid(enteredCaptchaInput.value)) {
    return;
  }
  const captcha = {
    data: enteredCaptchaInput.value,
    uuid: captchaUuid.value,
  }
  api.post(`${captchaEndpoint}/validate/`, {
    body: {
      data: enteredCaptchaInput.value,
      uuid: captchaUuid.value,
    }
  }).then((response) => {
    if (response.status === 204) {
      const windowObject = window;
      if (windowObject.webkit && windowObject.webkit.messageHandlers && windowObject.webkit.messageHandlers.captcha) {
        windowObject.webkit.messageHandlers.captcha.postMessage(JSON.stringify(captcha));
      }
      try {
        if (JsToAndroidBridge && JsToAndroidBridge.sendData) {
          JsToAndroidBridge.sendData(JSON.stringify(captcha));
        } else {
          console.error('JsToAndroidBridge is undefined');
        }
      } catch {
      }
    } else if (response.status === 400) {
      retry();
    }
  })
}

validateCaptchaButton.onclick = validate;
retryCaptchaButton.onclick = retry;

retry();
