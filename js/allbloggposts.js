document.addEventListener('DOMContentLoaded', () => {
    fetchBlogPosts();
});

function fetchBlogPosts() {
    // Legger til '_embed' for å inkludere det fremhevede bildet i responsen
    const blogPostsURL = 'https://bollingvaaler.no/wp-json/wp/v2/posts?_embed';
    fetch(blogPostsURL)
        .then(response => response.json())
        .then(posts => {
            displayPosts(posts.slice(0, 10)); // Viser de første 10 innleggene først

            // Vis "View All"-knappen hvis det er flere enn 10 innlegg
            if (posts.length > 10) {
                const viewAllButton = document.getElementById('viewAllButton');
                viewAllButton.style.display = 'block'; // Gjør knappen synlig

                viewAllButton.addEventListener('click', () => {
                    displayPosts(posts); // Viser alle innleggene
                    viewAllButton.style.display = 'none'; // Skjuler knappen
                });
            }
        })
        .catch(error => console.error('Error fetching blog posts:', error));
}

function displayPosts(posts) {
    const postsContainer = document.getElementById('blogPostsContainer');
    postsContainer.innerHTML = ''; // Tømmer containeren før nye innlegg legges til

    posts.forEach(post => {
        const postElement = document.createElement('div');
        // Finner URL-en til det fremhevede bildet, eller setter en fallback URL hvis den ikke finnes
        const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'fallback_image_url_here.jpg';
        
        postElement.innerHTML = `
            <h2>${post.title.rendered}</h2>
            <img src="${imageUrl}" alt="Featured Image" style="width:100%;height:auto;">
            <p>${post.excerpt.rendered}</p>
        `;
        postsContainer.appendChild(postElement);
    });
}

