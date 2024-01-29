// Importer funksjonene og modulene du trenger
import { initializeCarousel } from "./pages/homePage.js";
import { displayBlogPosts } from './pages/blogPage.js';
import { fetchBlogPosts } from './pages/blogPage.js';
import { fetchWordPressPosts } from './api/getPost.js';

// Definer initHomePage-funksjonen
function initHomePage() {
    // Koden for å initialisere hjemmesiden
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

function displayPosts(posts) {
    const postsContainer = document.getElementById('postsContainer');

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';

        const titleElement = document.createElement('h2');
        // Tittelen er ofte innpakket i et 'rendered' felt under 'title'
        titleElement.textContent = post.title.rendered;

        const excerptElement = document.createElement('div');
        // Utdraget er også ofte innpakket i et 'rendered' felt under 'excerpt'
        excerptElement.innerHTML = post.excerpt.rendered;

        // Legg til titel og utdrag til postElement
        postElement.appendChild(titleElement);
        postElement.appendChild(excerptElement);

        // Til slutt legger vi til postElement til postsContainer
        postsContainer.appendChild(postElement);
    });
}
