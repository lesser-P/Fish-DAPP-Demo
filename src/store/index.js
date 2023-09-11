import Vue from "vue";
import Vuex from "vuex";
import popups from "@/store/modules/popups";
import home from "@/store/modules/home";
import networks from "@/store/modules/networks";
import metamaskProvider from "@/store/modules/metamaskProvider";

Vue.use(Vuex);

//创建并暴露vuex
export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    popups,
    home,
    metamaskProvider,
    networks,
  },
});
