define(["snmd-core/SVGWidget","snmd-core/SVGImpl/Class","js-logger"],function(t,s,e){"use strict";var a=function(e,a,r){var i;for(this.opts={cls:t.srClassOpts(r,"Class")},this.last=[],i=0;i<r.topics.length;i+=1)this.last[r.topics[i]]=[3];if("undefined"!=typeof r.clrsty)for(i=0;i<r.clrsty.length;i+=1)a.style[r.clrsty[i]]="";this.el=new s(e,a,this.opts)};return a.prototype.handleUpdate=function(t,s){var a,r=0;try{a=JSON.parse(s)}catch(t){return void e.debug("[Nagios/Class-State] JSON error in performance data: "+t.message)}this.last[t]=void 0;try{this.last[t]=a.state}catch(s){e.debug("[Nagios/Class-State] Error processing state data ["+t+"]: "+s.message)}this.last.forEach(function(t){r=Math.max(r,t)}),this.el.update(r)},a});
//# sourceMappingURL=dist/Class-State.map