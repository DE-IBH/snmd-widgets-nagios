/*
SNMD - Simple Network Monitoring Dashboard
  https://github.com/DE-IBH/snmd-widgets-nagios/

Authors:
  Thomas Liske <liske@ibh.de>

Copyright Holder:
  2012 - 2013 (C) Thomas Liske [https://fiasko-nw.net/~thomas/]
  2014 - 2017 (C) IBH IT-Service GmbH [https://www.ibh.de/]

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

define(["snmd-core/js/SVGWidget", "snmd-core/js/MQTT", "snmd-core/js/SVGImpl/RadialGradient", "snmd-widgets-nagios/js/Utils", "js-logger"], function (SVGWidget, MQTT, SVGImplGradient, Utils, Logger) {
    'use strict';

    var RadialGradientPerfData = function (root, svg, desc) {
        this.opts = {
            cls: SVGWidget.srClassOpts(desc, "RadialGradient"),
            range: desc.range,
            hoffset: desc.hoffset,
            hscale: desc.hscale,
        };

        var i;
        if (typeof desc.clrsty !== "undefined") {
            for (i = 0; i < desc.clrsty.length; i++) {
                svg.style[desc.clrsty[i]] = '';
            }
        }

        if (typeof desc.keys === "undefined") {
            this.opts.keys = [desc.key];
        } else {
            this.opts.keys = desc.keys;
        }

        this.last = [];
        this.states = [];
        this.tmap = [];

        var stop;
        for (stop in desc.stops) {
            this.last[stop] = {};
            var t;
            for (t = 0; t < desc.stops[stop].length; t++) {
                var topic = desc.stops[stop][t];

                if (typeof this.tmap[topic] === "undefined") {
                    this.tmap[topic] = [];
                }

                if (this.tmap[topic].indexOf(stop) === -1) {
                    this.tmap[topic].push(stop);
                }

                this.last[stop][topic] = undefined;
            }
        }
        this.opts.stops = Object.keys(this.last);

        this.grad = new SVGImplGradient(root, svg, this.opts, Utils.qTipConfig(this, "Performance Data", this.opts.keys));

        /* subscribe to topics */
        Object.keys(this.tmap).forEach(function (topic) {
            MQTT.srRegisterTopic(topic, this);
        }, this);
    };
    
    RadialGradientPerfData.prototype.handleUpdate = function (topic, msg) {
        var json;
        try {
            json = JSON.parse(msg);
        } catch (err) {
            Logger.debug('[Nagios/Gradient-PerfData] JSON error in performance data: ' + err.message);
            return;
        }

        Utils.qTipUpdate(json, this);

        /* set last value of current topic to zero */
        var i;
        for (i = 0; i < this.tmap[topic].length; i++) {
            this.last[this.tmap[topic][i]][topic] = undefined;
        }

        /* extract current value */
        var val = 0;
        var changed = false;
        try {
            this.states[topic] = json.state;

            for (i in this.opts.keys) {
                if (typeof json.perf_data[this.opts.keys[i]] !== "undefined") {
                    val = parseFloat(json.perf_data[this.opts.keys[i]].val);
                    break;
                }
            }

            for (i = 0; i < this.tmap[topic].length; i++) {
                if (this.last[this.tmap[topic][i]][topic] !== val) {
                    this.last[this.tmap[topic][i]][topic] = val;
                    changed = true;
                }
            }
        } catch (err_perf) {
            Logger.debug("[Nagios/Gradient-PerfData] Error processing performance data [" + topic + "]: " + err_perf.message);
        }

        if (changed === false) {
            return;
        }
        
        var state = 0;
        var stops = [];
        var stop;
        for (stop in this.last) {
            val = 0;
            var ok = true;

            var t;
            for (t in this.last[stop]) {
                var v = parseFloat(this.last[stop][t]);
                if (isNaN(v)) {
                    v = 0;
                    ok = false;
                }
                val += v;

                state = Math.max(state, this.states[t]);
            }

            val /= Object.keys(this.last[stop]).length;
            if (isNaN(val)) {
                ok = false;
            }

            /* ignore values out-of-range */
            if (val < this.opts.range[0]) {
                val = this.opts.range[0];
            }
            if (val > this.opts.range[1]) {
                val = this.opts.range[1];
            }

            stops[stop] = (ok ? (this.opts.hoffset + (val - this.opts.range[0]) * this.opts.hscale / (this.opts.range[1] - this.opts.range[0])) % 360 : undefined);
        }

        this.grad.update(stops, state);
    };

    return RadialGradientPerfData;
});
