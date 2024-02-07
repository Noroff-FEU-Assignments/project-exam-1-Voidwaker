// Importer funksjonene og modulene du trenger
import { initializeCarousel } from "./pages/homePage.js";
import { displayBlogPosts } from './pages/blogPage.js';
import { fetchBlogPosts } from './pages/blogPage.js';
import { fetchWordPressPosts } from './api/getPost.js';
import { displayPosts } from './api/getPost.js';
// Definer initHomePage-funksjonen
function initHomePage() {
    fetchWordPressPosts().then(posts => {
        // Her kan du kalle displayPosts eller en annen funksjon for å vise postene
        displayPosts(posts); // Anta at displayPosts er en funksjon som tar inn posts og viser dem i DOM
    }).catch(error => {
        console.error('Failed to fetch or display posts:', error);
    });
    
}

// Legg til eventlyttere for DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.body.classList.contains('home-page')) {
        initHomePage();
    } else if (document.body.classList.contains('contact-page')) {
        // Kall funksjon for kontaktsiden hvis nødvendig
    }
    // Fortsett for andre sider...
});

