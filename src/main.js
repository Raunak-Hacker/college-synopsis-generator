import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router.js";
import BaseSpinner from "./components/BaseSpinner.vue";

const app = createApp(App);
app.use(router);
app.component("BaseSpinner", BaseSpinner);

app.mount("#app");
