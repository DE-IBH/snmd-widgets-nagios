
DISTS:= \
	dist/js/Boot.js \
	dist/js/Chart-CpuUtil.js \
	dist/js/Chart-DiskIops.js \
	dist/js/Chart-DiskTp.js \
	dist/js/Chart-DiskUtil.js \
	dist/js/Chart-DiskWait.js \
	dist/js/Chart-FcBw.js \
	dist/js/Chart-IfBw.js \
	dist/js/Chart-IfPr.js \
	dist/js/Chart-IfQoS.js \
	dist/js/Chart-IfVPN.js \
	dist/js/Chart-OMDChecks.js \
	dist/js/Chart-UpsLoad.js \
	dist/js/Chart-WlcClients.js \
	dist/js/Class-State.js \
	dist/js/Class-TextState.js \
	dist/js/Gauge-PerfData.js \
	dist/js/Gradient-PerfData.js \
	dist/js/RadialGradient-PerfData.js \
	dist/js/Stroke-PerfData.js \
	dist/js/Text-PerfData.js \
	dist/js/Text-PerfMap.js \
	dist/js/Transform-PerfData.js

all: $(DISTS) dist/css/widgets-nagios.css

dist/js/%.js: js/%.js
	uglifyjs \
	    --output $@ \
	    --source-map $(subst .js,.map,$@) \
	    --compress \
	    --mangle \
	    --lint \
	    --stats \
	    -- $+

dist/css/widgets-nagios.css: css/widgets-nagios.css
	uglifycss $+ > $@

clean:
	rm -f dist/js/*.js dist/js/*.map dist/css/widgets-nagios.css
