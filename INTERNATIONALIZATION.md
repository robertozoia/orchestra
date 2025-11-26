# Internationalization (i18n) Implementation

## Summary

✅ **The app now supports 3 languages with German as the default!**

- 🇩🇪 **German (Deutsch)** - Default language
- 🇪🇸 **Spanish (Español)**
- 🇬🇧 **English**

## Features Implemented

### Language Switcher
- Top-right corner language buttons with flag emojis
- Active language highlighted in purple
- Instant switching without page reload
- Language preference saved in browser LocalStorage

### Translated Elements

**All UI text is fully translated:**
- ✅ App title and subtitle
- ✅ User management (create, select, progress stats)
- ✅ Quiz interface (questions, play button, navigation)
- ✅ Feedback messages (correct/wrong answers)
- ✅ Round completion screen
- ✅ All alert messages and confirmations
- ✅ Instrument names (16 instruments in 3 languages)

### Technical Implementation

**Files Created:**
1. **translations.js** - Contains all translations in 3 languages
2. **i18n.js** - Internationalization manager class

**Files Modified:**
1. **index.html** - Added data-i18n attributes and language switcher
2. **app.js** - Updated to use i18n for dynamic content

## Instrument Translations

### Strings (Streicher / Cuerdas)
- Violin → **Violine** (DE) / **Violín** (ES)
- Viola → **Bratsche** (DE) / **Viola** (ES)
- Cello → **Cello** (DE) / **Violonchelo** (ES)
- Double Bass → **Kontrabass** (DE) / **Contrabajo** (ES)

### Brass (Blech / Metal)
- Trumpet → **Trompete** (DE) / **Trompeta** (ES)
- Trombone → **Posaune** (DE) / **Trombón** (ES)
- French Horn → **Waldhorn** (DE) / **Trompa** (ES)
- Tuba → **Tuba** (DE) / **Tuba** (ES)

### Woodwinds (Holzbläser / Maderas)
- Flute → **Flöte** (DE) / **Flauta** (ES)
- Clarinet → **Klarinette** (DE) / **Clarinete** (ES)
- Oboe → **Oboe** (DE) / **Oboe** (ES)
- Bassoon → **Fagott** (DE) / **Fagot** (ES)

### Percussion (Schlaginstrumente / Percusión)
- Timpani → **Pauke** (DE) / **Tímpano** (ES)
- Snare Drum → **Kleine Trommel** (DE) / **Caja** (ES)
- Xylophone → **Xylophon** (DE) / **Xilófono** (ES)
- Cymbals → **Becken** (DE) / **Platillos** (ES)

## How It Works

### 1. Initial Load
- App checks LocalStorage for saved language preference
- Defaults to German (`de`) if no preference is saved
- Translates all elements with `data-i18n` attributes

### 2. Language Switching
```javascript
// User clicks language button (DE/ES/EN)
i18n.setLanguage('es') // Example: switch to Spanish

// What happens:
// 1. Updates HTML lang attribute
// 2. Highlights active button
// 3. Translates all static text
// 4. Updates dynamic content (instrument names, etc.)
// 5. Saves preference to LocalStorage
```

### 3. Dynamic Content
```javascript
// Instrument names in quiz options
button.textContent = i18n.getInstrumentName('violin');
// Returns: "Violine" (DE) / "Violín" (ES) / "Violin" (EN)

// Alert messages
alert(i18n.t('welcome'));
// Returns: "Willkommen" (DE) / "Bienvenido" (ES) / "Welcome" (EN)
```

## Usage

### For Users
1. Open the app
2. Click the language flag button in the top-right corner
3. Choose: 🇩🇪 DE, 🇪🇸 ES, or 🇬🇧 EN
4. The interface updates instantly
5. Your choice is remembered for next visit

### For Developers
To add a new language:

1. Add translations to `translations.js`:
```javascript
TRANSLATIONS.fr = {
    appTitle: 'Entraîneur d\'Instruments d\'Orchestre',
    // ... add all translation keys
};
```

2. Add button to HTML:
```html
<button id="langFr" class="...">
    🇫🇷 FR
</button>
```

3. Bind event in `i18n.js`:
```javascript
document.getElementById('langFr')?.addEventListener('click',
    () => this.setLanguage('fr'));
```

## Files Structure

```
public/
├── index.html              # UI with data-i18n attributes
└── src/js/
    ├── translations.js     # Translation dictionary (DE/ES/EN)
    ├── i18n.js            # I18n manager class
    └── app.js             # Updated to use i18n
```

## Translation Keys

All translation keys follow this structure:
- **UI Elements**: `appTitle`, `startLearning`, `exitQuiz`, etc.
- **Feedback**: `correct`, `notQuite`, `thatsA`, `thatWasA`
- **Stats**: `mastered`, `learning`, `totalCorrect`, `totalWrong`
- **Alerts**: `enterName`, `welcome`, `resetConfirm`, etc.
- **Instruments**: `instruments.violin`, `instruments.trumpet`, etc.

## Benefits

✅ **Accessible** - Supports German, Spanish, and English speakers
✅ **Persistent** - Language choice saved between sessions
✅ **Fast** - Instant switching, no page reload
✅ **Expandable** - Easy to add more languages
✅ **Complete** - All UI text is translated, including dynamic content

## Testing

Test the language switching:
```bash
open public/index.html
```

1. Click 🇩🇪 DE - Interface should be in German (default)
2. Click 🇪🇸 ES - Interface switches to Spanish
3. Click 🇬🇧 EN - Interface switches to English
4. Create a user and start a quiz - instrument names should translate
5. Refresh the page - last language choice is remembered

## Notes

- Default language is German (`de`) as requested
- All instrument names are professionally translated
- Alert messages use polite, educational tone
- Translations maintain consistent terminology across the interface

Viel Erfolg! / ¡Buena suerte! / Good luck! 🎻🎺🎵
