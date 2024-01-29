export function fetchWordPressPosts() {
    console.log('fetchWordPressPosts starter'); // For debugging
    const endpoint = "https://bollingvaaler.no/wp-json/wp/v2/posts?_embed";

    fetch(endpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(posts => {
            console.log('Innlegg hentet:', posts); // For debugging
            displayPosts(posts);
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

        // Trekker ut første bilde fra innleggets innhold
        const parser = new DOMParser();
        const contentDocument = parser.parseFromString(post.content.rendered, "text/html");
        const imgElement = contentDocument.querySelector('img');
        if (imgElement && imgElement.src) {
            postElement.appendChild(imgElement);
        }

        const titleElement = document.createElement('h2');
        titleElement.textContent = post.title.rendered;
        postElement.appendChild(titleElement);

        const excerptElement = document.createElement('div');
        excerptElement.innerHTML = post.excerpt.rendered;
        postElement.appendChild(excerptElement);

        postsContainer.appendChild(postElement);
    });
}


document.addEventListener('DOMContentLoaded', fetchWordPressPosts);



