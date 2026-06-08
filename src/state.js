import { proxy } from "valtio/vanilla";

const state = proxy({
  feeds: [],
  posts: [],
  readPosts: [],
  modal: {
    postId: null,
  },
  form: {
    error: "",
  },
});

export default state;
