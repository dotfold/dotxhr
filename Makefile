# build
BROWSERIFY ?= node_modules/.bin/browserify
UGLIFY ?= node_modules/.bin/uglifyjs
DIST ?= dist
OUTPUT ?= $(DIST)/bundle.js
# tdd / unit
MOCHA?=mocha
MOCHA_PARAMS?=

# To work around the fact that commas are argument separators.
comma:=,

# hard tabs was breaking so, semicolon style is used :|
# can use @ to suppress output

all: test browserify min

min: $(OUTPUT:.js=.min.js)

%.min.js: %.js ; $(UGLIFY) --output $@ $<

browserify: ; mkdir -p dist ; $(BROWSERIFY) index.js --s DXR > $(DIST)/bundle.js

clean: ; @rm -f $(DIST)/*

# run all tests
test: ; $(MOCHA) $(MOCHA_PARAMS) --reporter spec

# run all tests and watch
test-w: ; $(MOCHA) $(MOCHA_PARAMS) --reporter spec --growl --watch

.PHONY: clean test all
