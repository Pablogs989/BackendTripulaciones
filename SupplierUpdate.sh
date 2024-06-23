#!/bin/bash

# Directory to search
SEARCH_DIR="."

# Replace words within files
find "$SEARCH_DIR" -type f -name "*.js" -exec sed -i '' 's/Suplier/Supplier/g; s/suplier/supplier/g' {} +

# Rename files
find "$SEARCH_DIR" -type f -name "*Suplier*.js" | while read FILE; do
    NEW_FILE=$(echo "$FILE" | sed 's/Suplier/Supplier/g')
    mv "$FILE" "$NEW_FILE"
done

find "$SEARCH_DIR" -type f -name "*suplier*.js" | while read FILE; do
    NEW_FILE=$(echo "$FILE" | sed 's/suplier/supplier/g')
    mv "$FILE" "$NEW_FILE"
done

echo "Replacement completed."
