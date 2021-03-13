// action types
export const SET_ID_CONFIG = "setIDConfig";

// mutation types

export default {
  state: {
    id: 0,
  },
  getters: {
    /**
     * Get config from layout config
     * @param state
     * @returns {function(path, defaultValue): *}
     */
    getId(state) {
        
        return state.id != 0 ? state.id:sessionStorage.getItem("_blogId");
      }
  },
  actions: {
    /**
     * Set and replace the whole config
     * @param state
     * @param payload
     */
    [SET_ID_CONFIG](state, payload) {
    console.log(payload);
      state.commit(SET_ID_CONFIG, payload);
    },
  },
  mutations: {
    [SET_ID_CONFIG](state, payload) {
      state.id = payload;
      sessionStorage.setItem("_blogId", payload);
    },
  }
};
