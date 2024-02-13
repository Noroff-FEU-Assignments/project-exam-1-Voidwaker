document.addEventListener('DOMContentLoaded', () => {
    fetchBlogPosts();
});

function showLoader() {
    document.getElementById('loader').style.display = 'block';
}

function hideLoader() {
    document.getElementById('loader').style.display = 'none';
}

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function fetchBlogPosts() {
    showLoader(); 
    const blogPostsURL = 'https://bollingvaaler.no/wp-json/wp/v2/posts?_embed';
    fetch(blogPostsURL)
        .then(response => response.json())
        .then(posts => {
            // Viser de første 8 innleggene først
            displayPosts(posts.slice(0, 8));

            // Sjekker om det er flere enn 8 innlegg
            const viewAllButton = document.getElementById('viewAllButton');
            const viewLessButton = document.getElementById('viewLessButton');
            if (posts.length > 8) {
                viewAllButton.style.display = 'block'; 

                viewAllButton.addEventListener('click', () => {
                    displayPosts(posts); 
                    viewAllButton.style.display = 'none'; 
                    viewLessButton.style.display = 'block'; 
                });

                viewLessButton.addEventListener('click', () => {
                    displayPosts(posts.slice(0, 8)); 
                    viewLessButton.style.display = 'none'; 
                    viewAllButton.style.display = 'block'; 
                });
            }
            hideLoader(); 
        })
        .catch(error => {
            console.error('Error fetching blog posts:', error);
            hideLoader(); 
        });
}

function displayPosts(posts) {
    const postsContainer = document.getElementById('blogPostsContainer');
    postsContainer.innerHTML = ''; 

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post'; 

        const postLink = `<a href="specificblog.html?id=${post.id}">`;
        const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'fallback_image_url_here.jpg';
        
        postElement.innerHTML = `
            ${postLink}
                <h2>${post.title.rendered}</h2>
                <img src="${imageUrl}" alt="Featured Image">
                <p>${post.excerpt.rendered}</p>
            </a>
        `;
        postsContainer.appendChild(postElement);
    });
}



