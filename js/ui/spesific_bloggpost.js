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
                postContainer.innerHTML = `
                    <h1>${post.title.rendered}</h1>
                    <div>${post.content.rendered}</div>
                `;
                
                document.title = post.title.rendered;
            } else {
                console.error('Post container not found');
            }
        })
        .catch(error => console.error('Error fetching specific post:', error));
}



document.addEventListener('DOMContentLoaded', fetchAndDisplayPost);
