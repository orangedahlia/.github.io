window.ikeaExternalScriptOptions={"onetrust":{"id":2,"apiKey":"80238e1a-3de0-4556-9817-3c9165b937f2"},"episod":{"id":2,"cookieDomain":".ikea.com","url":"https://web-api.ikea.com/episod/collect","xClientId":"1ea83eeb-f16f-43d0-a11d-2487f62fb456","event_origin":null},"ga":{"id":2,"trackingIds":"G-S4EX53B760","excludeForIsoCountries":null},"sentry":{"id":2,"dsn":"https://dbd2cafcc55a561881245207e11f7211@o514642.ingest.us.sentry.io/4507106698199040","env":"production","scriptSrc":"https://browser.sentry-cdn.com/8.13.0/bundle.tracing.min.js","scriptIntegrity":"sha384-0YohlrzdhGO81o6MqwpgXfqbvuKV5lSBVh5u0cawd/jCBdhuMALsDYh8VxPACmeW","sampleRate":0.1,"tracesSampleRate":0.1,"replaysSessionSampleRate":null,"replaysOnErrorSampleRate":null}};// See docs/onetrust.md for details

(function initOnetrust() {
  let currentCategories;

  window.OptanonWrapper = function () {
    _initCustomCookie();

    _setCurrentCategoriesOnInitial();

    _onCategoryEnableChanged((enabledCategories) =>
      _onCookieChange(enabledCategories)
    );
  };

  function _setCurrentCategoriesOnInitial() {
    if (!currentCategories) {
      currentCategories =
        window.OnetrustActiveGroups &&
        window.OnetrustActiveGroups.split(',').filter((x) => x);
    }
  }

  function _onCookieChange(enabledCategories) {
    const hasRemovedConsent = !currentCategories.every((cC) =>
      enabledCategories.includes(cC)
    );

    if (hasRemovedConsent) {
      window.location.reload();
    }
    currentCategories = enabledCategories;
  }

  function _onCategoryEnableChanged(callbackFn) {
    window.addEventListener('OneTrustGroupsUpdated', (e) => {
      callbackFn(e.detail || []);
    });
  }

  function _initCustomCookie() {
    var opts = {
      domain: '.' + window.location.hostname,
      onetrustCookieName: 'OptanonAlertBoxClosed',
      customCookieName: 'interIkeaConsent',
      customCookieVersion: 'v1.0',
    };

    var hasOnetrustCookie = !!_getCookie(opts.onetrustCookieName);
    var hasCustomCookie =
      _getCookie(opts.customCookieName) === opts.customCookieVersion;
    var shouldHideBanner = hasOnetrustCookie || hasCustomCookie;

    if (shouldHideBanner) {
      _setCookie(opts.customCookieName, opts.customCookieVersion, 365, false);
      _setCookie(opts.onetrustCookieName, '', -1, opts.domain);
      document.querySelector('html').classList.add('onetrust-box-closed');
    }
  }

  function _getCookie(cname) {
    var name = cname + '=';
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }
  function _setCookie(cname, cvalue, exdays, domain) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = 'expires=' + d.toUTCString();
    var setDomain = domain ? 'domain=' + domain + ';' : '';
    document.cookie =
      cname + '=' + cvalue + ';' + setDomain + expires + ';path=/';
  }
})();
"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;!function(){function e(e){var t=!0,n=!1,o=null,d={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function i(e){return!!(e&&e!==document&&"HTML"!==e.nodeName&&"BODY"!==e.nodeName&&"classList"in e&&"contains"in e.classList)}function a(e){var t=e.type,n=e.tagName;return!("INPUT"!==n||!d[t]||e.readOnly)||"TEXTAREA"===n&&!e.readOnly||!!e.isContentEditable}function s(e){e.classList.contains("focus-visible")||(e.classList.add("focus-visible"),e.setAttribute("data-focus-visible-added",""))}function c(e){e.hasAttribute("data-focus-visible-added")&&(e.classList.remove("focus-visible"),e.removeAttribute("data-focus-visible-added"))}function r(n){n.metaKey||n.altKey||n.ctrlKey||(i(e.activeElement)&&s(e.activeElement),t=!0)}function u(e){t=!1}function m(e){i(e.target)&&(t||a(e.target))&&s(e.target)}function v(e){i(e.target)&&(e.target.classList.contains("focus-visible")||e.target.hasAttribute("data-focus-visible-added"))&&(n=!0,window.clearTimeout(o),o=window.setTimeout((function(){n=!1}),100),c(e.target))}function l(e){"hidden"===document.visibilityState&&(n&&(t=!0),f())}function f(){document.addEventListener("mousemove",E),document.addEventListener("mousedown",E),document.addEventListener("mouseup",E),document.addEventListener("pointermove",E),document.addEventListener("pointerdown",E),document.addEventListener("pointerup",E),document.addEventListener("touchmove",E),document.addEventListener("touchstart",E),document.addEventListener("touchend",E)}function w(){document.removeEventListener("mousemove",E),document.removeEventListener("mousedown",E),document.removeEventListener("mouseup",E),document.removeEventListener("pointermove",E),document.removeEventListener("pointerdown",E),document.removeEventListener("pointerup",E),document.removeEventListener("touchmove",E),document.removeEventListener("touchstart",E),document.removeEventListener("touchend",E)}function E(e){e.target.nodeName&&"html"===e.target.nodeName.toLowerCase()||(t=!1,w())}document.addEventListener("keydown",r,!0),document.addEventListener("mousedown",u,!0),document.addEventListener("pointerdown",u,!0),document.addEventListener("touchstart",u,!0),document.addEventListener("visibilitychange",l,!0),f(),e.addEventListener("focus",m,!0),e.addEventListener("blur",v,!0),e.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&e.host?e.host.setAttribute("data-js-focus-visible",""):e.nodeType===Node.DOCUMENT_NODE&&(document.documentElement.classList.add("js-focus-visible"),document.documentElement.setAttribute("data-js-focus-visible",""))}if("undefined"!=typeof window&&"undefined"!=typeof document){var t;window.applyFocusVisiblePolyfill=e;try{t=new CustomEvent("focus-visible-polyfill-ready")}catch(e){(t=document.createEvent("CustomEvent")).initCustomEvent("focus-visible-polyfill-ready",!1,!1,{})}window.dispatchEvent(t)}"undefined"!=typeof document&&e(document)}();const e="link_click",t=(e,t)=>{"object"==typeof window&&(window.dataLayer=window.dataLayer||[],window.gtag=window.gtag||function(){window.dataLayer.push(arguments)},window.gtag("event",e,t))},n=(e,t)=>{if("object"!=typeof window)return;if("function"!=typeof window.episodSendEvent)return;const n=Object.keys(t).reduce(((e,n)=>(e[n.replace(/^event_/i,"")]=t[n],e)),{});window.episodSendEvent({event_name:e,event_details:n})};(()=>{function o(o){const d=["trackEvent","trackCategory","trackLabel"];let i=o.target;for(;i&&i.dataset&&!d.some((e=>i.dataset[e]));)i=i.parentElement;if(!i)return;((e,o)=>{try{t(e,o)}catch(e){console.error(e)}try{n(e,o)}catch(e){console.error(e)}})(i.dataset.trackEvent||e,{event_category:i.dataset.trackCategory,event_label:i.dataset.trackLabel})}"undefined"!=typeof window?(window.removeEventListener("click",o),window.addEventListener("click",o)):console.warn("initGlobalEventTracking: window is not defined")})();
