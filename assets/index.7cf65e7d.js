const m=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const c of a)if(c.type==="childList")for(const r of c.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function n(a){const c={};return a.integrity&&(c.integrity=a.integrity),a.referrerpolicy&&(c.referrerPolicy=a.referrerpolicy),a.crossorigin==="use-credentials"?c.credentials="include":a.crossorigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function o(a){if(a.ep)return;a.ep=!0;const c=n(a);fetch(a.href,c)}};m();console.log(1);document.querySelector("#app").innerHTML=`
  <form class="captcha-form" action="" id="captcha-form">
    <div class="captcha-container">
      <img src="" alt="" id="captcha-image" class="captcha-image">
      <a href="#" id="retry-captcha-button" class="retry-button">
        \u0414\u0440\u0443\u0433\u043E\u0439 \u043A\u043E\u0434
      </a>
    </div>
    <div class="submit-container">
      <div class="input-container">
        <label for="entered-captcha">\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043A\u043E\u0434:</label>
        <input type="text" class="captcha-input" id="entered-captcha" autocomplete="off">
      </div>
      <button class="validate-button" id="validate-captcha-button" type="submit" disabled>
        \u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C
      </button>
    </div>
    <input type="text" hidden id="captcha-uuid">
  </form>
`;const i=document.getElementById("entered-captcha"),d=document.getElementById("validate-captcha-button"),y=document.getElementById("retry-captcha-button"),b=document.getElementById("captcha-image"),s=document.getElementById("captcha-uuid"),p=t=>t.replace(/\s+/g,"").length!==0,v=t=>{d.disabled=!p(t.target.value)};i.addEventListener("input",v);const h=window.location.origin.startsWith("file"),w=h?"http://localhost:3000":window.location.origin,f=`${h?"":"api"}/v3/auth/captcha`;function B(){const t=new Headers;return t.append("Content-Type","application/json"),t.append("Cache-control","no-cache"),t.append("Cache-control","no-store"),t.append("Pragma","no-cache"),t.append("Accept","application/vnd.smartspace.v2.13+json"),t.append("Accept-Language","ru-RU"),t}function E(t,e){return{method:t,mode:"cors",body:JSON.stringify(e.body),headers:B()}}function O(t,e){return fetch(`${w}/${t}`,e).then(async n=>({body:n.status!==204?await n.json():{},status:n.status})).catch(n=>n)}function u(t){return function(e,n={}){return O(e,E(t,n))}}const g={get:u("GET"),post:u("POST")},l=t=>(t&&t.preventDefault(),g.post(`${f}/create/`).then(e=>{b.src=e.body.data.data,s.value=e.body.data.uuid,d.disabled=!0,i.value=""}),!1),I=t=>{if(t&&t.preventDefault(),!p(i.value))return;const e={data:i.value,uuid:s.value};g.post(`${f}/validate/`,{body:{data:i.value,uuid:s.value}}).then(n=>{if(n.status===204){const o=window;o.webkit&&o.webkit.messageHandlers&&o.webkit.messageHandlers.captcha&&o.webkit.messageHandlers.captcha.postMessage(JSON.stringify(e));try{JsToAndroidBridge&&JsToAndroidBridge.sendData?JsToAndroidBridge.sendData(JSON.stringify(e)):console.error("JsToAndroidBridge is undefined")}catch{}}else n.status===400&&l()})};d.onclick=I;y.onclick=l;l();
