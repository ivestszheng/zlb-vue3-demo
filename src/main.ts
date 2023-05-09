import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";

const pinia = createPinia();

pinia.use(
  createPersistedState({
    serializer: {
      serialize: JSON.stringify,
      deserialize: JSON.parse,
    },
  })
);

createApp(App).use(router).use(pinia).mount("#app");
