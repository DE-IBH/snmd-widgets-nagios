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

define(["snmd-core/js/SVGWidget", "snmd-core/js/SVGImpl/Transform", "snmd-widgets-nagios/js/Utils", "js-logger"], function (SVGWidget, SVGImplTransform, Utils, Logger) {
    'use strict';

    var TransformPerfData = function (root, svg, desc) {
        this.opts = {
            desc: desc,
            cls: SVGWidget.srClassOpts(desc, "Transform")
        };
        
        this.desc = desc;
        if (typeof this.desc.transform === "undefined") {
            this.opts.transform = 'scale(%)';
        } else {
            this.opts.transform = this.desc.transform;
        }

        if (typeof desc.keys === "undefined") {
            this.opts.keys = [desc.key];
        } else {
            this.opts.keys = desc.keys;
        }

        if (typeof desc.factors === "undefined") {
            this.opts.factors = [];
        } else {
            this.opts.factors = desc.factors;
        }
        
        if (typeof desc.factor !== "undefined") {
            this.opts.factor = parseFloat(desc.factor);
            if (isNaN(this.opts.factor)) {
                this.opts.factor = 1;
            }
        } else {
            this.opts.factor = 1;
        }

        if (typeof desc.max !== "undefined") {
            this.opts.max = parseFloat(desc.max);
            if (isNaN(this.opts.max)) {
                this.opts.max = 100;
            }
        } else {
            this.opts.max = 100;
        }

        this.last = [];
        this.factors = [];
        var i;
        for (i = 0; i < desc.topics.length; i++) {
            this.last[desc.topics[i]] = [];

            if (typeof this.opts.factors[i] === "undefined") {
                this.factors[desc.topics[i]] = this.opts.factor;
            } else {
                this.factors[desc.topics[i]] = this.opts.factors[i];
            }
        }

        this.chart = new SVGImplTransform(root, svg, this.opts, Utils.qTipConfig(this, "Performance Data", this.opts.keys));
    };
    
    TransformPerfData.prototype.handleUpdate = function (topic, msg) {
        var json;
        try {
            json = JSON.parse(msg);
        } catch (err) {
            Logger.debug('[Nagios/Transform-PerfData] JSON error in performance data: ' + err.message);
            return;
        }

        Utils.qTipUpdate(json, this);

        this.last[topic].val = 0;
        try {
            var i;
            for (i = 0; i < this.opts.keys.length; i++) {
                if (typeof json.perf_data[this.opts.keys[i]] !== "undefined") {
                    this.last[topic].val += parseFloat(json.perf_data[this.opts.keys[i]].val) * this.factors[topic];
                }
            }
        } catch (err_perf) {
            Logger.debug("[Nagios/Transform-PerfData] Error processing performance data [" + topic + "]: " + err_perf.message);
        }

        try {
            this.last[topic].state = json.state;
        } catch (err_state) {
            Logger.debug("[Nagios/Transform-PerfData] Error processing state data [" + topic + "]: " + err_state.message);
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
        
        this.chart.update(val, state);
    };

    return TransformPerfData;
});
