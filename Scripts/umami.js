!function(){"use strict";var t=function(t,e,n){var a=t[e];return function(){for(var e=[],r=arguments.length;r--;)e[r]=arguments[r];return n.apply(null,e),a.apply(t,e)}},e=function(){var t=window.doNotTrack,e=window.navigator,n=window.external,a=t||e.doNotTrack||e.msDoNotTrack||n&&"function"==typeof n.msTrackingProtectionEnabled&&n.msTrackingProtectionEnabled();return!0===a||1===a||"yes"===a||"1"===a};!function(n){var a=n.screen,r=a.width,i=a.height,o=n.navigator.language,c=n.location,u=c.hostname,s=c.pathname,l=c.search,f=n.document,d=n.history,v=f.querySelector("script[data-website-id]"),p=function(t){return v&&v.getAttribute(t)},h=p("data-website-id"),m=p("data-host-url"),g="false"!==p("data-auto-track"),w="true"===p("data-do-not-track");if(!(!v||w&&e())){var y,k=m?(y=m)&&y.length>1&&y.endsWith("/")?y.slice(0,-1):y:new URL(v.src).href.split("/").slice(0,-1).join("/"),S=r+"x"+i,E=[],b=""+s+l,T=f.referrer,L=function(t,e,n){var a={website:n,hostname:u,screen:S,language:o};return e&&Object.keys(e).forEach((function(t){a[t]=e[t]})),function(t,e,n){var a=new XMLHttpRequest;a.open("POST",t,!0),a.setRequestHeader("Content-Type","application/json"),a.onreadystatechange=function(){4===a.readyState&&n&&n()},a.send(JSON.stringify(e))}(k+"/api/collect",{type:t,payload:a})},N=function(t,e,n){return void 0===t&&(t=b),void 0===e&&(e=T),void 0===n&&(n=h),L("pageview",{url:t,referrer:e},n)},q=function(t,e,n,a){return void 0===e&&(e="custom"),void 0===n&&(n=b),void 0===a&&(a=h),L("event",{event_type:e,event_value:t,url:n},a)},R=function(){f.querySelectorAll("[class*='umami--']").forEach((function(t){t.className.split(" ").forEach((function(e){if(/^umami--([a-z]+)--([a-z0-9_]+[a-z0-9-_]+)$/.test(e)){var n=e.split("--"),a=n[1],r=n[2],i=function(){return q(r,a)};E.push([t,a,i]),t.addEventListener(a,i,!0)}}))}))},_=function(t,e,n){E.forEach((function(t){var e=t[0],n=t[1],a=t[2];e&&e.removeEventListener(n,a,!0)})),E.length=0,T=b;var a=n.toString();if("http"===a.substring(0,4)){var r=new URL(a),i=r.pathname,o=r.search;b=""+i+o}else b=a;N(b,T),setTimeout(R,300)};if(!n.umami){var j=function(t){return q(t)};j.trackView=N,j.trackEvent=q,n.umami=j}g&&(d.pushState=t(d,"pushState",_),d.replaceState=t(d,"replaceState",_),N(b,T),R())}}(window)}();
