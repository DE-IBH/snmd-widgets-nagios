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

define(["snmd-core/SVGWidget"], function (SVGWidget) {
    'use strict';

    var NagClsState = function (root, svg, desc) {
        var i;

        this.opts = {
            cls: SVGWidget.srClassOpts(desc, "Class")
        };
        
        this.last = {};
        for (i = 0; i < desc.topics.length; i += 1) {
            this.last[desc.topics[i]] = [3];
        }

        if (typeof desc.clrsty !== "undefined") {
            for (i = 0; i < desc.clrsty.length; i += 1) {
                svg.style[desc.clrsty[i]] = '';
            }
        }

        this.el = new (SVGWidget.srLookupImpl("Class"))(root, svg, this.opts);
    };

    NagClsState.prototype.handleUpdate = function (topic, msg) {
        var json,
            state = 0;

        try {
            json = JSON.parse(msg);
        } catch (err_parse) {
            console.error('JSON error in performance data: ' + err_parse.message);
            return;
        }
        
        this.last[topic] = undefined;
        try {
            this.last[topic] = json.state;
        } catch (err_last) {
            console.err("Error to process state data [" + topic + "]: " + err_last.message);
        }
        
        this.last.forEach(function (l) {
            state = Math.max(state, l);
        });
        
        this.el.update(state);
    };

    SVGWidget.srRegisterWidget(
        "NagClsState",
        NagClsState
    );

    return NagClsState;
});
