#!/bin/sh

ls src/*.js | \
    awk -F/ '{ print $2; }' | \
    awk -F.js '{ print "dist/" $1 ".min.js"; }' | \
    tr "\n" " "
