
DISTS:= \
	dist/js/Boot.js \
	dist/js/Utils.js \
	dist/js/Widgets/Chart-CpuUtil.js \
	dist/js/Widgets/Chart-DiskIops.js \
	dist/js/Widgets/Chart-DiskTp.js \
	dist/js/Widgets/Chart-DiskUtil.js \
	dist/js/Widgets/Chart-DiskWait.js \
	dist/js/Widgets/Chart-FcBw.js \
	dist/js/Widgets/Chart-IfBw.js \
	dist/js/Widgets/Chart-IfPr.js \
	dist/js/Widgets/Chart-IfQoS.js \
	dist/js/Widgets/Chart-IfVPN.js \
	dist/js/Widgets/Chart-OMDChecks.js \
	dist/js/Widgets/Chart-UpsLoad.js \
	dist/js/Widgets/Chart-WlcClients.js \
	dist/js/Widgets/Class-State.js \
	dist/js/Widgets/Class-TextState.js \
	dist/js/Widgets/Gauge-PerfData.js \
	dist/js/Widgets/Gradient-PerfData.js \
	dist/js/Widgets/RadialGradient-PerfData.js \
	dist/js/Widgets/Stroke-PerfData.js \
	dist/js/Widgets/Text-PerfData.js \
	dist/js/Widgets/Text-PerfMap.js \
	dist/js/Widgets/Transform-PerfData.js

all: $(DISTS) dist/css/widgets-nagios.css

dist/js/%.js: js/%.js
	uglifyjs \
	    --output $@ \
	    --source-map \
	    --compress \
	    --mangle \
	    --lint \
	    --stats \
	    -- $+

dist/js/Widgets/%.js: js/Widgets/%.js
	uglifyjs \
	    --output $@ \
	    --source-map \
	    --compress \
	    --mangle \
	    --lint \
	    --stats \
	    -- $+

dist/css/widgets-nagios.css: css/widgets-nagios.css
	uglifycss $+ > $@

clean:
	rm -f dist/js/*.js dist/js/*.map dist/js/Widgets/*.js dist/js/Widgets/*.map dist/css/widgets-nagios.css
