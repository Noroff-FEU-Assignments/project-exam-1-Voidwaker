let currentIndex = 0;
let autoRotateInterval;
let postsData = []; 
const rotationDelay = 10000; // 10 sekunder for automatisk rotasjon

document.addEventListener('DOMContentLoaded', () => {
    fetchBlogPosts();
});

function fetchBlogPosts() {
    const blogPostsURL = 'https://bollingvaaler.no/wp-json/wp/v2/posts';
    fetch(blogPostsURL)
        .then(response => response.json())
        .then(posts => {
            if (posts.length > 0) {
                displayPost(posts[currentIndex]);
                setupNavigationButtons(posts);
                startAutoRotate(posts);
            }
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

function setupNavigationButtons(posts) {
    const navigationContainer = document.getElementById('navigationContainer'); // Sørg for at dette elementet finnes i HTML
    navigationContainer.innerHTML = ''; // Tømmer tidligere navigasjonsknapper hvis de eksisterer

    const prevButton = document.createElement('button');
    prevButton.innerHTML = '&#10094;'; // Venstre pil
    prevButton.addEventListener('click', () => {
        changePost(-1, posts);
    });

    const nextButton = document.createElement('button');
    nextButton.innerHTML = '&#10095;'; // Høyre pil
    nextButton.addEventListener('click', () => {
        changePost(1, posts);
    });

    navigationContainer.appendChild(prevButton);
    navigationContainer.appendChild(nextButton);
}

function changePost(direction, posts) {
    clearInterval(autoRotateInterval); 
    currentIndex = (currentIndex + direction + posts.length) % posts.length;
    displayPost(posts[currentIndex]);
    startAutoRotate(posts); 
}

function startAutoRotate(posts) {
    autoRotateInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % posts.length;
        displayPost(posts[currentIndex]);
    }, rotationDelay);
}


