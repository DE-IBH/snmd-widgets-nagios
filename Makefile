all: dist/snmd-widgets-nagios.min.js
	@for lib in $+; do \
	    echo $$lib; \
	done > js.min.inc

dist/snmd-widgets-nagios.min.js: src/*.js
	@for lib in $+; do \
	    echo $$lib; \
	done > js.dev.inc
	uglifyjs \
	    --output $@ \
	    --source-map dist/snmd-widgets-nagios.min.map \
	    --compress \
	    --mangle \
	    --lint \
	    --stats \
	    -- $+

clean:
	rm -f js.min.inc js.dev.inc dist/snmd-widgets-nagios.min.js dist/snmd-widgets-nagios.min.map
