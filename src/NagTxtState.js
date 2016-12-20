/*
SNMP - Scotty Network Monitoring Dashboard

Authors:
  Thomas Liske <liske@ibh.de>

Copyright Holder:
  2012 - 2013 (C) Thomas Liske [https://fiasko-nw.net/~thomas/tag/scotty]
  2014 - 2016 (C) IBH IT-Service GmbH [http://www.ibh.de/OSS/Scotty]

License:
  This program is free software; you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation; either version 2 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this package; if not, write to the Free Software
  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301 USA
*/

/*jslint
    devel: true,
    plusplus: true,
    vars: true
*/

/*global
    define
*/

define(["snmd-core/SVGWidget", "snmd-core/SVGImpl/Class"], function (SVGWidget, SVGImplClass) {
    'use strict';

    var NagTxtState = function (root, rsvg, desc) {
        this.opts = {
            cls: SVGWidget.srClassOpts(desc, "Class")
        };
        
        this.last = [];
        var i;
        for (i = 0; i < desc.topics.length; i++) {
            this.last[desc.topics[i]] = [3];
        }

        var svg = $(rsvg).children('tspan')[0];
        
        if (typeof desc.clrsty !== "undefined") {
            for (i = 0; i < desc.clrsty.length; i++) {
                svg.style[desc.clrsty[i]] = '';
            }
        }

        this.el = new SVGImplClass(root, svg, this.opts);
    };
    
    NagTxtState.prototype.handleUpdate = function (topic, msg) {
        var json;
        try {
            json = JSON.parse(msg);
        } catch (err_parse) {
            console.error('JSON error in performance data: ' + err_parse.message);
            return;
        }
        
        this.last[topic] = undefined;
        try {
            this.last[topic] = json.state;
        } catch (err_state) {
            console.err("Error to process state data [" + topic + "]: " + err_state.message);
        }
        
        var state = 0;
        var t;
        for (t in this.last) {
            state = Math.max(state, this.last[t]);
        }
        
        this.el.update(state);
    };

    return NagTxtState;
});
