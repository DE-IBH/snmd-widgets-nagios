define(["snmd-core/SVGWidget","snmd-core/SVGImpl/Chart","js-logger"],function(t,s,e){"use strict";var i=function(e,i,r){this.opts={axis:[{max:100,scale:"linear"}],desc:r,dpi:.2,cls:t.srClassOpts(r,"Chart")},this.lines=[{name:"util",axis:0,unit:"%",style:{stroke:"Orchid",strokeLineCap:"round",strokeLineJoin:"round",strokeWidth:1.5,fill:"Orchid"}}],this.desc=r,this.last=[];var a;for(a=0;a<r.topics.length;a++)this.last[r.topics[a]]=[0,0];this.chart=new s(e,i,this.opts,this.lines)};return i.prototype.handleUpdate=function(t,s){var i;try{i=JSON.parse(s)}catch(t){return void e.debug("[Nagios/Chart-CpuUtil] JSON error in performance data: "+t.message)}var r;for(r=0;r<this.lines.length;r++){this.last[t][r]=0;try{this.last[t][r]=i.perf_data[this.lines[r].name].val}catch(s){e.debug("[Nagios/Chart-CpuUtil] Error processing performance data of "+t+"["+r+"]: "+s.message)}}var a=[];for(r=0;r<this.lines.length;r++){a[r]=0;var n,o=0;for(n in this.last)a[r]+=parseFloat(this.last[n][r]),o+=1;a[r]=a[r]/o}this.chart.update(i._timestamp,a)},i});
//# sourceMappingURL=dist/Chart-CpuUtil.map