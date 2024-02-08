// Vent til DOM-innholdet er lastet
document.addEventListener('DOMContentLoaded', () => {
    // Kall funksjonen for å hente og vise blogginnlegg
    fetchBlogPosts();
});

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
    // Finn kontaineren for blogginnlegg
    const postsContainer = document.getElementById('postsContainer');

    // Antall blogginnlegg per visning
    const postsPerView = 4;

    // Del opp blogginnleggene i grupper på 4
    const groupedPosts = chunkArray(posts, postsPerView);

    // Opprett en karusell med de grupperte blogginnleggene
    createCarousel(groupedPosts);
}

// Funksjon for å dele et array i mindre grupper
function chunkArray(arr, size) {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, index) =>
        arr.slice(index * size, index * size + size)
    );
}

// Funksjon for å opprette karusell med grupperte blogginnlegg
function createCarousel(groupedPosts) {
    // Finn kontaineren for blogginnlegg
    const postsContainer = document.getElementById('postsContainer');

    // Initialiser index for nåværende visning
    let currentIndex = 0;

    // Vis den første gruppen med blogginnlegg
    displayPosts(groupedPosts[currentIndex]);

    // Opprett navigasjonsknapper for karusellen
    createNavigationButtons();

    // Funksjon for å vise blogginnlegg i karusellen
    function displayPosts(posts) {
        // Tøm kontaineren før du legger til nye innlegg
        postsContainer.innerHTML = '';

        // Gå gjennom hvert blogginnlegg i gruppen og legg til i kontaineren
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');

            // Legg til innholdet i blogginnlegget (tittel og bilde) og en ankelenke
            postElement.innerHTML = `
                <a href="specificblog.html?id=${post.id}" class="post-link">
                    <h2>${post.title.rendered}</h2>
                    <img src="${post.jetpack_featured_media_url}" alt="${post.title.rendered}">
                </a>
            `;

            // Legger til postElement til postsContainer
            postsContainer.appendChild(postElement);
        });
    }

    // Funksjon for å opprette navigasjonsknapper
    function createNavigationButtons() {
        const prevButton = document.createElement('button');
        prevButton.id = 'prevButton';
        prevButton.textContent = 'Previous';
        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + groupedPosts.length) % groupedPosts.length;
            displayPosts(groupedPosts[currentIndex]);
        });

        const nextButton = document.createElement('button');
        nextButton.id = 'nextButton';
        nextButton.textContent = 'Next';
        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % groupedPosts.length;
            displayPosts(groupedPosts[currentIndex]);
        });

        // Legger navigasjonsknappene til postsContainer
        postsContainer.appendChild(prevButton);
        postsContainer.appendChild(nextButton);
    }
}

