// 主題管理器
class ThemeManager {
    constructor() {
        this.darkModeToggle = document.getElementById('darkModeToggle');
        this.init();
    }

    init() {
        this.initTheme();
        this.setupEventListeners();
    }

    initTheme() {
        const savedTheme = localStorage.getItem('darkMode');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        const shouldBeDark = savedTheme === 'true' || (savedTheme === null && prefersDark.matches);
        
        document.documentElement.setAttribute('data-bs-theme', shouldBeDark ? 'dark' : 'light');
        if (this.darkModeToggle) {
            this.darkModeToggle.querySelector('i').className = shouldBeDark ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    setupEventListeners() {
        if (this.darkModeToggle) {
            this.darkModeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // 監聽系統主題變更
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (localStorage.getItem('darkMode') === null) {
                document.documentElement.setAttribute('data-bs-theme', e.matches ? 'dark' : 'light');
                if (this.darkModeToggle) {
                    this.darkModeToggle.querySelector('i').className = e.matches ? 'fas fa-sun' : 'fas fa-moon';
                }
            }
        });
    }

    toggleTheme() {
        const isDark = document.documentElement.getAttribute('data-bs-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        document.documentElement.setAttribute('data-bs-theme', newTheme);
        if (this.darkModeToggle) {
            this.darkModeToggle.querySelector('i').className = isDark ? 'fas fa-moon' : 'fas fa-sun';
        }
        localStorage.setItem('darkMode', !isDark);
    }
}
