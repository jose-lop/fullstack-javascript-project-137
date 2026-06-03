import { proxy } from "valtio/vanilla";

const state = proxy({
  feeds: [],
  posts: [],
  form: {
    error: "",
  },
});

export default state;
