var mehrsprachig=function(){"use strict";return function(r){void 0===r&&(r={});var e=r.selector;void 0===e&&(e="[data-mehrsprachig]");var t,a=r.trigger;void 0===a&&(a="[data-mehrsprachig-trigger]");var c=document.querySelectorAll(e),i=document.querySelectorAll(a),n=function(r){r.preventDefault(),t=r.target.dataset.mehrsprachigTrigger,c.forEach((function(r){r.innerText=t}))};i.forEach((function(r){r.addEventListener("click",n)}))}}();
//# sourceMappingURL=mehrsprachig.js.map
