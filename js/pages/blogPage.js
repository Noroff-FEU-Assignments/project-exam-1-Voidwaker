export async function fetchBlogPosts() {
    try {
        const response = await fetch("https://www.bollingvaaler.no/wp-json/wp/v2/posts/");
        if (!response.ok) {
            throw new Error("Henting av blogginnlegg mislyktes.");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Feil ved henting av blogginnlegg:", error);
        return []; // Returner en tom liste i tilfelle feil
    }
}



// Funksjon for å vise blogginnlegg på siden
export function displayBlogPosts(blogPosts) {
    const blogPostsContainer = document.getElementById("blogPostsContainer");

    blogPosts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.classList.add("blog-post");

        const titleElement = document.createElement("h2");
        titleElement.textContent = post.title;

        const contentElement = document.createElement("p");
        contentElement.textContent = post.content;

        postElement.appendChild(titleElement);
        postElement.appendChild(contentElement);

        blogPostsContainer.appendChild(postElement);
    });
}

// Kall fetchBlogPosts() for å hente og vise blogginnlegg når siden lastes
document.addEventListener("DOMContentLoaded", () => {
    fetchBlogPosts();
});
