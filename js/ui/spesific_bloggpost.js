document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayPost();
});

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function fetchAndDisplayPost() {
    const postId = getQueryParam('id');
    const postUrl = `https://bollingvaaler.no/wp-json/wp/v2/posts/${postId}`;

    fetch(postUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok for fetching post');
            }
            return response.json();
        })
        .then(post => {
            const postContainer = document.getElementById('postContainer');
            if (postContainer) {
                // Anta at du ikke legger til <img> taggen manuelt her hvis den allerede er inkludert i post.content.rendered
                postContainer.innerHTML = `
                    <h1>${post.title.rendered}</h1>
                    <div>${post.content.rendered}</div>
                `;
            } else {
                console.error('Post container not found');
            }
        })
        
}


document.addEventListener('DOMContentLoaded', fetchAndDisplayPost);
