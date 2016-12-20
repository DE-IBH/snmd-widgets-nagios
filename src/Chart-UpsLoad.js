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

define(["snmd-core/SVGWidget", "snmd-core/SVGImpl/Chart"], function (SVGWidget, SVGImplChart) {
    'use strict';

    var ChartUpsLoad = function (root, svg, desc) {
        var i;

        this.opts = {
            axis: [
                {
                    max: 50,
                    scale: 'linear'
                }
            ],
            desc: desc,
            dpi: 60 / 5 / 60,
            cls: SVGWidget.srClassOpts(desc, "Chart")
        };
        this.lines = [
            {
                name: 'out_load',
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
        for (i = 0; i < desc.topics.length; i += 1) {
            this.last[desc.topics[i]] = [0];
        }

        this.chart = new SVGImplChart(root, svg, this.opts, this.lines);
    };
    
    ChartUpsLoad.prototype.handleUpdate = function (topic, msg) {
        var count,
            i,
            json,
            vals = [];

        try {
            json = JSON.parse(msg);
        } catch (err_parse) {
            console.error('JSON error in performance data: ' + err_parse.message);
            return;
        }
        
        for (i = 0; i < this.lines.length; i += 1) {
            this.last[topic][i] = 0;
            try {
                this.last[topic][i] = json.perf_data[this.lines[i].name].val;
            } catch (err_last) {
                console.warn("Error to process performance data of [" + topic + "].line[" + i + "]: " + err_last.message);
            }
        }
        
        for (i = 0; i < this.lines.length; i += 1) {
            vals[i] = 0;

            count = 0;
            var t;
            for (t in this.last) {
                vals[i] += parseFloat(this.last[t][i]);
                count = count + 1;
            }
            vals[i] = vals[i] / count;
        }
        
        this.chart.update(json._timestamp, vals);
    };

    return ChartUpsLoad;
});
