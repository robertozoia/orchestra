# Audio Files Information

## Current Status

✅ **16 test audio files have been created** using synthesized tones with ffmpeg.

The app is now fully functional with test audio files!

## Audio File Details

The test files use different frequencies to distinguish instruments:

### Strings
- **Violin**: 659 Hz (E5)
- **Viola**: 523 Hz (C5)
- **Cello**: 392 Hz (G4)
- **Double Bass**: 196 Hz (G3)

### Brass
- **Trumpet**: 523 Hz (C5)
- **Trombone**: 349 Hz (F4)
- **French Horn**: 294 Hz (D4)
- **Tuba**: 175 Hz (F3)

### Woodwinds
- **Flute**: 1047 Hz (C6) - highest
- **Clarinet**: 523 Hz (C5)
- **Oboe**: 440 Hz (A4)
- **Bassoon**: 233 Hz (A#3)

### Percussion
- **Timpani**: 131 Hz (C3) - deep
- **Snare Drum**: 800 Hz (short)
- **Xylophone**: 2093 Hz (C7) - bright
- **Cymbals**: 5000 Hz (short, high)

## Upgrading to Real Instrument Samples

While the test tones work for testing the app logic, you'll want real instrument samples for the best learning experience.

### Option 1: Philharmonia Orchestra Samples (Best Quality)

1. Visit: https://archive.org/details/philharmonicorchestrasamples

2. Download ZIP files for each instrument (or download all at once)

3. Extract and pick one sample per instrument (I recommend fortissimo, normal articulation)

4. Replace the test audio files in `public/sounds/` with the real samples

5. Keep the same filenames:
   - `public/sounds/strings/violin.mp3`
   - `public/sounds/strings/viola.mp3`
   - etc.

### Option 2: Use the Download Script

Run the provided script (note: may require troubleshooting depending on network):

```bash
./download-samples.sh
```

This attempts to automatically download and extract samples from Internet Archive.

### Option 3: Freesound.org

Search for individual instrument samples:
- https://freesound.org
- Search for: "violin fortissimo", "trumpet note", etc.
- Download and rename to match the expected filenames

### Option 4: Record Your Own

If you have access to instruments or musician friends:
- Record 2-3 second samples
- Export as MP3 (64-128 kbps is fine)
- Replace the test files

## File Requirements

For the app to work, audio files must:
- ✅ Be valid MP3 files
- ✅ Have these exact filenames (in their respective folders)
- ✅ Be reasonably sized (< 500 KB each recommended)
- ✅ Be at least 1-2 seconds long

## Testing Audio Files

To test if an audio file is valid:

```bash
# Check file type
file public/sounds/strings/violin.mp3

# Play it
afplay public/sounds/strings/violin.mp3

# Check size
ls -lh public/sounds/strings/violin.mp3
```

## Current Test Files

The test files work perfectly for:
- ✅ Testing the app functionality
- ✅ Demonstrating the spaced repetition logic
- ✅ Verifying the UI and user flow
- ✅ Development and deployment testing

But they are:
- ❌ Not realistic instrument sounds
- ❌ Simple sine wave tones
- ❌ Not ideal for actually learning instruments

## After Replacing Files

Once you have real instrument samples:

1. Replace the files in `public/sounds/`
2. Test locally: `open public/index.html`
3. Verify all sounds play correctly
4. Redeploy to Netlify (just drag the `public` folder again)

The app will work with any audio files as long as they're in the right locations with the right names!

---

**Note**: The test tones were created using ffmpeg and are perfectly valid for testing. The app is fully functional right now!
