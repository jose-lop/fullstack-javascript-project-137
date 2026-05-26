import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

document.querySelector("#app").innerHTML = `
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-lg-8">

        <h1 class="display-4 mb-4">RSS agregador</h1>

        <p class="lead mb-4">
          Empieza a leer RSS hoy mismo.
          Es fácil, bonito y gratuito.
        </p>

        <form class="rss-form">
          <div class="input-group mb-3">

            <input
              type="text"
              class="form-control"
              placeholder="https://example.com/feed.xml"
            >

            <button class="btn btn-primary" type="submit">
              Añadir
            </button>

          </div>
        </form>

      </div>
    </div>
  </div>
`;
