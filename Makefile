SRC	:=	$(shell \
			find . -name "*" -type f \
			-not -name "Makefile" \
			-not -name "README.md" \
			-not -name "*.xpi" \
			-not -name "*.zip" \
			-not -name ".gitignore" \
			\
			-not -path "./.git*" \
		)

FIREFOX_BIN	:=	JankE-firefox.xpi
CHROMIUM_BIN	:=	JankE-chromium.zip

.PHONY:	default
default:
	@echo "Please use make firefox or make chromium depending on your browser"

.PHONY: all
all:	firefox chromium

.PHONY:	firefox
firefox:	$(FIREFOX_BIN)

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
