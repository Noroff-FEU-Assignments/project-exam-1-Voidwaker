// Global variabel for å holde styr på gjeldende indeks
let currentIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    fetchBlogPosts();
});

function fetchBlogPosts() {
    const blogPostsURL = 'https://bollingvaaler.no/wp-json/wp/v2/posts';
    fetch(blogPostsURL)
        .then(response => response.json())
        .then(posts => {
            initializeCarousel(posts);
        })
        .catch(error => console.error('Error fetching blog posts:', error));
}

function initializeCarousel(posts) {
    displayPost(posts[currentIndex]);
    updateNavigationButtons(posts);
}

function displayPost(post) {
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.innerHTML = `
        <a href="specificblog.html?id=${post.id}" class="post-link">
            <h2>${post.title.rendered}</h2>
            <img src="${post.jetpack_featured_media_url}" alt="${post.title.rendered}">
        </a>
    `;
}

function updateNavigationButtons(posts) {
    const postsContainer = document.getElementById('postsContainer');
    document.getElementById('prevButton')?.remove();
    document.getElementById('nextButton')?.remove();

    const prevButton = document.createElement('button');
    prevButton.id = 'prevButton';
    prevButton.textContent = 'Previous';
    prevButton.onclick = () => {
        currentIndex = (currentIndex - 1 + posts.length) % posts.length;
        initializeCarousel(posts);
    };

    const nextButton = document.createElement('button');
    nextButton.id = 'nextButton';
    nextButton.textContent = 'Next';
    nextButton.onclick = () => {
        currentIndex = (currentIndex + 1) % posts.length;
        initializeCarousel(posts);
    };

    postsContainer.appendChild(prevButton);
    postsContainer.appendChild(nextButton);
}

function displayPosts(posts, currentIndex) {
    // Siden vi nå viser ett innlegg om gangen, har vi endret til displayPost
    // og denne funksjonen er ikke lenger nødvendig
}


