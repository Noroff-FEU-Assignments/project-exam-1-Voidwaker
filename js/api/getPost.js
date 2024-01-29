export function fetchWordPressPosts() {
    const endpoint = "https://bollingvaaler.no/wp-json/wp/v2/posts?_embed";

    fetch(endpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(posts => {
            displayPosts(posts); // Kaller displayPosts for å vise innleggene
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

function displayPosts(posts) {
    const postsContainer = document.getElementById('postsContainer');

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';

        // Legg til bilde hvis tilgjengelig
        if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0].source_url) {
            const imgElement = document.createElement('img');
            imgElement.src = post._embedded['wp:featuredmedia'][0].source_url;
            postElement.appendChild(imgElement);
        }

        const titleElement = document.createElement('h2');
        titleElement.textContent = post.title.rendered;

        const excerptElement = document.createElement('div');
        excerptElement.innerHTML = post.excerpt.rendered;

        postElement.appendChild(titleElement);
        postElement.appendChild(excerptElement);

        postsContainer.appendChild(postElement);
    });
}


// Kaller fetchWordPressPosts funksjonen når siden lastes
document.addEventListener('DOMContentLoaded', fetchWordPressPosts);

