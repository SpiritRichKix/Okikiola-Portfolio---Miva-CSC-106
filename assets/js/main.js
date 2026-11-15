document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.querySelector('.menu-toggle');
    const navigation = document.querySelector('.site-nav');
    const themeButton = document.querySelector('.theme-toggle');

    if (menuButton && navigation) {
        menuButton.addEventListener('click', () => {
            const isOpen = navigation.classList.toggle('open');
            menuButton.setAttribute('aria-expanded', String(isOpen));
            menuButton.setAttribute(
                'aria-label',
                isOpen ? 'Close navigation' : 'Open navigation'
            );
        });
    }

    const savedTheme = localStorage.getItem('portfolio-theme');

    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    if (themeButton) {
        themeButton.addEventListener('click', () => {
            const isDark =
                document.documentElement.getAttribute('data-theme') === 'dark';

            if (isDark) {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('portfolio-theme', 'light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('portfolio-theme', 'dark');
            }
        });
    }

    document.querySelectorAll('[data-year]').forEach((element) => {
        element.textContent = new Date().getFullYear();
    });
});