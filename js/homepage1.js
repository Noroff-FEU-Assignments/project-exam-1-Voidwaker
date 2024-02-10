// Vent til DOM-innholdet er lastet
document.addEventListener('DOMContentLoaded', () => {
    // Kall funksjonen for å hente og vise blogginnlegg
    fetchBlogPosts();
});

let currentIndex = 0; // Flytt currentIndex utenfor funksjonene for global tilgang

// Funksjon for å hente og vise blogginnlegg
function fetchBlogPosts() {
    // URL for å hente blogginnlegg fra API-et
    const blogPostsURL = 'https://bollingvaaler.no/wp-json/wp/v2/posts';

    // Hent blogginnlegg fra API-et
    fetch(blogPostsURL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(posts => {
            // Når blogginnleggene er hentet, kall funksjonen for å vise karusellen
            initializeCarousel(posts);
        })
        .catch(error => {
            console.error('Error fetching blog posts:', error);
        });
}

// Funksjon for å initialisere karusellen med blogginnlegg
function initializeCarousel(posts) {
    // Vis det første blogginnlegget
    displayPosts(posts, currentIndex);

    // Opprett navigasjonsknapper for karusellen
    createNavigationButtons(posts);
}

// Funksjon for å vise ett blogginnlegg i karusellen
function displayPosts(posts, currentIndex) {
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.innerHTML = ''; // Tøm kontaineren før du legger til nye innlegg

    const post = posts[currentIndex]; // Henter ut det aktuelle innlegget
    const postElement = document.createElement('div');
    postElement.classList.add('post');

    postElement.innerHTML = `
        <a href="specificblog.html?id=${post.id}" class="post-link">
            <h2>${post.title.rendered}</h2>
            <img src="${post.jetpack_featured_media_url}" alt="${post.title.rendered}">
        </a>
    `;
    postsContainer.appendChild(postElement); // Legger til postElement til postsContainer
}

// Funksjon for å opprette navigasjonsknapper
function createNavigationButtons(posts) {
    const postsContainer = document.getElementById('postsContainer');

    const prevButton = document.createElement('button');
    prevButton.textContent = 'Previous';
    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + posts.length) % posts.length;
        displayPosts(posts, currentIndex);
    });

    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % posts.length;
        displayPosts(posts, currentIndex);
    });

    postsContainer.appendChild(prevButton); // Legger navigasjonsknappene til postsContainer
    postsContainer.appendChild(nextButton);
}


