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

define(["snmd-core/js/SVGWidget", "snmd-core/js/SVGImpl/Chart", "snmd-widgets-nagios/js/Utils", "js-logger"], function (SVGWidget, SVGImplChart, Utils, Logger) {
    'use strict';

    var ChartCpuUtil = function (root, svg, desc) {
        this.opts = {
            title: "CPU Utilization",
            axis: [
                {
                    max: 100,
                    scale: 'linear'
                }
            ],
            desc: desc,
            dpi: 60 / 5 / 60,
            cls: SVGWidget.srClassOpts(desc, "Chart")
        };

        this.lines = [
            {
                name: 'util',
                axis: 0,
                unit: '%',
                style: {
                    stroke: 'Orchid',
                    strokeLineCap: 'round',
                    strokeLineJoin: 'round',
                    strokeWidth: 1.5,
                    fill: 'Orchid'
                }
            }
        ];
        
        this.desc = desc;
        this.last = [];
        var i;
        for (i = 0; i < desc.topics.length; i++) {
            this.last[desc.topics[i]] = [0, 0];
        }

        this.chart = new SVGImplChart(root, svg, this.opts, this.lines, Utils.qTipConfig(this, this.lines.map(function (l) {
            return l.name;
        })));
    };
    
    ChartCpuUtil.prototype.handleUpdate = function (topic, msg) {
        var json;
        try {
            json = JSON.parse(msg);
        } catch (err_parse) {
            Logger.debug('[Nagios/Chart-CpuUtil] JSON error in performance data: ' + err_parse.message);
            return;
        }

        var i;
        for (i = 0; i < this.lines.length; i++) {
            this.last[topic][i] = 0;
            try {
                this.last[topic][i] = json.perf_data[this.lines[i].name].val;
            } catch (err_perf) {
                Logger.debug("[Nagios/Chart-CpuUtil] Error processing performance data of " + topic + "[" + i + "]: " + err_perf.message);
            }
        }
        
        var vals = [];
        for (i = 0; i < this.lines.length; i++) {
            vals[i] = 0;

            var count = 0;
            var t;
            for (t in this.last) {
                vals[i] += parseFloat(this.last[t][i]);
                count = count + 1;
            }
            vals[i] = vals[i] / count;
        }
        
        this.chart.update(json._timestamp, vals);
    };

    return ChartCpuUtil;
});
