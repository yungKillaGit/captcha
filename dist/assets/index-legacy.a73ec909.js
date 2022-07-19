!function(){var t=document.createElement("style");t.innerHTML="body,html{height:100%}body{background-color:#f1f2f2;overflow:hidden}.container{align-items:center;justify-content:center;display:flex;height:100%}.captcha-container{display:flex;flex-direction:column;width:200px}.submit-container{margin-top:16px;display:flex}.captcha-form{border:1px solid #ccc;padding:16px 32px;display:inline-block}.captcha-input{width:200px;padding:8px;box-sizing:border-box}.validate-button{margin-left:8px;margin-top:auto}input,button{border:1px solid #CCC;padding-top:8px;padding-bottom:8px;border-radius:0}button{padding-left:16px;padding-right:16px}input,button,label,a{font-size:14px;line-height:20px}input:focus-visible{outline:none}button{cursor:pointer}button:disabled{cursor:initial}button:hover:not(:disabled){background:rgba(0,0,0,.05)}.retry-button{margin-top:8px}.input-container{display:flex;flex-direction:column}@media (max-width: 425px){.captcha-form{padding:8px 16px}input,button,label,a{font-size:12px;line-height:16px}.captcha-container,.captcha-input{width:160px}}\n",document.head.appendChild(t),System.register([],(function(){"use strict";return{execute:function(){document.querySelector("#app").innerHTML='\n  <form class="captcha-form" action="" id="captcha-form">\n    <div class="captcha-container">\n      <img src="" alt="" id="captcha-image" class="captcha-image">\n      <a href="#" id="retry-captcha-button" class="retry-button">\n        Другой код\n      </a>\n    </div>\n    <div class="submit-container">\n      <div class="input-container">\n        <label for="entered-captcha">Введите код:</label>\n        <input type="text" class="captcha-input" id="entered-captcha" autocomplete="off">\n      </div>\n      <button class="validate-button" id="validate-captcha-button" type="submit" disabled>\n        Отправить\n      </button>\n    </div>\n    <input type="text" hidden id="captcha-uuid">\n  </form>\n';const t=document.getElementById("entered-captcha"),e=document.getElementById("validate-captcha-button"),n=document.getElementById("retry-captcha-button"),a=document.getElementById("captcha-image"),i=document.getElementById("captcha-uuid"),o=t=>0!==t.replace(/\s+/g,"").length;t.addEventListener("input",(t=>{e.disabled=!o(t.target.value)}));const c=window.location.origin.startsWith("file"),d=c?"http://localhost:3000":window.location.origin,r=(c?"":"api")+"/v3/auth/captcha";function p(){const t=new Headers;return t.append("Content-Type","application/json"),t.append("Cache-control","no-cache"),t.append("Cache-control","no-store"),t.append("Pragma","no-cache"),t.append("Accept","application/vnd.smartspace.v2.13+json"),t.append("Accept-Language","ru-RU"),t}function s(t){return function(e,n={}){return function(t,e){return fetch(`${d}/${t}`,e).then((async t=>({body:204!==t.status?await t.json():{},status:t.status}))).catch((t=>t))}(e,function(t,e){return{method:t,mode:"cors",body:JSON.stringify(e.body),headers:p()}}(t,n))}}const u={get:s("GET"),post:s("POST")},l=n=>(n&&n.preventDefault(),u.post(`${r}/create/`).then((n=>{a.src=n.body.data.data,i.value=n.body.data.uuid,e.disabled=!0,t.value=""})),!1);e.onclick=e=>{if(e&&e.preventDefault(),!o(t.value))return;const n={data:t.value,uuid:i.value};u.post(`${r}/validate/`,{body:{data:t.value,uuid:i.value}}).then((t=>{if(204===t.status){const t=window;t.webkit&&t.webkit.messageHandlers&&t.webkit.messageHandlers.captcha&&t.webkit.messageHandlers.captcha.postMessage(JSON.stringify(n));try{JsToAndroidBridge&&JsToAndroidBridge.sendData?JsToAndroidBridge.sendData(JSON.stringify(n)):console.error("JsToAndroidBridge is undefined")}catch{}}else 400===t.status&&l()}))},n.onclick=l,l()}}}))}();