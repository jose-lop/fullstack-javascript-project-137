import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

import axios from "axios";
import * as yup from "yup";

const state = {
  feeds: [],
  posts: [],
};

document.querySelector("#app").innerHTML = `
  <div class="container-fluid">
    <div class="row justify-content-center min-vh-100 bg-light">
      <div class="col-12 col-md-10 col-lg-8 py-5">

        <div class="card shadow-sm border-0 mb-5">
          <div class="card-body p-5">

            <h1 class="display-3 mb-3">RSS agregador</h1>

            <p class="lead text-muted mb-4">
              Empieza a leer RSS hoy mismo.
              Es fácil, bonito y gratuito.
            </p>

            <form id="rss-form">
              <div class="row g-2">

                <div class="col-md-9">

                  <input
                    id="url-input"
                    type="text"
                    class="form-control form-control-lg"
                    placeholder="https://example.com/feed.xml"
                    required
                  >

                  <div class="invalid-feedback">
                    URL inválida
                  </div>

                </div>

                <div class="col-md-3">

                  <button
                    type="submit"
                    class="btn btn-primary btn-lg w-100"
                  >
                    Añadir
                  </button>

                </div>

              </div>
            </form>

          </div>
        </div>

        <div class="row">

          <div class="col-lg-6 mb-4">
            <div class="card border-0 shadow-sm h-100">

              <div class="card-body">

                <h2 class="h4 mb-4">Feeds</h2>

                <ul class="list-group border-0 feeds">
                </ul>

              </div>

            </div>
          </div>

          <div class="col-lg-6 mb-4">
            <div class="card border-0 shadow-sm h-100">

              <div class="card-body">

                <h2 class="h4 mb-4">Posts</h2>

                <ul class="list-group border-0 posts">
                </ul>

              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  </div>
`;

const form = document.querySelector("#rss-form");

const input = document.querySelector("#url-input");

const schema = yup.string().url().required();

const parseRSS = (data) => {
  const parser = new DOMParser();

  const doc = parser.parseFromString(data, "application/xml");

  console.log(doc);

  console.log(doc.querySelector("channel title"));
  console.log(doc.querySelector("channel description"));

  const items = doc.querySelectorAll("item");

  console.log(items);

  const posts = Array.from(items).map((item) => {
    console.log(item);

    const postTitleElement = item.querySelector("title");
    const linkElement = item.querySelector("link");

    console.log(postTitleElement);
    console.log(linkElement);

    const postTitle = postTitleElement?.textContent ?? "";
    const link = linkElement?.textContent ?? "";

    return { title: postTitle, link };
  });

  state.posts = posts;

  renderPosts();
};

const renderPosts = () => {
  console.log("Renderizando posts:", state.posts);

  const postsContainer = document.querySelector(".posts");

  postsContainer.innerHTML = "";

  state.posts.forEach((post) => {
    const li = document.createElement("li");

    li.classList.add("list-group-item");

    const a = document.createElement("a");

    a.href = post.link;
    a.target = "_blank";
    a.textContent = post.title;

    li.append(a);

    postsContainer.append(li);
  });
};

const renderFeeds = () => {
  const feedsContainer = document.querySelector(".feeds");

  feedsContainer.innerHTML = "";

  state.feeds.forEach((feed) => {
    const li = document.createElement("li");

    li.classList.add("list-group-item");

    li.textContent = feed;

    feedsContainer.append(li);
  });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const url = input.value;

  schema
    .validate(url)
    .then(() => {
      input.classList.remove("is-invalid");

      const proxy = "https://allorigins.hexlet.app/get?disableCache=true&url=";

      const fullUrl = `${proxy}${encodeURIComponent(url)}`;

      return axios.get(fullUrl);
    })
    .then((response) => {
      parseRSS(response.data.contents);

      state.feeds.push(url);

      renderFeeds();

      input.value = "";
    })
    .catch((error) => {
      console.log(error);

      input.classList.add("is-invalid");
    });
});
