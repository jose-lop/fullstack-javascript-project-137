import i18next from "i18next";
import resources from "./locales.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

import axios from "axios";
import * as yup from "yup";

import state from "./state.js";
import parseRSS from "./parser.js";
import "./view.js";

i18next.init({
  lng: "es",
  resources,
});

yup.setLocale({
  mixed: {
    required: "required",
  },
  string: {
    url: "invalidUrl",
  },
});

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

            <form id="rss-form" novalidate>
              <div class="row g-2">

                <div class="col-md-9">
                    <label for="url-input" class="form-label">
                       RSS link
                    </label>
                  <input
                    id="url-input"
                    type="text"
                    class="form-control form-control-lg"
                    placeholder="https://example.com/feed.xml"
                  >

                  <div class="invalid-feedback">
                  </div>
                  <div class="feedback mt-2"></div>
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
const feedback = document.querySelector(".feedback");

const schema = yup.string().url().required();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const url = input.value.trim();

  schema
    .validate(url)
    .then(() => {
      const exists = state.feeds.some((feed) => feed.url === url);

      if (exists) {
        throw new Error("duplicate");
      }

      const proxy = "https://allorigins.hexlet.app/get?disableCache=true&url=";

      return axios.get(`${proxy}${encodeURIComponent(url)}`);
    })
    .then((response) => {
      const feedData = parseRSS(response.data.contents);

      const feed = {
        id: crypto.randomUUID(),
        url,
        title: feedData.title,
        description: feedData.description,
      };

      const posts = feedData.posts.map((post) => ({
        id: crypto.randomUUID(),
        ...post,
      }));

      state.feeds.push(feed);
      state.posts.push(...posts);

      input.value = "";
      input.focus();

      input.classList.remove("is-invalid");

      feedback.classList.remove("text-danger");
      feedback.classList.add("text-success");
      feedback.textContent = i18next.t("success.loaded");
    })
    .catch((error) => {
      console.log(error);

      input.classList.add("is-invalid");

      feedback.classList.remove("text-success");
      feedback.classList.add("text-danger");

      if (error.message === "duplicate") {
        feedback.textContent = i18next.t("errors.duplicate");
      } else if (error.isAxiosError) {
        feedback.textContent = i18next.t("errors.network");
      } else {
        feedback.textContent = i18next.t(`errors.${error.message}`);
      }
    });
});

const updateFeeds = () => {
  const requests = state.feeds.map((feed) => {
    const proxy = "https://allorigins.hexlet.app/get?disableCache=true&url=";

    return axios
      .get(`${proxy}${encodeURIComponent(feed.url)}`)
      .then((response) => {
        const parsedFeed = parseRSS(response.data.contents);

        const newPosts = parsedFeed.posts
          .filter(
            (post) =>
              !state.posts.some(
                (existingPost) => existingPost.link === post.link,
              ),
          )
          .map((post) => ({
            id: crypto.randomUUID(),
            ...post,
          }));

        state.posts.unshift(...newPosts);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  Promise.all(requests).finally(() => {
    setTimeout(updateFeeds, 5000);
  });
};

updateFeeds();
