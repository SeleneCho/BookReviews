import { createApp } from "vue";
import "./style.css";
import router from "../src/router/index";
import App from "./App.vue";
import { projectAuth } from "./firebase/config";

let app;

projectAuth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App).use(router).mount("#app");
  }
});
