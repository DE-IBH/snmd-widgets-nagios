define(["snmd-core/js/SVGWidget","snmd-core/js/SVGImpl/Chart","snmd-widgets-nagios/js/Utils","js-logger"],function(t,s,i,e){"use strict";var a=function(e,a,r){this.opts={axis:[{max:100,scale:"linear"}],desc:r,dpi:.2,cls:t.srClassOpts(r,"Chart")},this.lines=[{name:"util",axis:0,unit:"%",style:{stroke:"Orchid",strokeLineCap:"round",strokeLineJoin:"round",strokeWidth:1.5,fill:"Orchid"}}],this.desc=r,this.last=[];var n;for(n=0;n<r.topics.length;n++)this.last[r.topics[n]]=[0,0];this.chart=new s(e,a,this.opts,this.lines,i.qTipConfig(this,"CPU Utilization",this.lines.map(function(t){return t.name})))};return a.prototype.handleUpdate=function(t,s){var i;try{i=JSON.parse(s)}catch(a){return void e.debug("[Nagios/Chart-CpuUtil] JSON error in performance data: "+a.message)}var r;for(r=0;r<this.lines.length;r++){this.last[t][r]=0;try{this.last[t][r]=i.perf_data[this.lines[r].name].val}catch(n){e.debug("[Nagios/Chart-CpuUtil] Error processing performance data of "+t+"["+r+"]: "+n.message)}}var o=[];for(r=0;r<this.lines.length;r++){o[r]=0;var h,l=0;for(h in this.last)o[r]+=parseFloat(this.last[h][r]),l+=1;o[r]=o[r]/l}this.chart.update(i._timestamp,o)},a});
//# sourceMappingURL=dist/js/Chart-CpuUtil.map