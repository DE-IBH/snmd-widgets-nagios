define(["snmd-core/js/SVGWidget","snmd-core/js/SVGImpl/Chart","snmd-widgets-nagios/js/Utils","js-logger"],function(s,t,a,i){"use strict";var e=function(i,e,l){this.opts={title:"Disk Wait",axis:[{max:.01,scale:"linear"}],fill:"white",desc:l,dpi:.2,cls:s.srClassOpts(l,"Chart"),lcls:["snmd-lcl-Nag","snmd-lcl-NagDisk","snmd-lcl-NagDiskWait"],mcls:["snmd-mcl-Nag","snmd-mcl-NagDisk","snmd-mcl-NagDiskWait"],tcls:["snmd-tcl-Nag","snmd-tcl-NagDisk","snmd-tcl-NagDiskWait"]},this.lines=[{name:"disk_average_read_wait",axis:0,unit:"s"},{name:"disk_average_write_wait",axis:0,unit:"s"}],this.desc=l,this.last=[];var n;for(n=0;n<l.topics.length;n++){this.last[l.topics[n]]=[];var r;for(r=0;r<this.lines.length;r++)this.last[l.topics[n]][r]=[]}this.chart=new t(i,e,this.opts,this.lines,a.qTipConfig(this,this.lines.map(function(s){return s.name})))};return e.prototype.handleUpdate=function(s,t){var e;try{e=JSON.parse(t)}catch(s){return void i.debug("[Nagios/Chart-DiskWait] JSON error in performance data: "+s.message)}a.qTipUpdate(s,e,this);var l;for(l=0;l<this.lines.length;l++){this.last[s][l].val=0,this.last[s][l].state=0;try{this.last[s][l].val=e.perf_data[this.lines[l].name].val,this.last[s][l].state=e.state}catch(s){i.debug("[Nagios/Chart-DiskWait] Error processing performance data of "+this.lines[l].name+": "+s.message)}}var n=[],r=0;for(l=0;l<this.lines.length;l++){n[l]=0;var h;for(h in this.last){var c=parseFloat(this.last[h][l].val);isNaN(c)&&(c=0),n[l]+=c,r=Math.max(r,this.last[h][l].state)}}this.chart.update(e._timestamp,n,r)},e});