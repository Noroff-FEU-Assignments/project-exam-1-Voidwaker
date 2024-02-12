let currentIndex = 0;
let autoRotateInterval;
const rotationDelay = 10000; // 10 sekunder

document.addEventListener('DOMContentLoaded', () => {
    fetchBlogPosts();
    setupNavigationButtons();
});

function fetchBlogPosts() {
    const blogPostsURL = 'https://bollingvaaler.no/wp-json/wp/v2/posts';
    fetch(blogPostsURL)
        .then(response => response.json())
        .then(posts => {
            displayPost(posts[currentIndex]);
            startAutoRotate(posts);
        })
        .catch(error => console.error('Error fetching blog posts:', error));
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

function setupNavigationButtons() {
    const navigationContainer = document.getElementById('navigationContainer');
    navigationContainer.innerHTML = ''; // Tømmer eksisterende innhold

    const prevButton = document.createElement('button');
    prevButton.innerHTML = '&#10094;'; // HTML-entitet for venstre pil
    prevButton.onclick = () => changePost(-1);

    const nextButton = document.createElement('button');
    nextButton.innerHTML = '&#10095;'; // HTML-entitet for høyre pil
    nextButton.onclick = () => changePost(1);

    navigationContainer.appendChild(prevButton);
    navigationContainer.appendChild(nextButton);
}


function changePost(direction, posts) {
    clearInterval(autoRotateInterval); // Stopper automatisk rotasjon
    currentIndex = (currentIndex + direction + posts.length) % posts.length;
    displayPost(posts[currentIndex]); // Oppdaterer direkte basert på ny currentIndex
    startAutoRotate(posts); // Gjenstarter den automatiske rotasjonen
}


function startAutoRotate(posts) {
    autoRotateInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % posts.length;
        displayPost(posts[currentIndex]); // Passer det aktuelle post-objektet basert på currentIndex
    }, rotationDelay);
}


