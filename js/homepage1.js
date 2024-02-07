// Vent til DOM-innholdet er lastet
document.addEventListener('DOMContentLoaded', () => {
    // Kall funksjonen for å hente og vise blogginnlegg
    fetchBlogPosts();
});

// Funksjon for å hente og vise blogginnlegg
function fetchBlogPosts() {
    // URL for å hente blogginnlegg fra API-et
    const blogPostsURL = 'https://bollingvaaler.no/wp-json/wp/v2/posts?_embed';

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

    // Opprett navigasjonsknapper for karusellen og send med postsContainer
    createNavigationButtons(postsContainer);

    // Initialiser index for nåværende visning
    let currentIndex = 0;

    // Vis den første gruppen med blogginnlegg
    displayPosts(groupedPosts[currentIndex]);

    // Funksjon for å vise blogginnlegg i karusellen
    function displayPosts(posts) {
        // Tøm kontaineren før du legger til nye innlegg
        postsContainer.innerHTML = '';

        // Gå gjennom hvert blogginnlegg i gruppen og legg til i kontaineren
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            // Sjekk om det er et fremhevet bilde tilgjengelig for innlegget
            const featuredMedia = post._embedded && post._embedded['wp:featuredmedia'] ? post._embedded['wp:featuredmedia'][0] : null;
            // Legg til innholdet i blogginnlegget (tittel og bilde)
            postElement.innerHTML = `
                <h2>${post.title.rendered}</h2>
                ${featuredMedia ? `<img src="${featuredMedia.source_url}" alt="${featuredMedia.alt_text}">` : ''}
            `;
            postsContainer.appendChild(postElement);
        });
    }
}

// Funksjon for å opprette navigasjonsknapper
function createNavigationButtons(container) {
    const prevButton = document.createElement('button');
    prevButton.id = 'prevButton';
    prevButton.textContent = 'Previous';

    const nextButton = document.createElement('button');
    nextButton.id = 'nextButton';
    nextButton.textContent = 'Next';

    container.appendChild(prevButton);
    container.appendChild(nextButton);
}





