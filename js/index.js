import { initHomePage } from '.js/pages/homePage.js';






document.addEventListener('DOMContentLoaded', () => {
    if (document.body.classList.contains('home-page')) {
        initHomePage();
    } else if (document.body.classList.contains('contact-page')) {
        // Kall funksjon for kontaktsiden
    }
    // Fortsett for andre sider...
});