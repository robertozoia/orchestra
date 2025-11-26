// Main App Logic - UI Controller
class App {
    constructor() {
        this.currentAnswer = null;
        this.init();
    }

    init() {
        this.cacheDOMElements();
        this.bindEvents();

        // Initialize i18n
        i18n = new I18nManager();

        this.loadUserList();
        this.showScreen('user');
    }

    cacheDOMElements() {
        // Screens
        this.userScreen = document.getElementById('userScreen');
        this.quizScreen = document.getElementById('quizScreen');
        this.completeScreen = document.getElementById('completeScreen');

        // User screen elements
        this.userSelect = document.getElementById('userSelect');
        this.newUserName = document.getElementById('newUserName');
        this.createUserBtn = document.getElementById('createUserBtn');
        this.startBtn = document.getElementById('startBtn');
        this.userStats = document.getElementById('userStats');
        this.resetProgressBtn = document.getElementById('resetProgressBtn');

        // Quiz screen elements
        this.currentCard = document.getElementById('currentCard');
        this.totalCards = document.getElementById('totalCards');
        this.progressBar = document.getElementById('progressBar');
        this.playBtn = document.getElementById('playBtn');
        this.optionsContainer = document.getElementById('optionsContainer');
        this.questionCard = document.getElementById('questionCard');
        this.feedbackCard = document.getElementById('feedbackCard');
        this.correctFeedback = document.getElementById('correctFeedback');
        this.wrongFeedback = document.getElementById('wrongFeedback');
        this.correctInstrumentName = document.getElementById('correctInstrumentName');
        this.wrongCorrectName = document.getElementById('wrongCorrectName');
        this.instrumentEmoji = document.getElementById('instrumentEmoji');
        this.replayBtn = document.getElementById('replayBtn');
        this.stopBtn = document.getElementById('stopBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.exitQuizBtn = document.getElementById('exitQuizBtn');

        // Complete screen elements
        this.roundCorrect = document.getElementById('roundCorrect');
        this.roundWrong = document.getElementById('roundWrong');
        this.masteryMessage = document.getElementById('masteryMessage');
        this.newlyMastered = document.getElementById('newlyMastered');
        this.continueBtn = document.getElementById('continueBtn');
        this.backToMenuBtn = document.getElementById('backToMenuBtn');
    }

    bindEvents() {
        // User screen
        this.userSelect.addEventListener('change', () => this.onUserSelect());
        this.createUserBtn.addEventListener('click', () => this.createUser());
        this.newUserName.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.createUser();
        });
        this.startBtn.addEventListener('click', () => this.startQuiz());
        this.resetProgressBtn.addEventListener('click', () => this.resetProgress());

        // Quiz screen
        this.playBtn.addEventListener('click', () => this.playSound());
        this.replayBtn.addEventListener('click', () => this.replaySound());
        this.stopBtn.addEventListener('click', () => this.stopSound());
        this.nextBtn.addEventListener('click', () => this.nextCard());
        this.exitQuizBtn.addEventListener('click', () => this.exitQuiz());

        // Complete screen
        this.continueBtn.addEventListener('click', () => this.startQuiz());
        this.backToMenuBtn.addEventListener('click', () => this.showScreen('user'));
    }

    // User Management
    loadUserList() {
        const users = userManager.getUserList();
        this.userSelect.innerHTML = '<option value="">-- Select User --</option>';
        users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id;
            option.textContent = user.name;
            this.userSelect.appendChild(option);
        });
    }

    onUserSelect() {
        const userId = this.userSelect.value;
        if (userId) {
            userManager.selectUser(userId);
            this.startBtn.disabled = false;
            this.updateUserStats();
        } else {
            this.startBtn.disabled = true;
            this.userStats.classList.add('hidden');
        }
    }

    createUser() {
        const username = this.newUserName.value.trim();
        if (!username) {
            alert(i18n.t('enterName'));
            return;
        }

        try {
            userManager.createUser(username);
            this.loadUserList();
            this.newUserName.value = '';

            // Auto-select the new user
            const userId = username.toLowerCase().replace(/\s+/g, '_');
            this.userSelect.value = userId;
            this.onUserSelect();

            alert(`${i18n.t('welcome')}, ${username}!`);
        } catch (error) {
            alert(i18n.t('userExists'));
        }
    }

    updateUserStats() {
        const stats = userManager.getUserStats();
        if (stats) {
            document.getElementById('masteredCount').textContent = stats.mastered;
            document.getElementById('learningCount').textContent = stats.learning;
            document.getElementById('totalCorrect').textContent = stats.totalCorrect;
            document.getElementById('totalWrong').textContent = stats.totalWrong;
            this.userStats.classList.remove('hidden');
        }
    }

    resetProgress() {
        if (confirm(i18n.t('resetConfirm'))) {
            userManager.resetProgress();
            this.updateUserStats();
            alert(i18n.t('resetSuccess'));
        }
    }

    // Quiz Flow
    startQuiz() {
        if (!quizLogic.hasCardsToShow()) {
            alert(i18n.t('allMastered'));
            return;
        }

        const cardCount = quizLogic.generateRound();
        if (cardCount === 0) {
            alert(i18n.t('noCards'));
            return;
        }

        this.showScreen('quiz');
        this.showNextQuestion();
    }

    showNextQuestion() {
        const question = quizLogic.getCurrentQuestion();
        if (!question) {
            this.showRoundComplete();
            return;
        }

        // Update progress
        const progress = quizLogic.getProgress();
        this.currentCard.textContent = progress.current;
        this.totalCards.textContent = progress.total;
        this.progressBar.style.width = progress.percentage + '%';

        // Show question card, hide feedback
        this.questionCard.classList.remove('hidden');
        this.feedbackCard.classList.add('hidden');

        // Render options
        this.renderOptions(question.options);

        // Store current answer
        this.currentAnswer = question.correctAnswer;
    }

    renderOptions(optionIds) {
        this.optionsContainer.innerHTML = '';

        optionIds.forEach(id => {
            const instrument = getInstrument(id);
            const button = document.createElement('button');
            button.className = 'w-full py-4 px-6 bg-white border-2 border-gray-300 rounded-lg text-lg font-semibold hover:bg-purple-50 hover:border-purple-400 transition text-left';
            button.textContent = i18n.getInstrumentName(id);
            button.addEventListener('click', () => this.selectAnswer(id));
            this.optionsContainer.appendChild(button);
        });
    }

    playSound() {
        const question = quizLogic.currentQuestion;
        if (question) {
            audioManager.play(question.instrumentId);
        }
    }

    selectAnswer(selectedId) {
        const result = quizLogic.checkAnswer(selectedId);
        this.showFeedback(result.isCorrect, result.correctInstrumentId);
    }

    showFeedback(isCorrect, correctInstrumentId) {
        const correctInstrument = getInstrument(correctInstrumentId);

        // Hide question, show feedback
        this.questionCard.classList.add('hidden');
        this.feedbackCard.classList.remove('hidden');

        // Update instrument display with image or emoji
        this.updateInstrumentDisplay(correctInstrument);

        if (isCorrect) {
            this.correctFeedback.classList.remove('hidden');
            this.wrongFeedback.classList.add('hidden');
            this.correctInstrumentName.textContent = i18n.getInstrumentName(correctInstrumentId);
        } else {
            this.correctFeedback.classList.add('hidden');
            this.wrongFeedback.classList.remove('hidden');
            this.wrongCorrectName.textContent = i18n.getInstrumentName(correctInstrumentId);
            this.stopBtn.classList.add('hidden');
        }
    }

    updateInstrumentDisplay(instrument) {
        const container = document.getElementById('instrumentImage');

        // Try to use image if available, otherwise use emoji
        const imagePath = `images/${instrument.type}/${instrument.id}.jpg`;
        const imagePathPng = `images/${instrument.type}/${instrument.id}.png`;
        const imagePathSvg = `images/${instrument.type}/${instrument.id}.svg`;

        // Create img element and try loading
        const img = new Image();
        img.onload = () => {
            // Image loaded successfully
            container.innerHTML = `
                <img src="${img.src}"
                     alt="${instrument.name}"
                     class="w-64 h-64 object-contain rounded-lg shadow-lg bg-white"
                     style="max-height: 300px; max-width: 300px;" />
            `;
        };
        img.onerror = () => {
            // Image failed, try PNG
            const imgPng = new Image();
            imgPng.onload = () => {
                container.innerHTML = `
                    <img src="${imgPng.src}"
                         alt="${instrument.name}"
                         class="w-64 h-64 object-contain rounded-lg shadow-lg bg-white"
                         style="max-height: 300px; max-width: 300px;" />
                `;
            };
            imgPng.onerror = () => {
                // PNG also failed, try SVG
                const imgSvg = new Image();
                imgSvg.onload = () => {
                    container.innerHTML = `
                        <img src="${imgSvg.src}"
                             alt="${instrument.name}"
                             class="w-64 h-64 object-contain rounded-lg shadow-lg bg-white"
                             style="max-height: 300px; max-width: 300px;" />
                    `;
                };
                imgSvg.onerror = () => {
                    // All images failed, fall back to emoji
                    container.innerHTML = `
                        <div class="w-64 h-64 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center shadow-lg">
                            <span class="text-8xl">${instrument.emoji}</span>
                        </div>
                    `;
                };
                imgSvg.src = imagePathSvg;
            };
            imgPng.src = imagePathPng;
        };
        img.src = imagePath;
    }

    replaySound() {
        const question = quizLogic.currentQuestion;
        if (question) {
            audioManager.play(question.correctAnswer);
            this.stopBtn.classList.remove('hidden');
        }
    }

    stopSound() {
        audioManager.stop();
        this.stopBtn.classList.add('hidden');
    }

    nextCard() {
        audioManager.stop();
        quizLogic.nextCard();

        if (quizLogic.isRoundComplete()) {
            this.showRoundComplete();
        } else {
            this.showNextQuestion();
        }
    }

    exitQuiz() {
        if (confirm(i18n.t('exitConfirm'))) {
            audioManager.stop();
            this.showScreen('user');
            this.updateUserStats();
        }
    }

    showRoundComplete() {
        const stats = quizLogic.getRoundStats();
        const newlyMastered = quizLogic.getNewlyMastered();

        this.roundCorrect.textContent = stats.correct;
        this.roundWrong.textContent = stats.wrong;

        if (newlyMastered.length > 0) {
            const names = newlyMastered.map(id => i18n.getInstrumentName(id)).join(', ');
            this.newlyMastered.textContent = names;
            this.masteryMessage.classList.remove('hidden');
        } else {
            this.masteryMessage.classList.add('hidden');
        }

        this.showScreen('complete');
        this.updateUserStats();
    }

    // Screen Management
    showScreen(screen) {
        this.userScreen.classList.add('hidden');
        this.quizScreen.classList.add('hidden');
        this.completeScreen.classList.add('hidden');

        switch (screen) {
            case 'user':
                this.userScreen.classList.remove('hidden');
                break;
            case 'quiz':
                this.quizScreen.classList.remove('hidden');
                break;
            case 'complete':
                this.completeScreen.classList.remove('hidden');
                break;
        }
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
