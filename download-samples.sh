#!/bin/bash

# Orchestra Instrument Samples Downloader
# Downloads samples from Internet Archive and places them in correct folders

set -e

echo "🎵 Downloading Orchestra Instrument Samples..."
echo "This may take a few minutes..."
echo ""

# Create temp directory
TEMP_DIR=$(mktemp -d)
echo "Using temp directory: $TEMP_DIR"

# Base URL
BASE_URL="https://archive.org/download/philharmonicorchestrasamples/Samples"

# Function to download and extract
download_instrument() {
    local instrument=$1
    local category=$2
    local filename=$3
    local sample_file=$4  # Which file to extract from zip

    echo "Downloading $instrument..."

    # Download ZIP
    curl -L -o "$TEMP_DIR/$instrument.zip" "$BASE_URL/$instrument.zip" 2>/dev/null

    # Extract specific file or first MP3
    if [ -z "$sample_file" ]; then
        # Extract first fortissimo normal sample found
        unzip -q "$TEMP_DIR/$instrument.zip" -d "$TEMP_DIR/$instrument/"
        find "$TEMP_DIR/$instrument/" -name "*fortissimo*.mp3" -o -name "*forte*.mp3" | head -1 | xargs -I {} cp {} "public/sounds/$category/$filename.mp3"
    else
        unzip -q -j "$TEMP_DIR/$instrument.zip" "$sample_file" -d "public/sounds/$category/"
        mv "public/sounds/$category/$(basename $sample_file)" "public/sounds/$category/$filename.mp3"
    fi

    echo "✓ $instrument done"
}

# Download strings
download_instrument "violin" "strings" "violin"
download_instrument "viola" "strings" "viola"
download_instrument "cello" "strings" "cello"
download_instrument "double-bass" "strings" "double-bass"

# Download brass
download_instrument "trumpet" "brass" "trumpet"
download_instrument "trombone" "brass" "trombone"
download_instrument "french-horn" "brass" "french-horn"
download_instrument "tuba" "brass" "tuba"

# Download woodwinds
download_instrument "flute" "woodwinds" "flute"
download_instrument "clarinet" "woodwinds" "clarinet"
download_instrument "oboe" "woodwinds" "oboe"
download_instrument "bassoon" "woodwinds" "bassoon"

# Download percussion
download_instrument "timpani" "percussion" "timpani"
download_instrument "snare-drum" "percussion" "snare-drum"
download_instrument "xylophone" "percussion" "xylophone"
download_instrument "cymbals" "percussion" "cymbals"

# Cleanup
rm -rf "$TEMP_DIR"

echo ""
echo "✅ All samples downloaded successfully!"
echo ""
echo "Verifying files..."
for dir in public/sounds/*/; do
    echo "$(basename $dir): $(ls $dir/*.mp3 2>/dev/null | wc -l | tr -d ' ') files"
done

echo ""
echo "🎉 Ready to use! Open public/index.html to test."
