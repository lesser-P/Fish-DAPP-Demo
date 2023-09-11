export default {
  state: {
    provider: null,
    signer: null,
    account: null,
    chainId: null,
    isMetaMaskActive: false,
    isWallectConnect: false,
  },
  mutations: {
    setProvider(state, payload) {
      state.provider = payload;
    },
    setSigner(state, payload) {
      state.signer = payload;
    },
    setAccount(state, payload) {
      state.account = payload;
    },
    setChainId(state, payload) {
      state.chainId = payload;
      console.log("setchain:" + state.chainId);
    },
    setMetaMaskActive(state, payload) {
      state.isMetaMaskActive = payload;
    },
    setWallectConnect(state, payload) {
      state.isWallectConnect = payload;
    },
  },
  getters: {
    getProvider: (state) => state.provider,
    getSigner: (state) => state.signer,
    getAccount: (state) => state.account,
    getChainId: (state) => state.chainId,
    getMetaMaskActive: (state) => state.isMetaMaskActive,
    getWallectIsConnected: (state) => state.isWallectConnect,
  },
  //action可以通过commit触发mutations
  actions: {
    async fetchAccount({ commit }, provider) {
      //查询用户已经拥有的账户
      const accounts = await provider.request({ method: "eth_accounts" });
      if (accounts.length === 0) {
        //metamask is lock or not connected any accounts
        console.log("请链接MetaMask");
        return false;
      } else {
        //记录第一个账号
        commit("setAccount", accounts[0]);
        return accounts[0];
      }
    },
    async fetchChainId({ commit }, provider) {
      //向eth发起chainid请求
      const chainId = await provider.request({ method: "eth_chainId" });
      console.log("chainid:", chainId);
      if (chainId) {
        commit("setChainId", chainId);
        return chainId;
      }
      return false;
    },
    async connectAccount({ commit, dispatch }, provider) {
      try {
        //请求用户允许你的Dapp访问他们的账户
        const accounts = await provider.request({
          method: "eth_requestAccounts",
        });
        if (accounts.length === 0) {
          console.log("请连接Metamask");
          return false;
        }
        //dispatch用于出发一个或者多个action
        const chainId = await dispatch("fetchChainId", provider);
        commit("setAccount", accounts[0]);
        commit("setWallectConnect", true);
      } catch (err) {
        if (err.code === 4001) {
          console.log("请连接MetaMask");
        } else {
          console.log(err);
        }
      }
    },
  },
};
