// Theme toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Check for saved theme or prefer-color-scheme
function getPreferredTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Set theme
function setTheme(theme) {
    body.classList.remove('light-theme', 'dark-theme');
    body.classList.add(`${theme}-theme`);
    localStorage.setItem('theme', theme);
}

// Initialize theme
function initTheme() {
    const preferredTheme = getPreferredTheme();
    setTheme(preferredTheme);
}

// Toggle theme
function toggleTheme() {
    const currentTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// Event listeners
themeToggle.addEventListener('click', toggleTheme);

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
    }
});

// Initialize on load
initTheme();