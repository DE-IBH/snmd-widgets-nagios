
DISTS:= \
	dist/Boot.js \
	dist/Chart-CpuUtil.js \
	dist/Chart-DiskTp.js \
	dist/Chart-FcBw.js \
	dist/Chart-IfBw.js \
	dist/Chart-IfPr.js \
	dist/Chart-UpsLoad.js \
	dist/Class-State.js \
	dist/Class-TextState.js \
	dist/Gauge-PerfData.js \
	dist/Gradient-PerfData.js \
	dist/Stroke-PerfData.js \
	dist/Text-PerfData.js \
	dist/Text-PerfMap.js \
	dist/Transform-PerfData.js

all: $(DISTS) dist/widgets-nagios.min.css

dist/%.js: js/%.js
	uglifyjs \
	    --output $@ \
	    --source-map $(subst .js,.map,$@) \
	    --compress \
	    --mangle \
	    --lint \
	    --stats \
	    -- $+

dist/widgets-nagios.min.css: css/widgets-nagios.css
	uglifycss $+ > $@

clean:
	rm -f dist/*.js dist/*.map dist/widgets-nagios.min.css
