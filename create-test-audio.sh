#!/bin/bash

# Create test audio files using ffmpeg
# These are simple tones that can be replaced with real instrument samples later

echo "Creating test audio files..."

# Function to create a tone
create_tone() {
    local freq=$1
    local duration=$2
    local output=$3
    local instrument_name=$4

    echo "Creating $instrument_name ($freq Hz)..."

    # Create a sine wave tone
    ffmpeg -f lavfi -i "sine=frequency=$freq:duration=$duration" \
           -af "volume=0.5" \
           -y "$output" 2>/dev/null
}

# Strings (higher frequencies)
create_tone 659 2 "public/sounds/strings/violin.mp3" "Violin"
create_tone 523 2 "public/sounds/strings/viola.mp3" "Viola"
create_tone 392 2 "public/sounds/strings/cello.mp3" "Cello"
create_tone 196 2 "public/sounds/strings/double-bass.mp3" "Double Bass"

# Brass (mid-range frequencies with harmonics)
create_tone 523 2 "public/sounds/brass/trumpet.mp3" "Trumpet"
create_tone 349 2 "public/sounds/brass/trombone.mp3" "Trombone"
create_tone 294 2 "public/sounds/brass/french-horn.mp3" "French Horn"
create_tone 175 2 "public/sounds/brass/tuba.mp3" "Tuba"

# Woodwinds (pure tones, higher range)
create_tone 1047 2 "public/sounds/woodwinds/flute.mp3" "Flute"
create_tone 523 2 "public/sounds/woodwinds/clarinet.mp3" "Clarinet"
create_tone 440 2 "public/sounds/woodwinds/oboe.mp3" "Oboe"
create_tone 233 2 "public/sounds/woodwinds/bassoon.mp3" "Bassoon"

# Percussion (short duration, different characteristics)
create_tone 131 0.5 "public/sounds/percussion/timpani.mp3" "Timpani"
create_tone 800 0.3 "public/sounds/percussion/snare-drum.mp3" "Snare Drum"
create_tone 2093 0.5 "public/sounds/percussion/xylophone.mp3" "Xylophone"
create_tone 5000 0.3 "public/sounds/percussion/cymbals.mp3" "Cymbals"

echo ""
echo "✅ Test audio files created!"
echo ""
echo "Note: These are simple test tones. For the best experience,"
echo "download real instrument samples from:"
echo "https://archive.org/details/philharmonicorchestrasamples"
echo ""
echo "🎵 The app will work now! Open public/index.html to test."
