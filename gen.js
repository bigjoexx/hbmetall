/*! For license information please see 334.a49ddd27.chunk.js.LICENSE.txt */
"use strict";(self.webpackChunkunoridinals=self.webpackChunkunoridinals||[]).push([[334],{5:function(t,e,r){r.r(e),r.d(e,{default:function(){return h}});var n=r(165),o=r(861),i=r(439),a=r(791),c=r.p+"static/media/Hero.42bc264566df525518e6.png",s=r.p+"static/media/Banana.6c35e061e6b5af9ee39b.png",u=r(237),l=r(184);function h(){var t=(0,a.useState)(!1),e=(0,i.Z)(t,2),r=e[0],h=e[1],f=(0,a.useState)(""),d=(0,i.Z)(f,2),p=d[0],v=d[1],m=(0,a.useState)(""),y=(0,i.Z)(m,2),g=y[0],x=y[1],w=(0,a.useState)(""),b=(0,i.Z)(w,2),j=b[0],N=b[1],E=(0,a.useState)(""),L=(0,i.Z)(E,2),k=L[0],_=L[1],O=function(){var t=(0,o.Z)((0,n.Z)().mark((function t(){var e;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!p){t.next=6;break}return e={code:p},t.next=4,fetch("https://bill-backend.vercel.app/mint/admin/".concat(p),{method:"POST",headers:{"Content-type":"application/json; charset=UTF-8"},body:JSON.stringify({data:e})}).then((function(t){return t.json()})).then((function(t){t.success?(h(!0),u.Am.success(t.message,{theme:"dark"})):u.Am.error(t.message,{theme:"dark"})}));case 4:t.next=7;break;case 6:u.Am.error("Enter Code correctly.",{theme:"dark"});case 7:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),S=function(){var t=(0,o.Z)((0,n.Z)().mark((function t(){var e;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(g&&j&&k)){t.next=6;break}return e={handleName:g,discordID:j,ordAddress:k,code:p},t.next=4,fetch("https://bill-backend.vercel.app/mint/mail",{method:"POST",headers:{"Content-type":"application/json; charset=UTF-8"},body:JSON.stringify(e)}).then((function(t){return t.json()})).then(function(){var t=(0,o.Z)((0,n.Z)().mark((function t(e){return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,u.Am.success("You have made it in, now stop monkeying around.",{theme:"dark"});case 2:h(!1),v(""),x(""),N(""),_("");case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 4:t.next=7;break;case 6:u.Am.error("Enter details correctly.",{theme:"dark"});case 7:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return r?(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{className:"hero_container",children:(0,l.jsx)("div",{className:"hero_logo_view",children:(0,l.jsx)("img",{src:c,className:"hero_img",alt:"hero"})})}),(0,l.jsx)("div",{className:"form",children:(0,l.jsxs)("div",{className:"contact_form",children:[(0,l.jsx)("div",{className:"form_container",children:(0,l.jsx)("input",{type:"text",id:"handleName",placeholder:"ENTER YOUR TWITTER HANDLE",className:"email",value:g,onChange:function(t){return x(t.target.value)},required:!0})}),(0,l.jsx)("div",{className:"form_container",children:(0,l.jsx)("input",{type:"text",id:"discordID",placeholder:"ENTER YOUR DISCORD ID",className:"email",value:j,onChange:function(t){return N(t.target.value)},required:!0})}),(0,l.jsx)("div",{className:"form_container",children:(0,l.jsx)("input",{type:"text",id:"ordAddress",placeholder:"ENTER YOUR BTC ORDINAL ADDRESS",className:"email",value:k,onChange:function(t){return _(t.target.value)},required:!0})}),(0,l.jsx)("div",{children:(0,l.jsx)("button",{className:"submit",onClick:S,children:"SUBMIT"})})]})})]}):(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{className:"hero_container",children:(0,l.jsx)("div",{className:"hero_logo_view",children:(0,l.jsx)("img",{src:s,className:"hero_img",alt:"hero"})})}),(0,l.jsx)("div",{className:"form",children:(0,l.jsxs)("div",{className:"contact_form",children:[(0,l.jsx)("div",{className:"form_container",children:(0,l.jsx)("input",{type:"number",id:"code",placeholder:"ENTER YOUR CODE",className:"email",value:p,onChange:function(t){return v(t.target.value)},required:!0})}),(0,l.jsx)("div",{children:(0,l.jsx)("button",{className:"submit",onClick:O,children:"Claim Whitelist"})})]})})]})}},861:function(t,e,r){function n(t,e,r,n,o,i,a){try{var c=t[i](a),s=c.value}catch(u){return void r(u)}c.done?e(s):Promise.resolve(s).then(n,o)}function o(t){return function(){var e=this,r=arguments;return new Promise((function(o,i){var a=t.apply(e,r);function c(t){n(a,o,i,c,s,"next",t)}function s(t){n(a,o,i,c,s,"throw",t)}c(void 0)}))}}r.d(e,{Z:function(){return o}})},165:function(t,e,r){r.d(e,{Z:function(){return o}});var n=r(2);function o(){o=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,i=Object.defineProperty||function(t,e,r){t[e]=r.value},a="function"==typeof Symbol?Symbol:{},c=a.iterator||"@@iterator",s=a.asyncIterator||"@@asyncIterator",u=a.toStringTag||"@@toStringTag";function l(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{l({},"")}catch(T){l=function(t,e,r){return t[e]=r}}function h(t,e,r,n){var o=e&&e.prototype instanceof p?e:p,a=Object.create(o.prototype),c=new _(n||[]);return i(a,"_invoke",{value:N(t,r,c)}),a}function f(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(T){return{type:"throw",arg:T}}}t.wrap=h;var d={};function p(){}function v(){}function m(){}var y={};l(y,c,(function(){return this}));var g=Object.getPrototypeOf,x=g&&g(g(O([])));x&&x!==e&&r.call(x,c)&&(y=x);var w=m.prototype=p.prototype=Object.create(y);function b(t){["next","throw","return"].forEach((function(e){l(t,e,(function(t){return this._invoke(e,t)}))}))}function j(t,e){function o(i,a,c,s){var u=f(t[i],t,a);if("throw"!==u.type){var l=u.arg,h=l.value;return h&&"object"==(0,n.Z)(h)&&r.call(h,"__await")?e.resolve(h.__await).then((function(t){o("next",t,c,s)}),(function(t){o("throw",t,c,s)})):e.resolve(h).then((function(t){l.value=t,c(l)}),(function(t){return o("throw",t,c,s)}))}s(u.arg)}var a;i(this,"_invoke",{value:function(t,r){function n(){return new e((function(e,n){o(t,r,e,n)}))}return a=a?a.then(n,n):n()}})}function N(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return S()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var c=E(a,r);if(c){if(c===d)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var s=f(t,e,r);if("normal"===s.type){if(n=r.done?"completed":"suspendedYield",s.arg===d)continue;return{value:s.arg,done:r.done}}"throw"===s.type&&(n="completed",r.method="throw",r.arg=s.arg)}}}function E(t,e){var r=e.method,n=t.iterator[r];if(void 0===n)return e.delegate=null,"throw"===r&&t.iterator.return&&(e.method="return",e.arg=void 0,E(t,e),"throw"===e.method)||"return"!==r&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+r+"' method")),d;var o=f(n,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,d;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,d):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,d)}function L(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function k(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function _(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(L,this),this.reset(!0)}function O(t){if(t){var e=t[c];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,o=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:S}}function S(){return{value:void 0,done:!0}}return v.prototype=m,i(w,"constructor",{value:m,configurable:!0}),i(m,"constructor",{value:v,configurable:!0}),v.displayName=l(m,u,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===v||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,m):(t.__proto__=m,l(t,u,"GeneratorFunction")),t.prototype=Object.create(w),t},t.awrap=function(t){return{__await:t}},b(j.prototype),l(j.prototype,s,(function(){return this})),t.AsyncIterator=j,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new j(h(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},b(w),l(w,u,"Generator"),l(w,c,(function(){return this})),l(w,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},t.values=O,_.prototype={constructor:_,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(k),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return a.type="throw",a.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var c=r.call(i,"catchLoc"),s=r.call(i,"finallyLoc");if(c&&s){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,d):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),d},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),k(r),d}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;k(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:O(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),d}},t}}}]);
//# sourceMappingURL=334.a49ddd27.chunk.js.map
