let currentIndex = 0;
let autoRotateInterval;
let postsData = []; // Holder på innleggsdataene
const rotationDelay = 10000; // 10 sekunder for automatisk rotasjon

document.addEventListener('DOMContentLoaded', () => {
    fetchBlogPosts();
});

function showLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = 'block';
    }
}

function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = 'none';
    }
}


function fetchBlogPosts() {
    showLoader();
    const blogPostsURL = 'https://bollingvaaler.no/wp-json/wp/v2/posts';
    fetch(blogPostsURL)
        .then(response => response.json())
        .then(posts => {
            postsData = posts; // Lagrer innleggene globalt
            if (posts.length > 0) {
                displayPost(posts[currentIndex]);
                setupNavigationButtons();
                startAutoRotate();
            }
            hideLoader();
        })
        .catch(error => {
            console.error('Error fetching blog posts:', error);
            hideLoader();
        });
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
    navigationContainer.innerHTML = ''; // Tømmer tidligere navigasjonsknapper

    const prevButton = document.createElement('button');
    prevButton.innerHTML = '&#10094;'; // Venstre pil
    prevButton.addEventListener('click', () => changePost(-1));

    const nextButton = document.createElement('button');
    nextButton.innerHTML = '&#10095;'; // Høyre pil
    nextButton.addEventListener('click', () => changePost(1));

    navigationContainer.appendChild(prevButton);
    navigationContainer.appendChild(nextButton);
}

function changePost(direction) {
    clearInterval(autoRotateInterval);
    currentIndex = (currentIndex + direction + postsData.length) % postsData.length;
    displayPost(postsData[currentIndex]);
    startAutoRotate();
}

function startAutoRotate() {
    autoRotateInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % postsData.length;
        displayPost(postsData[currentIndex]);
    }, rotationDelay);
}



