// AudioManager - Handles lazy loading and playback of audio files
class AudioManager {
    constructor() {
        this.cache = {};
        this.currentlyPlaying = null;
    }

    // Preload audio files for a set of instruments
    preload(instrumentIds) {
        instrumentIds.forEach(id => {
            const instrument = getInstrument(id);
            if (instrument && !this.cache[id]) {
                const audio = new Audio(instrument.audioPath);
                audio.preload = 'auto';
                audio.load();
                this.cache[id] = audio;
            }
        });
    }

    // Play instrument sound
    async play(instrumentId) {
        // Stop any currently playing audio
        this.stop();

        const instrument = getInstrument(instrumentId);
        if (!instrument) {
            console.error(`Instrument not found: ${instrumentId}`);
            return;
        }

        // Load on demand if not preloaded
        if (!this.cache[instrumentId]) {
            this.cache[instrumentId] = new Audio(instrument.audioPath);
        }

        const audio = this.cache[instrumentId];
        this.currentlyPlaying = audio;

        try {
            // Reset audio to beginning
            audio.currentTime = 0;
            await audio.play();
        } catch (error) {
            console.error('Error playing audio:', error);
        }
    }

    // Stop currently playing audio
    stop() {
        if (this.currentlyPlaying) {
            this.currentlyPlaying.pause();
            this.currentlyPlaying.currentTime = 0;
            this.currentlyPlaying = null;
        }
    }

    // Check if audio is currently playing
    isPlaying() {
        return this.currentlyPlaying && !this.currentlyPlaying.paused;
    }

    // Clear cache (useful for memory management)
    clearCache() {
        this.stop();
        this.cache = {};
    }
}

// Create global instance
const audioManager = new AudioManager();
