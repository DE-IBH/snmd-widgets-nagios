define(["snmd-core/js/SVGWidget","snmd-core/js/SVGImpl/Chart","snmd-widgets-nagios/js/Utils","js-logger"],function(t,s,a,e){"use strict";var i=function(e,i,n){this.opts={axis:[{max:2e8,scale:"linear"}],desc:n,dpi:.2,cls:t.srClassOpts(n,"Chart"),lcls:["snmd-lcl-Nag","snmd-lcl-NagIf","snmd-lcl-NagIfVPN"],mcls:["snmd-mcl-Nag","snmd-mcl-NagIf","snmd-mcl-NagIfVPN"],tcls:["snmd-tcl-Nag","snmd-tcl-NagIf","snmd-tcl-NagIfVPN"]};var r,l,h=0;for(l=0;l<n.topics.length;l++){var c=new RegExp("Interface (.*Ethernet|POS)").exec(n.topics[l]);if(c&&c[1])switch(c[1]){case"TenGigabitEthernet":r=2e9,h=r>h?r:h;break;case"GigabitEthernet":r=2e8,h=r>h?r:h;break;case"POS":r=31e6,h=r>h?r:h;break;case"FastEthernet":r=2e7,h=r>h?r:h;break;case"Ethernet":r=2e6,h=r>h?r:h;break;default:r=this.opts.axis[0].max,h=r>h?r:h}else h+=this.opts.axis[0].max}for(this.opts.axis[0].max=h,"undefined"!=typeof n.max&&(r=parseFloat(n.max),isNaN(r)||(this.opts.axis[0].max=r)),this.lines=[{name:"if_in_octets",axis:0,unit:"b"},{name:"if_out_octets",axis:0,unit:"b"}],this.desc=n,this.last=[],l=0;l<n.topics.length;l++){this.last[n.topics[l]]=[];var o;for(o=0;o<this.lines.length;o++)this.last[n.topics[l]][o]=[]}this.chart=new s(e,i,this.opts,this.lines,a.qTipConfig(this,"VPN Tunnel",this.lines.map(function(t){return t.name})))};return i.prototype.handleUpdate=function(t,s){var i;try{i=JSON.parse(s)}catch(n){return void e.debug("[Nagios/Chart-IfBw] JSON error in performance data: "+n.message)}a.qTipUpdate(i,this);var r;for(r=0;r<this.lines.length;r++){this.last[t][r].val=0,this.last[t][r].state=0;try{this.last[t][r].val=8*i.perf_data[this.lines[r].name].val}catch(l){}try{this.last[t][r].state=i.state}catch(h){e.debug("[Nagios/Chart-IfBw] Error processing state data: "+h.message)}}var c=[],o=0;for(r=0;r<this.lines.length;r++){c[r]=0;var m;for(m in this.last){var d=parseFloat(this.last[m][r].val);isNaN(d)&&(d=0),c[r]+=d,o=Math.max(o,this.last[m][r].state)}}this.chart.update(i._timestamp,c,o)},i});
//# sourceMappingURL=dist/js/Widgets/Chart-IfVPN.map