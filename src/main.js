import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import { Quasar } from "quasar";
import PrimeVue from "primevue/config";
import RadioButton from "primevue/radiobutton";
import "primevue/resources/themes/tailwind-light/theme.css";
import "primevue/resources/primevue.min.css";
import quasarUserOptions from "./quasar-user-options";

createApp(App)
  .component("RadioButton", RadioButton)
  .use(PrimeVue)
  .use(Quasar, quasarUserOptions)
  .use(store)
  .mount("#app");
