
all: snmd-widgets-nagios.min.js

snmd-widgets-nagios.min.js: js/*.js
	uglifyjs \
	    -o $@ \
	    -c \
	    -m \
	    --lint \
	    --stats \
	    -- $+
