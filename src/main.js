import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Argon from "./plugins/argon-kit";
import './registerServiceWorker'
import ApiService from "./core/services/api.service";
import store from "./core/services/store/store";
import GoogleAuth from 'vue-google-authenticator'
import vuetimeline from "@growthbunker/vuetimeline"
import VueMeta from 'vue-meta'
import VueMask from 'v-mask'
import VueGtag from 'vue-gtag'
import VueCodeHighlight from 'vue-code-highlight';
Vue.use(VueCodeHighlight)
Vue.use(VueGtag, {
  config: { id: 'G-7NCN3ZZBC9' }
})
Vue.use(VueMask);
Vue.use(VueMeta)
Vue.use(vuetimeline, {
  theme: "dark",
})

Vue.use(GoogleAuth, { client_id: '161887511829-opcp0kr2s2bu6fljdg3360o21ogutifm.apps.googleusercontent.com' })
Vue.googleAuth().load()
ApiService.init();
Vue.config.productionTip = false;
Vue.use(Argon);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
