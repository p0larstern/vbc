DOCS_DIR="./docs"
echo Cleaning "$DOCS_DIR"
if [ -d "$DOCS_DIR" ]; then
  echo "$DOCS_DIR" exists
  rm -rf "$DOCS_DIR"
  echo "$DOCS_DIR" cleaned
fi
