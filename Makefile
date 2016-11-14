
all: dist/snmd-widgets-nagios.min.js

dist/snmd-widgets-nagios.min.js: src/*.js
	uglifyjs \
	    --output $@ \
	    --source-map dist/snmd-widgets-nagios.min.map \
	    --compress \
	    --mangle \
	    --lint \
	    --stats \
	    -- $+
