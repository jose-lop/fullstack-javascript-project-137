import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

import * as yup from "yup";

const state = {
  feeds: [],
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
      state.feeds.push(url);

      renderFeeds();

      input.value = "";

      input.classList.remove("is-invalid");
    })
    .catch(() => {
      input.classList.add("is-invalid");
    });
});
