import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router.js";
import store from './store.js';
import BaseSpinner from "./components/BaseSpinner.vue";

const app = createApp(App);
app.use(router);
app.use(store);
app.component("base-spinner", BaseSpinner);

app.mount("#app");
