import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import Countdown from "vue3-flip-countdown";

const app = createApp(App);
app.use(ElementPlus);
app.use(Countdown);
app.mount("#app");
