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

    li.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-start",
    );

    const link = document.createElement("a");

    link.href = post.link;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = post.title;

    const isRead = state.readPosts.includes(post.id);

    link.classList.add(isRead ? "fw-normal" : "fw-bold");

    const button = document.createElement("button");

    button.type = "button";
    button.classList.add("btn", "btn-outline-primary", "btn-sm");

    button.textContent = "Vista previa";

    button.dataset.id = post.id;
    link.dataset.id = post.id;

    button.setAttribute("data-bs-toggle", "modal");
    button.setAttribute("data-bs-target", "#modal");

    li.append(link);
    li.append(button);

    postsContainer.append(li);
  });
};

const renderModal = () => {
  const post = state.posts.find((item) => item.id === state.modal.postId);

  if (!post) {
    return;
  }

  const modalTitle = document.querySelector(".modal-title");
  const modalBody = document.querySelector(".modal-body p");
  const fullArticle = document.querySelector(".full-article");

  modalTitle.textContent = post.title;
  modalBody.textContent = post.description;
  fullArticle.href = post.link;
};

subscribe(state, () => {
  renderFeeds();
  renderPosts();
  renderModal();
});
