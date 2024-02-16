let currentIndex = 0;
let autoRotateInterval;
let postsData = []; 

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
    navigationContainer.innerHTML = '';

    const prevButton = document.createElement('button');
    prevButton.innerHTML = '&#10094;';
    prevButton.addEventListener('click', () => changePost(-1));

    const nextButton = document.createElement('button');
    nextButton.innerHTML = '&#10095;';
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
    // Bestemmer rotasjonshastigheten basert på enhetstypen
    const mobileRotationDelay = 5000; // 5 sekunder for mobile
    const desktopRotationDelay = 10000; // 10 sekunder for desktop
    const isMobile = window.innerWidth <= 768; 

    // Velger rotasjonshastighet basert på skjermstørrelse
    const currentDelay = isMobile ? mobileRotationDelay : desktopRotationDelay;

    clearInterval(autoRotateInterval); 
    autoRotateInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % postsData.length;
        displayPost(postsData[currentIndex]);
    }, currentDelay);
}




