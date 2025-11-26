// Instrument database
const INSTRUMENTS = [
    // Strings
    {
        id: 'violin',
        name: 'Violin',
        type: 'strings',
        audioPath: 'sounds/strings/violin.mp3',
        emoji: '🎻'
    },
    {
        id: 'viola',
        name: 'Viola',
        type: 'strings',
        audioPath: 'sounds/strings/viola.mp3',
        emoji: '🎻'
    },
    {
        id: 'cello',
        name: 'Cello',
        type: 'strings',
        audioPath: 'sounds/strings/cello.mp3',
        emoji: '🎻'
    },
    {
        id: 'double-bass',
        name: 'Double Bass',
        type: 'strings',
        audioPath: 'sounds/strings/double-bass.mp3',
        emoji: '🎻'
    },

    // Brass
    {
        id: 'trumpet',
        name: 'Trumpet',
        type: 'brass',
        audioPath: 'sounds/brass/trumpet.mp3',
        emoji: '🎺'
    },
    {
        id: 'trombone',
        name: 'Trombone',
        type: 'brass',
        audioPath: 'sounds/brass/trombone.mp3',
        emoji: '🎺'
    },
    {
        id: 'french-horn',
        name: 'French Horn',
        type: 'brass',
        audioPath: 'sounds/brass/french-horn.mp3',
        emoji: '📯'
    },
    {
        id: 'tuba',
        name: 'Tuba',
        type: 'brass',
        audioPath: 'sounds/brass/tuba.mp3',
        emoji: '🎺'
    },

    // Woodwinds
    {
        id: 'flute',
        name: 'Flute',
        type: 'woodwinds',
        audioPath: 'sounds/woodwinds/flute.mp3',
        emoji: '🪈'
    },
    {
        id: 'clarinet',
        name: 'Clarinet',
        type: 'woodwinds',
        audioPath: 'sounds/woodwinds/clarinet.mp3',
        emoji: '🎵'
    },
    {
        id: 'oboe',
        name: 'Oboe',
        type: 'woodwinds',
        audioPath: 'sounds/woodwinds/oboe.mp3',
        emoji: '🎵'
    },
    {
        id: 'bassoon',
        name: 'Bassoon',
        type: 'woodwinds',
        audioPath: 'sounds/woodwinds/bassoon.mp3',
        emoji: '🎵'
    },

    // Percussion
    {
        id: 'timpani',
        name: 'Timpani',
        type: 'percussion',
        audioPath: 'sounds/percussion/timpani.mp3',
        emoji: '🥁'
    },
    {
        id: 'snare-drum',
        name: 'Snare Drum',
        type: 'percussion',
        audioPath: 'sounds/percussion/snare-drum.mp3',
        emoji: '🥁'
    },
    {
        id: 'xylophone',
        name: 'Xylophone',
        type: 'percussion',
        audioPath: 'sounds/percussion/xylophone.mp3',
        emoji: '🎹'
    },
    {
        id: 'cymbals',
        name: 'Cymbals',
        type: 'percussion',
        audioPath: 'sounds/percussion/cymbals.mp3',
        emoji: '🔔'
    }
];

// Helper function to get instrument by ID
function getInstrument(id) {
    return INSTRUMENTS.find(inst => inst.id === id);
}

// Helper function to get instruments by type
function getInstrumentsByType(type) {
    return INSTRUMENTS.filter(inst => inst.type === type);
}

// Helper function to shuffle array
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}
