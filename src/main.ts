import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import "@fortawesome/fontawesome-free/css/all.min.css";

// import "github-markdown-css/github-markdown.css";
// import "github-markdown-css/github-markdown-dark.css";
// import "github-markdown-css/github-markdown-light.css";

const app = createApp(App);
app.use(router);
app.mount("#app");
