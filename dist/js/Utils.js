define(["snmd-core/js/Notify","jquery"],function(t,n){"use strict";var e=null,s=function(){if(null!==e)throw new Error("Cannot instantiate more than one instance, use getInstance()!")};return s.getInstance=function(){return null===e&&(e=new s),e},s.prototype.qTipConfig=function(t,e){t.qtip_services={};var i=[n("<span></span>").text(t.opts.title)];if(Array.isArray(e)){var a=n("<span></span>").addClass("snmd-qt-legend");i.push(a),n.each(e,function(e,s){var i="snmd-qt-nocls";Array.isArray(t.opts.lcls)&&(i=t.opts.lcls.map(function(t){return t+"-"+s}).join(" ")),a.append(n("<span></span>").text(s).addClass(i))})}return{content:{title:i,text:s.qTipContentCb.bind(t)},position:{viewport:n(window)}}},s.qTipContentCb=function(){var t=[];return 0===Object.keys(this.qtip_services).length?n("<i></i>").text("No data, yet..."):(n.each(this.qtip_services,function(e,s){var i=n("<p></p>").addClass("snmd-qt-NagHost");i.text(e),t.push(i),n.each(s,function(e,s){var i=n("<p></p>").addClass("snmd-qt-NagService");i.text(e),t.push(i),t.push(n("<p></p>").addClass("snmd-qt-NagOutput snmd-bcl-bgcolor snmd-scl-"+s.state).append(n("<code></code>").text(s.output)))})}),t)},s.qTipShowCb=function(){return this.qtip_services.length>0},s.prototype.qTipUpdate=function(n,e,s){void 0===s.qtip_services[e.hostname]&&(s.qtip_services[e.hostname]={}),s.qtip_services[e.hostname][e.service_description]={state:e.state,output:e.output},t.notify("snmd-widgets-nagios",n,e.state,s.opts.title,e.hostname+"\n"+e.service_description+"\n"+e.output)},s.getInstance()});