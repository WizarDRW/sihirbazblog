import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth.module";
import config from "./config.module";
import blog from "./blog.module";
import option from "./option.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    config,
    blog,
    option
  }
});
