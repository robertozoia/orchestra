# Quick Start Guide

## ✅ App Ready to Use!

The app now has **real Philharmonia Orchestra samples** with very-long durations for better learning! See [VERY-LONG-SAMPLES.md](VERY-LONG-SAMPLES.md) for details.

## Test Locally (No Installation Required)

Simply open the file in your browser:
```bash
open public/index.html
```

Or use a local server for better testing:
```bash
npx serve public
```

Then visit: http://localhost:3000

## Deploy to Netlify

### Method 1: Drag & Drop (Easiest - 2 minutes)

1. Go to https://app.netlify.com/drop
2. Drag the `public` folder onto the page
3. Done! Your app is live.

### Method 2: Git + Netlify (Recommended for updates)

1. **Initialize Git:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Orchestra Trainer"
   ```

2. **Push to GitHub:**
   ```bash
   # Create a new repository on GitHub first, then:
   git remote add origin https://github.com/YOUR_USERNAME/orchestra-trainer.git
   git branch -M main
   git push -u origin main
   ```

3. **Deploy on Netlify:**
   - Go to https://app.netlify.com
   - Click "New site from Git"
   - Choose GitHub and select your repository
   - Build settings:
     - **Build command**: (leave empty)
     - **Publish directory**: `public`
   - Click "Deploy site"

4. **Your app is live!** You'll get a URL like: `https://random-name-12345.netlify.app`

### Method 3: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=public
```

## First Time Setup

1. Open the app
2. Create a new user (enter your name)
3. Click "Start Learning"
4. Listen to the sound and guess the instrument
5. Track your progress as you master each instrument!

## How to Use

- **Play Sound**: Click the play button to hear the instrument
- **Choose Answer**: Select one of three options
- **Get Feedback**: See if you're correct and view the instrument
- **Progress**: Instruments you get right 3 times in a row are "mastered"
- **Reset**: Click "Reset My Progress" to start over

## Sharing with Students

Once deployed to Netlify, just share the URL with your students. Each student:
1. Creates their own username
2. Their progress is saved in their browser
3. They can return anytime to continue learning

## Notes

- All data is stored locally in the browser (LocalStorage)
- No server or database needed
- Audio files (1.4 MB) are downloaded as needed
- Works on desktop and mobile
- No internet required after first load (cached in browser)

## Troubleshooting

**Audio not playing?**
- Check browser permissions for audio
- Try clicking somewhere on the page first (browsers require user interaction)

**Lost progress?**
- Progress is tied to the browser and device
- Clearing browser data will reset progress
- Use the same browser/device to continue

**Want to add more instruments?**
- Add audio files to `public/sounds/[type]/`
- Update `src/js/data.js` with new instrument info
- Redeploy

Enjoy learning orchestra instruments!
