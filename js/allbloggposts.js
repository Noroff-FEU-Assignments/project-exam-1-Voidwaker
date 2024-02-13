document.addEventListener('DOMContentLoaded', () => {
    fetchBlogPosts();
});

function fetchBlogPosts() {
    const blogPostsURL = 'https://bollingvaaler.no/wp-json/wp/v2/posts?_embed';
    fetch(blogPostsURL)
        .then(response => response.json())
        .then(posts => {
            // Viser de første 8 innleggene først
            displayPosts(posts.slice(0, 8));

            // Sjekker om det er flere enn 8 innlegg
            if (posts.length > 8) {
                const viewAllButton = document.getElementById('viewAllButton');
                const viewLessButton = document.getElementById('viewLessButton'); 
                
                viewAllButton.style.display = 'block'; 

                // Legger til en event listener for "View More"-knappen
                viewAllButton.addEventListener('click', () => {
                    displayPosts(posts); 
                    viewAllButton.style.display = 'none'; 
                    viewLessButton.style.display = 'block'; 
                });

                // Legger til en event listener for "View Less"-knappen
                viewLessButton.addEventListener('click', () => {
                    displayPosts(posts.slice(0, 8)); 
                    viewLessButton.style.display = 'none'; 
                    viewAllButton.style.display = 'block'; 
                });
            }
        })
        .catch(error => console.error('Error fetching blog posts:', error));
}


function displayPosts(posts) {
    const postsContainer = document.getElementById('blogPostsContainer');
    postsContainer.innerHTML = ''; 

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post'; 

        
        // Du kan sende innleggets ID som en URL-parameter
        const postLink = `<a href="specificblog.html?id=${post.id}">`;

        // Finner URL-en til det fremhevede bildet, eller setter en fallback URL hvis den ikke finnes
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


