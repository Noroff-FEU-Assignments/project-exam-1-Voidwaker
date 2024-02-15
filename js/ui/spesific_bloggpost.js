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
        
                // Aktiverer modal for bilder i innlegget
                activateImageModal();
            }
        });
        
        function activateImageModal() {
            const images = document.querySelectorAll('#postContainer img');
            const modal = document.getElementById('imageModal');
            const modalImg = document.getElementById('modalImg');
            const caption = document.getElementById('caption');
            const closeModal = document.querySelector('.modal .close');
        
            images.forEach(image => {
                image.addEventListener('click', () => {
                    modal.style.display = 'block';
                    modalImg.src = image.src;
                    caption.textContent = image.alt || 'Image preview';
                });
            });
        
            closeModal.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }
        
    }


document.addEventListener('DOMContentLoaded', fetchAndDisplayPost);
