
DISTS:= \
	dist/NagClsState.min.js \
	dist/NagCrtUpsLoad.min.js \
	dist/NagFcBwChart.min.js \
	dist/NagGaugePerfData.min.js \
	dist/NagGraphDiskTp.min.js \
	dist/NagGrdPerfData.min.js \
	dist/NagiosCpuUtil.min.js \
	dist/NagiosIfBw.min.js \
	dist/NagiosIfPr.min.js \
	dist/NagStrokePerfData.min.js \
	dist/NagTrPerfData.min.js \
	dist/NagTxtPerfData.min.js \
	dist/NagTxtPerfMap.min.js \
	dist/NagTxtState.min.js

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
	rm -f $(DISTS)
