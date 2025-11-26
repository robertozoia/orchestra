// UserManager - Handles user data and progress tracking with LocalStorage
class UserManager {
    constructor() {
        this.currentUser = null;
        this.STORAGE_KEY = 'orchestraTrainer_users';
    }

    // Get all users from localStorage
    getAllUsers() {
        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? JSON.parse(data) : {};
    }

    // Save all users to localStorage
    saveAllUsers(users) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
    }

    // Create a new user
    createUser(username) {
        if (!username || username.trim() === '') {
            throw new Error('Username cannot be empty');
        }

        const users = this.getAllUsers();
        const userId = username.toLowerCase().replace(/\s+/g, '_');

        if (users[userId]) {
            throw new Error('User already exists');
        }

        // Initialize user with progress tracking for each instrument
        const newUser = {
            id: userId,
            name: username,
            createdAt: Date.now(),
            progress: {}
        };

        // Initialize progress for all instruments
        INSTRUMENTS.forEach(instrument => {
            newUser.progress[instrument.id] = {
                consecutiveCorrect: 0,
                totalCorrect: 0,
                totalWrong: 0,
                lastShown: null,
                mastered: false
            };
        });

        users[userId] = newUser;
        this.saveAllUsers(users);
        return newUser;
    }

    // Select a user
    selectUser(userId) {
        const users = this.getAllUsers();
        const user = users[userId];

        if (!user) {
            throw new Error('User not found');
        }

        this.currentUser = user;
        return user;
    }

    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }

    // Record answer for an instrument
    recordAnswer(instrumentId, isCorrect) {
        if (!this.currentUser) {
            throw new Error('No user selected');
        }

        const progress = this.currentUser.progress[instrumentId];

        if (isCorrect) {
            progress.consecutiveCorrect++;
            progress.totalCorrect++;

            // Mark as mastered if 3 consecutive correct answers
            if (progress.consecutiveCorrect >= 3) {
                progress.mastered = true;
            }
        } else {
            progress.consecutiveCorrect = 0; // Reset consecutive count
            progress.totalWrong++;
            progress.mastered = false; // Remove mastered status
        }

        progress.lastShown = Date.now();

        // Save to localStorage
        const users = this.getAllUsers();
        users[this.currentUser.id] = this.currentUser;
        this.saveAllUsers(users);
    }

    // Get user statistics
    getUserStats() {
        if (!this.currentUser) {
            return null;
        }

        const progress = this.currentUser.progress;
        let mastered = 0;
        let learning = 0;
        let totalCorrect = 0;
        let totalWrong = 0;

        Object.values(progress).forEach(p => {
            if (p.mastered) {
                mastered++;
            } else {
                learning++;
            }
            totalCorrect += p.totalCorrect;
            totalWrong += p.totalWrong;
        });

        return {
            mastered,
            learning,
            totalCorrect,
            totalWrong
        };
    }

    // Reset user progress
    resetProgress() {
        if (!this.currentUser) {
            throw new Error('No user selected');
        }

        // Reset all instrument progress
        INSTRUMENTS.forEach(instrument => {
            this.currentUser.progress[instrument.id] = {
                consecutiveCorrect: 0,
                totalCorrect: 0,
                totalWrong: 0,
                lastShown: null,
                mastered: false
            };
        });

        // Save to localStorage
        const users = this.getAllUsers();
        users[this.currentUser.id] = this.currentUser;
        this.saveAllUsers(users);
    }

    // Get list of user names
    getUserList() {
        const users = this.getAllUsers();
        return Object.values(users).map(u => ({
            id: u.id,
            name: u.name
        }));
    }
}

// Create global instance
const userManager = new UserManager();
