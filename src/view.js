import { subscribe } from "valtio/vanilla";
import state from "./state.js";

export const renderFeeds = () => {
  const feedsContainer = document.querySelector(".feeds");

  feedsContainer.innerHTML = "";

  state.feeds.forEach((feed) => {
    const li = document.createElement("li");

    li.classList.add("list-group-item");

    li.innerHTML = `
      <h5>${feed.title}</h5>
      <p class="mb-0 text-muted">${feed.description}</p>
    `;

    feedsContainer.append(li);
  });
};

export const renderPosts = () => {
  const postsContainer = document.querySelector(".posts");

  postsContainer.innerHTML = "";

  state.posts.forEach((post) => {
    const li = document.createElement("li");

    li.classList.add("list-group-item");

    const link = document.createElement("a");

    link.href = post.link;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = post.title;

    li.append(link);

    postsContainer.append(li);
  });
};

subscribe(state, () => {
  renderFeeds();
  renderPosts();
});
