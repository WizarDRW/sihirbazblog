// action types
export const SET_OPTION = "setOption";
export const RESET_OPTION = "resetLayoutConfig";

// mutation types

export default {
  state: {
      option: localStorage.getItem("option")
  },
  getters: {
      getOption(state){
          return state.option;
      }
  },
  actions: {

  },
  mutations: {
  }
};
