// QuizLogic - Handles spaced repetition and quiz flow
class QuizLogic {
    constructor() {
        this.currentRound = [];
        this.currentCardIndex = 0;
        this.currentQuestion = null;
        this.roundStats = {
            correct: 0,
            wrong: 0
        };
    }

    // Generate cards for a round based on spaced repetition rules
    generateRound() {
        const user = userManager.getCurrentUser();
        if (!user) {
            throw new Error('No user selected');
        }

        const cards = [];
        const progress = user.progress;

        INSTRUMENTS.forEach(instrument => {
            const p = progress[instrument.id];

            // Skip mastered instruments (3+ consecutive correct)
            if (p.mastered) {
                return;
            }

            // Cards with wrong answers: show twice per round
            if (p.totalWrong > 0 && p.consecutiveCorrect === 0) {
                cards.push(instrument.id);
                cards.push(instrument.id); // Twice
            }
            // Cards with 1-2 consecutive correct: show once per round
            else if (p.consecutiveCorrect > 0 && p.consecutiveCorrect < 3) {
                cards.push(instrument.id);
            }
            // New instruments (never shown): show once
            else if (p.totalCorrect === 0 && p.totalWrong === 0) {
                cards.push(instrument.id);
            }
        });

        // Shuffle cards
        this.currentRound = shuffleArray(cards);
        this.currentCardIndex = 0;
        this.roundStats = { correct: 0, wrong: 0 };

        // Preload audio for all instruments in this round
        const uniqueInstruments = [...new Set(this.currentRound)];
        audioManager.preload(uniqueInstruments);

        return this.currentRound.length;
    }

    // Get current question with options
    getCurrentQuestion() {
        if (this.currentCardIndex >= this.currentRound.length) {
            return null; // Round complete
        }

        const instrumentId = this.currentRound[this.currentCardIndex];
        const correctInstrument = getInstrument(instrumentId);

        // Get wrong options from same type
        const sameTypeInstruments = getInstrumentsByType(correctInstrument.type);
        const wrongOptions = sameTypeInstruments
            .filter(inst => inst.id !== instrumentId)
            .map(inst => inst.id);

        // Shuffle and pick 2 wrong options
        const shuffledWrong = shuffleArray(wrongOptions);
        const selectedWrong = shuffledWrong.slice(0, 2);

        // Combine and shuffle all options
        const allOptions = shuffleArray([
            instrumentId,
            ...selectedWrong
        ]);

        this.currentQuestion = {
            instrumentId,
            correctAnswer: instrumentId,
            options: allOptions
        };

        return this.currentQuestion;
    }

    // Check answer and record result
    checkAnswer(selectedId) {
        if (!this.currentQuestion) {
            throw new Error('No current question');
        }

        const isCorrect = selectedId === this.currentQuestion.correctAnswer;

        // Record answer
        userManager.recordAnswer(this.currentQuestion.instrumentId, isCorrect);

        // Update round stats
        if (isCorrect) {
            this.roundStats.correct++;
        } else {
            this.roundStats.wrong++;
        }

        return {
            isCorrect,
            correctInstrumentId: this.currentQuestion.correctAnswer
        };
    }

    // Move to next card
    nextCard() {
        this.currentCardIndex++;
    }

    // Check if round is complete
    isRoundComplete() {
        return this.currentCardIndex >= this.currentRound.length;
    }

    // Get round statistics
    getRoundStats() {
        return this.roundStats;
    }

    // Get progress info
    getProgress() {
        return {
            current: this.currentCardIndex + 1,
            total: this.currentRound.length,
            percentage: ((this.currentCardIndex / this.currentRound.length) * 100).toFixed(0)
        };
    }

    // Get newly mastered instruments in this round
    getNewlyMastered() {
        const user = userManager.getCurrentUser();
        if (!user) return [];

        const mastered = [];
        this.currentRound.forEach(instrumentId => {
            const progress = user.progress[instrumentId];
            if (progress.mastered && progress.consecutiveCorrect === 3) {
                // Just mastered (exactly 3, not more)
                if (!mastered.includes(instrumentId)) {
                    mastered.push(instrumentId);
                }
            }
        });

        return mastered;
    }

    // Check if there are any cards to show
    hasCardsToShow() {
        const user = userManager.getCurrentUser();
        if (!user) return false;

        const progress = user.progress;
        let hasCards = false;

        INSTRUMENTS.forEach(instrument => {
            const p = progress[instrument.id];
            if (!p.mastered) {
                hasCards = true;
            }
        });

        return hasCards;
    }
}

// Create global instance
const quizLogic = new QuizLogic();
