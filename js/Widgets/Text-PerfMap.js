/*
SNMD - Simple Network Monitoring Dashboard
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

define(["snmd-core/js/SVGWidget", "snmd-core/js/SVGImpl/Text", "snmd-widgets-nagios/js/Utils", "js-logger"], function (SVGWidget, SVGImplText, Utils, Logger) {
    'use strict';

    var TextPerfMap = function (root, svg, desc) {
        this.opts = {
            desc: desc,
            cls: SVGWidget.srClassOpts(desc, "Text")
        };

        this.desc = desc;

        this.opts.key = desc.key;

        if (typeof desc.map !== "undefined") {
            this.opts.map = desc.map;
        } else {
            this.opts.map = [];
        }

        if (desc.topics.length !== 1) {
            throw "NagTextPerfMap supports a single topic, only!";
        }

        this.chart = new SVGImplText(root, svg, this.opts, Utils.qTipConfig(this, "Performance Data", [this.opts.key]));
    };

    TextPerfMap.prototype.handleUpdate = function (topic, msg) {
        var json;
        try {
            json = JSON.parse(msg);
        } catch (err_parse) {
            Logger.debug('[Nagios/Text-PerfMap] JSON error in performance data: ' + err_parse.message);
            return;
        }

        Utils.qTipUpdate(json, this);

        try {
            var val = '?';
            if (typeof json.perf_data[this.opts.key] !== "undefined") {
                val = json.perf_data[this.opts.key].val;
                if (val in this.opts.map) {
                    val = this.opts.map[val];
                } else {
                    val = '?';
                    Logger.debug("[Nagios/Text-PerfMap] No mapping available [" + topic + "]: " + this.opts.key + " => '" + json.perf_data[this.opts.key].val + "'");
                }
            }
            this.chart.update(val, json.state, false);
        } catch (err_perf) {
            Logger.debug("[Nagios/Text-PerfMap] Error processing performance data [" + topic + "]: " + err_perf.message);
        }
    };

    return TextPerfMap;
});
