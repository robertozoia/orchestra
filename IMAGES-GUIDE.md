# Instrument Images Guide

## ✅ Image System Implemented!

The app now supports **high-quality images** for all 16 instruments with automatic fallback to emojis.

## How It Works

### Automatic Image Loading
The app tries to load images in this order:
1. **JPG** - `images/strings/violin.jpg`
2. **PNG** - `images/strings/violin.png` (if JPG not found)
3. **SVG** - `images/strings/violin.svg` (if PNG not found)
4. **Emoji** - 🎻 (if no images found)

### Smart Fallback
- Images are loaded asynchronously
- No errors if images don't exist
- Seamless fallback to emojis
- Works offline once images are cached

## Adding Your Own Images

### Step 1: Get High-Quality Images

**Recommended Free Sources:**

1. **[Pixabay](https://pixabay.com/images/search/orchestra%20instrument/)** ⭐ BEST
   - License: CC0 (Public Domain)
   - No attribution required
   - Search: "violin", "trumpet", "cello", etc.

2. **[Unsplash](https://unsplash.com/s/photos/orchestra-instruments)**
   - Professional photography
   - Free for commercial use
   - No attribution required

3. **[Pexels](https://www.pexels.com/search/orchestra%20instruments/)**
   - High quality, free
   - No attribution required

4. **[Wikimedia Commons](https://commons.wikimedia.org/)**
   - Largest free image database
   - Check license per image
   - Most are Public Domain

### Step 2: Download and Name Files

Save images with these **exact filenames**:

```
public/images/strings/
  ✓ violin.jpg      (or .png or .svg)
  ✓ viola.jpg
  ✓ cello.jpg
  ✓ double-bass.jpg

public/images/brass/
  ✓ trumpet.jpg
  ✓ trombone.jpg
  ✓ french-horn.jpg
  ✓ tuba.jpg

public/images/woodwinds/
  ✓ flute.jpg
  ✓ clarinet.jpg
  ✓ oboe.jpg
  ✓ bassoon.jpg

public/images/percussion/
  ✓ timpani.jpg
  ✓ snare-drum.jpg
  ✓ xylophone.jpg
  ✓ cymbals.jpg
```

### Step 3: Image Specifications

**Recommended:**
- **Format**: JPG (smallest file size) or PNG (transparent background)
- **Dimensions**: 800x800px to 1200x1200px square
- **Background**: White, light gray, or transparent
- **Orientation**: Portrait or square (centered instrument)
- **Quality**: High resolution, clear details
- **File size**: 50-200 KB per image (compress if needed)

**Search Tips:**
- Add "isolated" or "white background" to your search
- Look for professional product photography
- Choose images with good lighting
- Avoid images with people or text overlays

## Quick Download Examples

### Using Pixabay
1. Go to https://pixabay.com
2. Search "violin instrument"
3. Click image → Download → Medium (usually perfect size)
4. Save as `violin.jpg` in `public/images/strings/`

### Using Unsplash
```bash
# Quick download via terminal
curl "https://source.unsplash.com/800x800/?violin" \
  -o public/images/strings/violin.jpg
```

## Testing

After adding images:
```bash
open public/index.html
```

1. Create a user and start a quiz
2. Answer a question
3. Check the feedback screen
4. You should see your instrument image!

If image doesn't appear:
- Check filename matches exactly
- Check file is in correct folder
- Check file is a valid image (not HTML error page)
- Open browser console (F12) to see any errors

## Image Display

### Current Display (on feedback screen):
- **Size**: Up to 300x300px
- **Style**: Rounded corners, shadow, white background
- **Position**: Centered below feedback text
- **Effect**: Smooth fade-in animation

### Fallback (if no image):
- **Display**: Large emoji (🎻🎺🪈🥁)
- **Style**: Gradient purple-blue background
- **Size**: Same 300x300px container

## File Structure

```
public/images/
├── strings/
│   ├── violin.jpg       ← Add your image here
│   ├── viola.jpg
│   ├── cello.jpg
│   └── double-bass.jpg
├── brass/
│   ├── trumpet.jpg
│   ├── trombone.jpg
│   ├── french-horn.jpg
│   └── tuba.jpg
├── woodwinds/
│   ├── flute.jpg
│   ├── clarinet.jpg
│   ├── oboe.jpg
│   └── bassoon.jpg
└── percussion/
    ├── timpani.jpg
    ├── snare-drum.jpg
    ├── xylophone.jpg
    └── cymbals.jpg
```

## Optimization Tips

### Compress Images
Use online tools to reduce file size:
- **TinyPNG**: https://tinypng.com (best for PNG/JPG)
- **Squoosh**: https://squoosh.app (Google's image compressor)
- **ImageOptim**: https://imageoptim.com (Mac app)

### Batch Processing
If you have ImageMagick installed:
```bash
# Resize all images to 800x800px
for img in public/images/*/*.jpg; do
  convert "$img" -resize 800x800 -quality 85 "$img"
done
```

## Attribution

If using images that require attribution:

Add to your HTML footer or About section:
```html
<!-- Example -->
<footer>
  <p>Instrument images from
    <a href="https://pixabay.com">Pixabay</a>
  </p>
</footer>
```

Most sources (Pixabay, Unsplash, Pexels) don't require attribution but appreciate it!

## Benefits of Adding Images

✅ **Professional appearance**
✅ **Better learning** - Visual reinforcement
✅ **More engaging** - Students see what they're learning
✅ **Educational value** - Learn instrument shapes and parts
✅ **Modern look** - Replaces simple emojis
✅ **No code changes needed** - Just drop in images!

## Current Status

- ✅ Image loading system implemented
- ✅ Automatic fallback to emojis
- ✅ Support for JPG, PNG, and SVG formats
- ✅ Responsive sizing and styling
- ⏳ Waiting for you to add images!

The app will work perfectly with emojis until you add images. When you're ready, just drop the images in the folders and they'll automatically appear!

---

**Sources Referenced:**
- [Pixabay - Orchestra Instruments](https://pixabay.com/images/search/orchestra%20instrument/)
- [Unsplash - Musical Instruments](https://unsplash.com/s/photos/orchestra-instruments)
- [Pexels - Orchestra](https://www.pexels.com/search/orchestra%20instruments/)
- [Wikimedia Commons](https://commons.wikimedia.org/)

Happy decorating! 🎻🎺🎵
