define(["css!snmd-widgets-nagios/css/widgets-nagios.css"],function(){"use strict";var n=null,t=function(){if(null!==n)throw new Error("Cannot instantiate more than one instance, use getInstance()!");this.version="0.5.0"};return t.getInstance=function(){return null===n&&(n=new t),n},t.prototype.getVersion=function(){return this.version},t.prototype.init=function(){},t.getInstance()});
//# sourceMappingURL=dist/js/Boot.map