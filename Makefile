BROWSERIFY ?= node_modules/.bin/browserify
UGLIFY ?= node_modules/.bin/uglifyjs
DIST ?= dist
OUTPUT ?= $(DIST)/bundle.js

# hard tabs was breaking so, semicolon style is used :|
# can use @ to suppress output

all: browserify min

min: $(OUTPUT:.js=.min.js)

%.min.js: %.js ; $(UGLIFY) --output $@ $<

browserify: ; mkdir -p dist ; $(BROWSERIFY) index.js --s DXR > $(DIST)/bundle.js

clean: ; @rm -f $(DIST)/*

.PHONY: clean all
