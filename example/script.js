!function(e){var t={};function i(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=e,i.c=t,i.d=function(e,t,o){i.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:o})},i.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=3)}([function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(){this.d=[]}return e.prototype.moveTo=function(e,t){this.append("M",e,t)},e.prototype.lineTo=function(e,t){this.append("L",e,t)},e.prototype.quadraticCurveTo=function(e,t,i,o){this.d.push("Q "+e+","+t+" "+i+","+o)},e.prototype.closePath=function(){this.d.push("Z")},e.prototype.toString=function(){return this.d.join(" ")},e.prototype.append=function(e,t,i){this.d.push(e+" "+t+","+i)},e}();t.PathBuilder=o},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=i(0);t.tooltipPath=function(e){var t;t="number"==typeof e.cornerRadius?{upperLeft:e.cornerRadius,upperRight:e.cornerRadius,lowerLeft:e.cornerRadius,lowerRight:e.cornerRadius}:e.cornerRadius;var i=e.width,r=e.height,n=e.arrow,a=e.x||0,s=e.y||0;n&&"left"===n.position&&(a+=n.height),n&&"top"===n.position&&(s+=n.height);var l=new o.PathBuilder;return l.moveTo(a+t.upperLeft,s),n&&"top"===n.position&&(l.lineTo(a+n.start,s),l.lineTo(a+n.start+n.base/2,s-n.height),l.lineTo(a+n.start+n.base,s)),l.lineTo(a+i-t.upperRight,s),l.quadraticCurveTo(a+i,s,a+i,s+t.upperRight),n&&"right"===n.position&&(l.lineTo(a+i,s+n.start),l.lineTo(a+i+n.height,s+n.start+n.base/2),l.lineTo(a+i,s+n.start+n.base)),l.lineTo(a+i,s+r-t.lowerRight),l.quadraticCurveTo(a+i,s+r,a+i-t.lowerRight,s+r),n&&"bottom"===n.position&&(l.lineTo(a+n.start+n.base,s+r),l.lineTo(a+n.start+n.base/2,s+r+n.height),l.lineTo(a+n.start,s+r)),l.lineTo(a+t.lowerLeft,s+r),l.quadraticCurveTo(a,s+r,a,s+r-t.lowerLeft),n&&"left"===n.position&&(l.lineTo(a,s+n.start+n.base),l.lineTo(a-n.height,s+n.start+n.base/2),l.lineTo(a,s+n.start)),l.lineTo(a,s+t.upperLeft),l.quadraticCurveTo(a,s,a+t.upperLeft,s),l.closePath(),l}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=i(1);t.tooltip=function(e){var t=e.arrow,i=e.shadow?e.shadow.size:0,r={x:2.5*i,y:2.5*i,width:e.width,height:e.height,cornerRadius:e.cornerRadius,arrow:e.arrow},n=o.tooltipPath(r),a=e.width+5*i;!t||"left"!==t.position&&"right"!==t.position||(a+=t.height);var s=e.height+5*i;!t||"top"!==t.position&&"bottom"!==t.position||(s+=t.height);var l=2.5*i/e.width*-200,d=2.5*i/e.height*-200,u=100+2.5*i/e.width*400,h=100+2.5*i/e.height*400,p="rgb(0, 0, 0)",c=.5,g={x:0,y:0};return e.shadow&&(e.shadow.color&&(p=e.shadow.color),e.shadow.opacity&&(c=e.shadow.opacity),e.shadow.offset&&(g=e.shadow.offset)),{svg:'<?xml version="1.0" encoding="UTF-8"?>\n  <svg width="'+a+'px" height="'+s+'px" viewBox="0 0 '+a+" "+s+'" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n    <defs>\n      <path d="'+n.toString()+'" id="tooltip"></path>\n      <filter id="shadow" x="'+l+'%" y="'+d+'%" width="'+u+'%" height="'+h+'%">\n        <feGaussianBlur stdDeviation="'+i+'" />\n        <feOffset dx="'+g.x+'" dy="'+g.y+'" result="blur"/>\n        <feFlood flood-color="'+p+'" flood-opacity="'+c+'"/>\n        <feComposite in2="blur" operator="in" result="colorShadow"/>\n        <feComposite in="SourceGraphic" in2="colorShadow" operator="over"/>\n      </filter>\n    </defs>\n    <g>\n      <use fill="'+e.fillColor+'" fill-rule="evenodd" xlink:href="#tooltip"'+(i?' filter="url(#shadow)"':"")+"></use>\n    </g>\n  </svg>\n  ",insets:{top:r.y+(t&&"top"===t.position?t.height:0),left:r.x+(t&&"left"===t.position?t.height:0),right:r.x+(t&&"right"===t.position?t.height:0),bottom:r.y+(t&&"bottom"===t.position?t.height:0)},size:{width:a,height:s}}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=i(2);function r(e){return document.getElementById(e).value}function n(e){return parseFloat(r(e))}function a(){n("width"),n("height");var e=function(){for(var e=document.getElementsByName("arrow"),t=0;t<e.length;t++)if(e[t].checked)return"none"===e[t].value?null:e[t].value;return null}(),t=o.tooltip({width:n("width"),height:n("height"),shadow:{size:n("shadow")},fillColor:r("color"),cornerRadius:{upperLeft:n("topLeftCorner"),upperRight:n("topRightCorner"),lowerLeft:n("bottomLeftCorner"),lowerRight:n("bottomRightCorner")},arrow:e?{position:e,base:n("arrowBase"),height:n("arrowHeight"),start:n("arrowOffset")}:void 0}),i=t.svg,a=t.insets,s=t.size;document.getElementById("svg").value=i;var l="data:image/svg+xml;base64,"+btoa(i),d=document.getElementById("tooltip");d.style.backgroundImage="url("+l+")",d.style.padding=a.top+"px "+a.right+"px "+a.bottom+"px "+a.left+"px",d.style.width=s.width+"px",d.style.height=s.height+"px",document.getElementById("tooltipContent").innerText=document.getElementById("text").value}window.recreateTooltip=a,window.onload=function(){document.getElementById("text").value='Supply-chains podcasting tag virtual. Synergize bleeding-edge, addelivery: portals leading-edge embrace embrace turn-key, strategize interactive, magnetic. Podcasting viral standards-compliant e-business reinvent synergistic iterate. Social communities whiteboard expedite seize weblogs innovate streamline proactive, citizen-media extend; whiteboard. Front-end cross-media applications frictionless architect webservices killer empower scalable, infomediaries, "real-time user-centred," transparent extensible post."\nExtend applications B2C syndicate, out-of-the-box dynamic sticky viral engineer revolutionary methodologies back-end rich-clientAPIs synergistic global productize. Peer-to-peer relationships users target synergies synergies methodologies integrate. Recontextualize B2B seize, envisioneer, disintermediate communities embedded long-tail integrate leverage. Extend communities addelivery communities generate engage drive beta-test, e-business. Networkeffects transition; supply-chains innovate incentivize leading-edge dynamic end-to-end incentivize architectures aggregate peer-to-peer web services B2C.',a()}}]);