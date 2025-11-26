# Adding High-Quality Instrument Images

## Current Status

The app currently uses emojis (🎻🎺🪈🥁) to display instruments in the feedback screen. To upgrade to real images:

## Option 1: Use Your Own Images

Place high-quality images in these folders:

```
public/images/strings/
  - violin.jpg (or .png)
  - viola.jpg
  - cello.jpg
  - double-bass.jpg

public/images/brass/
  - trumpet.jpg
  - trombone.jpg
  - french-horn.jpg
  - tuba.jpg

public/images/woodwinds/
  - flute.jpg
  - clarinet.jpg
  - oboe.jpg
  - bassoon.jpg

public/images/percussion/
  - timpani.jpg
  - snare-drum.jpg
  - xylophone.jpg
  - cymbals.jpg
```

## Option 2: Download from Free Sources

### Recommended Sources (with proper attribution):

**1. Pixabay** - https://pixabay.com/images/search/orchestra%20instrument/
- License: CC0 (Public Domain)
- No attribution required
- High quality, free for commercial use

**2. Wikimedia Commons** - https://commons.wikimedia.org/
- Search for individual instruments
- Check license per image (most are Public Domain)
- May require attribution

**3. Unsplash** - https://unsplash.com/s/photos/orchestra-instruments
- License: Unsplash License (free for commercial use)
- No attribution required
- Professional photography

**4. Pexels** - https://www.pexels.com/search/orchestra%20instruments/
- License: Pexels License (free)
- No attribution required

### Search Terms to Use:
- "violin isolated white background"
- "trumpet instrument professional"
- "cello close up"
- "french horn brass instrument"

## Recommended Image Specifications

- **Format**: JPG or PNG
- **Size**: 800x800px to 1200x1200px
- **Background**: White or transparent (PNG)
- **Quality**: High resolution, clear details
- **Orientation**: Portrait or square
- **File size**: 50-200 KB per image (compressed)

## Once You Have Images

The app is already configured to use images! Just place them in the correct folders with the correct names, and they'll automatically display instead of emojis.

### Image File Names (must match exactly):

**Strings:**
- violin.jpg
- viola.jpg
- cello.jpg
- double-bass.jpg

**Brass:**
- trumpet.jpg
- trombone.jpg
- french-horn.jpg
- tuba.jpg

**Woodwinds:**
- flute.jpg
- clarinet.jpg
- oboe.jpg
- bassoon.jpg

**Percussion:**
- timpani.jpg
- snare-drum.jpg
- xylophone.jpg
- cymbals.jpg

## Quick Download Script

If you want to batch download from Unsplash or Pixabay, use their API:

```bash
# Example for Unsplash
# Get an API key from unsplash.com/developers

# Then download like this:
curl "https://source.unsplash.com/800x800/?violin" -o public/images/strings/violin.jpg
curl "https://source.unsplash.com/800x800/?viola" -o public/images/strings/viola.jpg
# ... etc
```

## App Will Automatically:
1. Check if image exists at the path
2. Display image if found
3. Fall back to emoji if image not found
4. Scale image to fit the display area
5. Add subtle styling and effects

## Testing

After adding images:
```bash
open public/index.html
```

Play through a quiz and check the feedback screen - you should see real instrument photos!

## Attribution (if required)

If using images that require attribution, add to your About page or footer:
- "Instrument images from [Source Name]"
- Include links if required by license

## Sources Referenced

- [Pixabay Orchestra Instruments](https://pixabay.com/images/search/orchestra%20instrument/)
- [Wikimedia Commons](https://commons.wikimedia.org/)
- [Unsplash](https://unsplash.com/)
- [Pexels](https://www.pexels.com/)
