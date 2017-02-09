define(["snmd-core/js/SVGWidget","snmd-core/js/SVGImpl/Chart","js-logger"],function(t,s,a){"use strict";var e=function(a,e,i){this.opts={axis:[{max:297619.2,scale:"linear"}],desc:i,dpi:.2,cls:t.srClassOpts(i,"Chart"),lcls:["snmd-lcl-Nag","snmd-lcl-NagIf","snmd-lcl-NagIfPr"],mcls:["snmd-mcl-Nag","snmd-mcl-NagIf","snmd-mcl-NagIfPr"],tcls:["snmd-tcl-Nag","snmd-tcl-NagIf","snmd-tcl-NagIfPr"]};var r,n,l=0;for(r=0;r<i.topics.length;r++){var c=new RegExp("Interface (.*Ethernet|POS)").exec(i.topics[r]);if(c&&c[1])switch(c[1]){case"TenGigabitEthernet":n=194100,l=n>l?n:l;break;case"GigabitEthernet":n=19410,l=n>l?n:l;break;case"POS":n=31*97.05,l=n>l?n:l;break;case"FastEthernet":n=1941,l=n>l?n:l;break;case"Ethernet":n=194.1,l=n>l?n:l;break;default:n=this.opts.axis[0].max,l=n>l?n:l}else l+=this.opts.axis[0].max}for(this.opts.axis[0].max=l,"undefined"!=typeof i.max&&(n=parseFloat(i.max),isNaN(n)||(this.opts.axis[0].max=n)),this.lines=[{name:"inucast",axis:0,unit:"p"},{name:"outucast",axis:0,unit:"p"}],this.desc=i,this.last=[],r=0;r<i.topics.length;r++){this.last[i.topics[r]]=[];var h;for(h=0;h<this.lines.length;h++)this.last[i.topics[r]][h]=[]}this.chart=new s(a,e,this.opts,this.lines)};return e.prototype.handleUpdate=function(t,s){var e;try{e=JSON.parse(s)}catch(i){return void a.debug("[Nagios/Chart-IfPr] JSON error in performance data: "+i.message)}var r;for(r=0;r<this.lines.length;r++){this.last[t][r].val=0,this.last[t][r].state=0;try{this.last[t][r].val=e.perf_data[this.lines[r].name].val}catch(n){}try{this.last[t][r].state=e.state}catch(l){a.debug("[Nagios/Chart-IfPr] Error processing state data: "+l.message)}}var c=[],h=0;for(r=0;r<this.lines.length;r++){c[r]=0;var o;for(o in this.last){var m=parseFloat(this.last[o][r].val);isNaN(m)&&(m=0),c[r]+=m,h=Math.max(h,this.last[o][r].state)}}this.chart.update(e._timestamp,c,h)},e});
//# sourceMappingURL=dist/js/Chart-IfPr.map