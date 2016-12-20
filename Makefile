
DISTS:= \
	dist/Chart-CpuUtil.min.js \
	dist/Chart-DiskTp.min.js \
	dist/Chart-FcBw.min.js \
	dist/Chart-IfBw.min.js \
	dist/Chart-IfPr.min.js \
	dist/Chart-UpsLoad.min.js \
	dist/Class-State.min.js \
	dist/Class-TextState.min.js \
	dist/Gauge-PerfData.min.js \
	dist/Gradient-PerfData.min.js \
	dist/Stroke-PerfData.min.js \
	dist/Text-PerfData.min.js \
	dist/Text-PerfMap.min.js \
	dist/Transform-PerfData.min.js

all: $(DISTS)

dist/%.min.js: src/%.js
	uglifyjs \
	    --output $@ \
	    --source-map $(subst .min.js,.min.map,$@) \
	    --compress \
	    --mangle \
	    --lint \
	    --stats \
	    -- $+

clean:
	rm -f dist/*.js dist/*.map
