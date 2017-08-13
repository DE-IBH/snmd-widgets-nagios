define(["snmd-core/js/SVGWidget","snmd-core/js/SVGImpl/Class","snmd-widgets-nagios/js/Utils","js-logger"],function(s,t,e,a){"use strict";var i=function(a,i,r){var o;for(this.opts={cls:s.srClassOpts(r,"Class")},this.last=[],o=0;o<r.topics.length;o+=1)this.last[r.topics[o]]=[3];if("undefined"!=typeof r.clrsty)for(o=0;o<r.clrsty.length;o+=1)i.style[r.clrsty[o]]="";this.el=new t(a,i,this.opts,e.qTipConfig(this,"Service State"))};return i.prototype.handleUpdate=function(s,t){var i,r=0;try{i=JSON.parse(t)}catch(o){return void a.debug("[Nagios/Class-State] JSON error in performance data: "+o.message)}e.qTipUpdate(i,this),this.last[s]=void 0;try{this.last[s]=i.state}catch(l){a.debug("[Nagios/Class-State] Error processing state data ["+s+"]: "+l.message)}var n;for(n in this.last)r=Math.max(r,this.last[n]);this.el.update(r)},i});
//# sourceMappingURL=dist/js/Widgets/Class-State.map