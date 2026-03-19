WEB_EXT	?=	web-ext

SIGNED_FOLDER	:=	web-ext-artifacts

SRC	:=	$(shell \
			find . -name "*" -type f \
			-not -name "Makefile" \
			-not -name "README.md" \
			-not -name "*.xpi" \
			-not -name "*.zip" \
			-not -name ".gitignore" \
			-not -name ".amo-upload-uuid" \
			\
			-not -path "./.git*" \
			-not -path "./$(SIGNED_FOLDER)*" \
		)

FIREFOX_BIN	:=	JankE-firefox.xpi
CHROMIUM_BIN	:=	JankE-chromium.zip

.PHONY:	default
default:
	@echo "Please use make firefox or make chromium depending on your browser"

.PHONY: dev
dev:	firefox chromium

.PHONY: release
release:	sign-firefox chromium

.PHONY:	firefox
firefox:	$(FIREFOX_BIN)

.PHONY:	sign-firefox
sign-firefox:
	$(WEB_EXT) build
	-$(WEB_EXT) sign --channel unlisted --approval-timeout 0 --no-input \
	--api-key $(MOZILLA_API_KEY) --api-secret $(MOZILLA_API_SECRET)
	-mv $(SIGNED_FOLDER)/janke-*.zip $(FIREFOX_BIN)

$(FIREFOX_BIN):	$(SRC)
	zip -r -FS $(FIREFOX_BIN) $^

.PHONY:	chromium
chromium:	$(CHROMIUM_BIN)

$(CHROMIUM_BIN): $(SRC)
	zip -r -FS $(CHROMIUM_BIN) $^

.PHONY:	clean
clean:
	$(RM) $(CHROMIUM_BIN)
	$(RM) $(FIREFOX_BIN)
