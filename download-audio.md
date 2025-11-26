# How to Download Audio Files

The automated download didn't work due to the website structure. Here are manual instructions to get the audio files:

## Option 1: Download from Internet Archive (Recommended)

1. Go to https://archive.org/details/philharmonicorchestrasamples

2. Download these ZIP files and extract them:
   - **Violin**: https://archive.org/download/philharmonicorchestrasamples/Samples/violin.zip
   - **Viola**: https://archive.org/download/philharmonicorchestrasamples/Samples/viola.zip
   - **Cello**: https://archive.org/download/philharmonicorchestrasamples/Samples/cello.zip
   - **Double Bass**: https://archive.org/download/philharmonicorchestrasamples/Samples/double-bass.zip
   - **Trumpet**: https://archive.org/download/philharmonicorchestrasamples/Samples/trumpet.zip
   - **Trombone**: https://archive.org/download/philharmonicorchestrasamples/Samples/trombone.zip
   - **French Horn**: https://archive.org/download/philharmonicorchestrasamples/Samples/french-horn.zip
   - **Tuba**: https://archive.org/download/philharmonicorchestrasamples/Samples/tuba.zip
   - **Flute**: https://archive.org/download/philharmonicorchestrasamples/Samples/flute.zip
   - **Clarinet**: https://archive.org/download/philharmonicorchestrasamples/Samples/clarinet.zip
   - **Oboe**: https://archive.org/download/philharmonicorchestrasamples/Samples/oboe.zip
   - **Bassoon**: https://archive.org/download/philharmonicorchestrasamples/Samples/bassoon.zip
   - **Timpani**: https://archive.org/download/philharmonicorchestrasamples/Samples/timpani.zip
   - **Snare Drum**: https://archive.org/download/philharmonicorchestrasamples/Samples/snare-drum.zip
   - **Xylophone**: https://archive.org/download/philharmonicorchestrasamples/Samples/xylophone.zip
   - **Cymbals**: https://archive.org/download/philharmonicorchestrasamples/Samples/cymbals.zip

3. From each ZIP file, pick ONE MP3 file (any note, preferably fortissimo for clarity)

4. Rename and place them in the correct folders:
   ```
   public/sounds/strings/violin.mp3
   public/sounds/strings/viola.mp3
   public/sounds/strings/cello.mp3
   public/sounds/strings/double-bass.mp3
   public/sounds/brass/trumpet.mp3
   public/sounds/brass/trombone.mp3
   public/sounds/brass/french-horn.mp3
   public/sounds/brass/tuba.mp3
   public/sounds/woodwinds/flute.mp3
   public/sounds/woodwinds/clarinet.mp3
   public/sounds/woodwinds/oboe.mp3
   public/sounds/woodwinds/bassoon.mp3
   public/sounds/percussion/timpani.mp3
   public/sounds/percussion/snare-drum.mp3
   public/sounds/percussion/xylophone.mp3
   public/sounds/percussion/cymbals.mp3
   ```

## Option 2: Use the Helper Script

I've created a script that will help you download the ZIP files automatically:

```bash
./download-samples.sh
```

This will download all ZIP files, extract one sample from each, and place them in the correct locations.

## Option 3: Use Alternative Sources

If Archive.org is slow or unavailable:

1. **Freesound.org** - Search for individual instruments
2. **BBC Sound Effects** - Has orchestra recordings
3. **MusOpen** - Public domain classical music samples

## After Downloading

Once you have the audio files in place:

1. Test locally: `open public/index.html`
2. Verify all sounds play correctly
3. Deploy to Netlify

The app will work with any MP3 files as long as they're named correctly and in the right folders!
