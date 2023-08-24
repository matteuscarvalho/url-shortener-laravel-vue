import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router";

import Vue3Toasity, { type ToastContainerOptions } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { toast } from 'vue3-toastify';

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import {
  faUserSecret,
  faPlus,
  faChartBar,
  faCopy,
  faEdit,
  faTrash,
  faLink,
} from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(faUserSecret, faPlus, faChartBar, faCopy, faEdit, faTrash, faLink);

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);

app.use(createPinia().use(piniaPluginPersistedstate));
app.use(router);
app.use(Vue3Toasity, {
  autoClose: 3000,
  position: toast.POSITION.BOTTOM_RIGHT
} as ToastContainerOptions);

app.mount("#app");
