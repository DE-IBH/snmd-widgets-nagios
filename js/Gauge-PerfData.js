/*
SNMD - Scotty Network Management Dashboard
  https://github.com/DE-IBH/snmd-widgets-nagios/

Authors:
  Thomas Liske <liske@ibh.de>

Copyright Holder:
  2012 - 2013 (C) Thomas Liske [https://fiasko-nw.net/~thomas/]
  2014 - 2016 (C) IBH IT-Service GmbH [https://www.ibh.de/]

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

define(["snmd-core/js/SVGWidget", "snmd-core/js/SVGImpl/Gauge", "snmd-widgets-nagios/js/Utils","js-logger"], function (SVGWidget, SVGImplGauge, Utils, Logger) {
    'use strict';
    
    var GaugePerfData = function (root, svg, desc) {
        this.opts = {
            axis: [
                {
                    max: 50,
                    scale: 'linear'
                }
            ],
            stroke: 'yellow',
            fill: 'white',
            desc: desc,
            dpi: 60 / 5 / 60,
            cls: SVGWidget.srClassOpts(desc, "Gauge")
        };

        this.desc = desc;
        if (typeof this.desc.uom === "undefined") {
            this.opts.uom = '';
        } else {
            this.opts.uom = this.desc.uom;
        }

        if (typeof desc.keys === "undefined") {
            this.opts.keys = [desc.key];
        } else {
            this.opts.keys = desc.keys;
        }
        if (typeof desc.factor !== "undefined") {
            this.opts.factor = desc.factor;
        } else {
            this.opts.factor = 1;
        }

        this.last = [];
        var i;
        for (i = 0; i < desc.topics.length; i++) {
            this.last[desc.topics[i]] = [];
        }

        this.max = (typeof desc.max === "undefined" ? 100 : desc.max);
        
        this.chart = new SVGImplGauge(root, svg, this.opts, Utils.qTipConfig("Performance Data", this));
    };
    
    GaugePerfData.prototype.handleUpdate = function (topic, msg) {
        var json;
        try {
            json = JSON.parse(msg);
        } catch (err_parse) {
            Logger.debug('[Nagios/Gauge-PerfData] JSON error in performance data: ' + err_parse.message);
            return;
        }

        Utils.qTipUpdate(json, this);

        this.last[topic].val = 0;
        this.last[topic].state = 0;
        try {
            var i;
            for (i = 0; i < this.opts.keys.length; i++) {
                if (typeof json.perf_data[this.opts.keys[i]] !== "undefined") {
                    this.last[topic].val += parseFloat(json.perf_data[this.opts.keys[i]].val);
                }
            }
            this.last[topic].state = json.state;
        } catch (err_last) {
            Logger.debug("[Nagios/Gauge-PerfData] Error processing performance data: " + err_last.message);
        }
        
        var val = 0;
        var state = 0;
        var t;
        for (t in this.last) {
            var v = parseFloat(this.last[t].val);
            if (isNaN(v)) {
                v = 0;
            }
            val += v;
            state = Math.max(state, this.last[t].state);
        }
        
        this.chart.update(val * this.opts.factor, this.max, state);
    };

    return GaugePerfData;
});
