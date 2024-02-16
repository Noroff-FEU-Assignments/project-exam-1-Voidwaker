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
    const blogPostsURL = 'https://bollingvaaler.no/wp-json/wp/v2/posts?_embed&per_page=12';
    fetch(blogPostsURL)
        .then(response => response.json())
        .then(posts => {
            // Viser de første 8 innleggene først
            displayPosts(posts.slice(0, 10));

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
    
        const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'fallback_image_url_here.jpg';
        postElement.innerHTML = `
            <div>
                <h2>${post.title.rendered}</h2>
                <img src="${imageUrl}" alt="${post.title.rendered}" 
                     class="clickable-image" 
                     data-id="${post.id}" // Setter postens ID som en data attributt
                     data-title="${post.title.rendered}" 
                     data-excerpt="${post.excerpt.rendered}">
                <p>${post.excerpt.rendered}</p>
            </div>
        `;
        postsContainer.appendChild(postElement);
    });
    

    // Legger til event listeners på alle klikkbare bilder etter at de er lagt til DOM
    document.querySelectorAll('.clickable-image').forEach(image => {
        image.addEventListener('click', function(event) {
            event.preventDefault(); 
            const modal = document.getElementById('imageModal');
            const modalImg = document.getElementById('modalImage');
            const caption = document.getElementById('caption');
            modal.style.display = "block";
            modalImg.src = this.src;
    
            // Henter post-ID fra bilde-data attributter
            const postId = this.getAttribute('data-id');
    
            // Oppdaterer caption for å inkludere en "Les Mer"-knapp med en lenke til den spesifikke bloggpost-siden
            caption.innerHTML = `
                <h2>${this.dataset.title}</h2>
                <p>${this.dataset.excerpt}</p>
                <a href="specificblog.html?id=${postId}" class="read-more-btn">Les Mer</a>
            `;
        });
    });
}


// Modal logikk
const modal = document.getElementById('imageModal');
const closeModal = document.getElementById('closeModal');

// Lukker modalen når brukeren klikker på (X)
closeModal.onclick = function() {
    modal.style.display = "none";
}

// Lukker modalen når brukeren klikker hvor som helst utenfor bildet
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}



