export default {
  state: {
    networks: [
      {
        chainId: "0xa869",
        name: "FUJI",
        code: 43114,
      },
      {
        chainId: "0x1",
        name: "ETH",
        code: 1,
      },
      {
        chainId: "0x38",
        name: "BSC",
        code: 56,
      },
      {
        chainId: "0x61",
        name: "BSC Test",
        code: 97,
      },
    ],
  },
  mutations: {
    setActiveNetwork(state, payload) {
      state.activeNetwork = payload;
    },
  },
  getters: {
    getActiveNetwork: (state) => state.activeNetwork,
    getActiveChain: (state) =>
      //整个表达式的结果就是返回对象，find遍历state.networks数组
      state.networks.find((item) => item.chainId === state.activeNetwork),
    getAvailableNetworks: (state) => state.networks,
  },
};
