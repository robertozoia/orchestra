# Orchestra Instrument Trainer

A spaced repetition app to help students learn to recognize orchestra instruments by sound.

## Features

- **Spaced Repetition Learning**: Cards are shown based on your performance
  - Mastered instruments (3 consecutive correct) are no longer shown
  - Wrong answers appear twice per round
  - Learning instruments appear once per round

- **User Management**: Multiple users with individual progress tracking

- **Audio Samples**: High-quality instrument sounds from the Philharmonia Orchestra

- **Progress Tracking**: See your stats and mastered instruments

- **Offline Support**: All data stored locally in browser

## Instruments Included

### Strings (4)
- Violin
- Viola
- Cello
- Double Bass

### Brass (4)
- Trumpet
- Trombone
- French Horn
- Tuba

### Woodwinds (4)
- Flute
- Clarinet
- Oboe
- Bassoon

### Percussion (4)
- Timpani
- Snare Drum
- Xylophone
- Cymbals

## Project Structure

```
orchesta/
├── public/                 # Deploy this folder to Netlify
│   ├── index.html          # Main HTML file
│   ├── sounds/             # Audio files (788 KB - very-long samples!)
│   │   ├── strings/
│   │   ├── brass/
│   │   ├── woodwinds/
│   │   └── percussion/
│   ├── images/             # Placeholder for future images
│   └── src/
│       └── js/
│           ├── data.js         # Instrument database
│           ├── audioManager.js # Lazy audio loading
│           ├── userManager.js  # LocalStorage user management
│           ├── quizLogic.js    # Spaced repetition algorithm
│           └── app.js          # Main UI controller
├── netlify.toml            # Netlify configuration
└── README.md
```

## Technology Stack

- **Frontend**: Vanilla JavaScript (ES6+)
- **Styling**: Tailwind CSS (CDN)
- **Storage**: Browser LocalStorage
- **Hosting**: Netlify
- **Audio**: Web Audio API
- **Total Size**: ~800 KB (including very-long audio samples)

## Local Development

1. Open `public/index.html` in a browser, or
2. Use a local server:
   ```bash
   npx serve public
   ```

## Deployment to Netlify

### Option 1: Drag and Drop
1. Go to [Netlify](https://netlify.com)
2. Drag the `public` folder to the deploy zone

### Option 2: Git Integration
1. Initialize git repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Push to GitHub/GitLab

3. Connect to Netlify:
   - Login to Netlify
   - Click "New site from Git"
   - Select your repository
   - Build settings:
     - **Build command**: (leave empty)
     - **Publish directory**: `public`
   - Deploy!

### Option 3: Netlify CLI
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=public
```

## How It Works

### Spaced Repetition Algorithm

The app follows these rules for showing cards:

1. **New instruments**: Shown once per round until answered
2. **Wrong answer**: Instrument shown twice in each subsequent round
3. **1-2 correct answers**: Shown once per round
4. **3+ consecutive correct**: Marked as "mastered" and no longer shown

### Audio Loading Strategy

- Audio files are NOT loaded on initial page load
- When a round starts, all audio for that round is preloaded
- Files are cached in memory for the session
- Keeps initial load fast and efficient

## Data Storage

All user data is stored in browser LocalStorage:

```javascript
{
  "user_id": {
    "name": "Student Name",
    "progress": {
      "violin": {
        "consecutiveCorrect": 2,
        "totalCorrect": 5,
        "totalWrong": 1,
        "mastered": false
      },
      // ... other instruments
    }
  }
}
```

## Audio Attribution

Audio samples are from the [Philharmonia Orchestra Sound Samples](https://philharmonia.co.uk/resources/sound-samples/), used under Creative Commons license.

## Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile: ✅ Responsive design

## Future Enhancements

Potential features to add:

- [ ] Real instrument images
- [ ] More instruments (harp, piccolo, etc.)
- [ ] Multiple difficulty levels
- [ ] Teacher dashboard
- [ ] Export/import progress
- [ ] Sound variations (different notes, techniques)
- [ ] Leaderboard
- [ ] Daily streak tracking

## License

MIT License - Feel free to use and modify!

## Credits

- **Audio**: Philharmonia Orchestra
- **Built with**: Vanilla JS, Tailwind CSS, Netlify
