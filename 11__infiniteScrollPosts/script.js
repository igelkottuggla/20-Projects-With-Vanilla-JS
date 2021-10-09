const postsContainer = document.querySelector('.posts-container');
const loading = document.querySelector('.loader');
const filter = document.querySelector('.filter');

const url = 'https://jsonplaceholder.typicode.com/posts?_limit=';

let limit = 5;
let page = 1;

const highlight = 'rgba(39, 245, 229, 0.47)';

const getPosts = async () => {
    const response = await fetch(`${url}${limit}&_page=${page}`);
    const data = await response.json();

    return data;
};

const showPosts = async () => {
    const posts = await getPosts();

    posts.forEach((post) => {
        const postEl = document.createElement('article');
        postEl.classList.add('post');

        postContent = `
            <div class="number">${post.id}</div>
            <div class="post-info">
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body">
                    ${post.body}
                </p>
            </div>
        `;
        postEl.insertAdjacentHTML('afterbegin', postContent);

        postsContainer.appendChild(postEl);
    });
};

const showLoader = () => {
    loading.classList.add('show');
    setTimeout(() => {
        fetchMorePosts();
        loading.classList.remove('show');
    }, 1500);
};

const fetchMorePosts = () => {
    setTimeout(() => {
        page++;
        showPosts();
    }, 300);
};

const filterPosts = (event) => {
    const term = event.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');

    posts.forEach((post) => {
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        const body = post.querySelector('.post-body').innerText.toUpperCase();

        const titleMatches = title.indexOf(term) > -1;
        const bodyMatches = body.indexOf(term) > -1;

        if (titleMatches || bodyMatches) {
            post.style.display = 'flex';
        } else post.style.display = 'none';
    });
};

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight) {
        showLoader();
    }
});

showPosts();

filter.addEventListener('input', filterPosts);
