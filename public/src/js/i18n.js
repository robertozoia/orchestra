// Internationalization Manager
class I18nManager {
    constructor() {
        this.currentLanguage = localStorage.getItem('appLanguage') || 'de';
        this.init();
    }

    init() {
        // Set initial language
        this.setLanguage(this.currentLanguage, false);

        // Bind language buttons
        document.getElementById('langDe')?.addEventListener('click', () => this.setLanguage('de'));
        document.getElementById('langEs')?.addEventListener('click', () => this.setLanguage('es'));
        document.getElementById('langEn')?.addEventListener('click', () => this.setLanguage('en'));
    }

    setLanguage(lang, save = true) {
        this.currentLanguage = lang;

        if (save) {
            localStorage.setItem('appLanguage', lang);
        }

        // Update HTML lang attribute
        document.documentElement.lang = lang;

        // Update active button styling
        this.updateLanguageButtons();

        // Translate all elements
        this.translatePage();
    }

    updateLanguageButtons() {
        const buttons = {
            de: document.getElementById('langDe'),
            es: document.getElementById('langEs'),
            en: document.getElementById('langEn')
        };

        // Reset all buttons
        Object.values(buttons).forEach(btn => {
            if (btn) {
                btn.className = 'px-4 py-2 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition';
            }
        });

        // Highlight active language
        if (buttons[this.currentLanguage]) {
            buttons[this.currentLanguage].className = 'px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition';
        }
    }

    translatePage() {
        const lang = this.currentLanguage;

        // Translate elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = t(key, lang);

            if (element.tagName === 'TITLE') {
                document.title = translation;
            } else {
                element.textContent = translation;
            }
        });

        // Translate placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            element.placeholder = t(key, lang);
        });

        // Update dynamic content that was already rendered
        this.updateDynamicContent();
    }

    updateDynamicContent() {
        // Update "Card X of Y" text in quiz
        const currentCard = document.getElementById('currentCard');
        const totalCards = document.getElementById('totalCards');
        const cardHeader = currentCard?.parentElement;

        if (cardHeader && currentCard && totalCards) {
            // Store the numbers
            const current = currentCard.textContent;
            const total = totalCards.textContent;

            // Rebuild with translation
            cardHeader.innerHTML = `${t('cardOf', this.currentLanguage)} <span id="currentCard">${current}</span> ${t('of', this.currentLanguage)} <span id="totalCards">${total}</span>`;
        }
    }

    // Get translated instrument name
    getInstrumentName(instrumentId) {
        return getInstrumentName(instrumentId, this.currentLanguage);
    }

    // Get translation
    t(key) {
        return t(key, this.currentLanguage);
    }

    // Get current language
    getCurrentLanguage() {
        return this.currentLanguage;
    }
}

// Create global instance (will be initialized after DOM loads)
let i18n;
