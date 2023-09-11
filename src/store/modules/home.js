export default {
  state: {
    usdcBalance: 0,
    price: 0,
    roi: 0,
    peekSpot: 0,
    createNftApprove: null,
  },
  mutations: {
    setUSDCBalance(state, val) {
      state.usdcBalance = val;
    },
    setPrice(state, val) {
      state.price = val;
    },
    setROI(state, val) {
      state.roi = val;
    },
    setPeekSpot(state, val) {
      state.peekSpot = val;
    },
    setCreateNftApprove(state, val) {
      state.createNftApprove = val;
    },
  },
  getters: {
    getUSDCBalance: (state) => state.usdcBalance,
    getPrice: (state) => state.price,
    getROI: (state) => state.getROI,
    getPeekSpot: (state) => state.peekSpot,
    getCreateNftApprove: (state) => state.createNftApprove,
  },
};
