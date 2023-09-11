<template>
  <div class="metamask-checker"></div>
</template>

<script>
import detectEthereumProvider from "@metamask/detect-provider";
export default {
  data() {
    return {
      checkInProgress: true,
      networksData: [
        {
          chainId: "0xa869",
          chainName: "FUJI",
          rpcUrls: [
            "https://avalanche-fuji.infura.io/v3/200c1554096d4b7aa08be1cba45e9e19",
          ],
          iconUrls: [
            "https://s2.coinmarketcap.com/static/img/coins/200x200/1839.png",
          ],
          blockExplorerUrls: ["https://testnet.snowtrace.io"],
          nativeCurrency: {
            name: "Test-AVAX",
            symbol: "Test-AVAX",
            decimals: 18,
          },
        },
        {
          chainId: "0x38",
          chainName: "Binance Smart Chain Mainnet",
          rpcUrls: ["https://bsc-dataseed1.binance.org/"],
          iconUrls: [
            "https://s2.coinmarketcap.com/static/img/coins/200x200/1839.png",
          ],
          blockExplorerUrls: ["https://bscscan.com/"],
          nativeCurrency: {
            name: "BNB",
            symbol: "BNB",
            decimals: 18,
          },
        },
        {
          chainId: "0x61",
          chainName: "Binance Smart Chain Test",
          rpcUrls: ["https://data-seed-prebsc-2-s2.binance.org:8545/"],
          iconUrls: [
            "https://s2.coinmarketcap.com/static/img/coins/200x200/1839.png",
          ],
          blockExplorerUrls: ["https://testnet.bscscan.com/"],
          nativeCurrency: {
            name: "tBNB",
            symbol: "tBNB",
            decimals: 18,
          },
        },
      ],
    };
  },
  computed: {
    availableNetworks() {
      //在networks中的所有网络
      return this.$store.getters.getAvailableNetworks;
    },
    walletIsConnected() {
      return this.$store.getters.getWallectIsConnected;
    },
    chainId() {
      return this.$store.getters.getChainId;
    },
  },
  watch: {
    walletIsConnected(value) {
      if (value && !this.checkInProgress) {
      }
    },
  },
  methods: {
    //获得网络提供者
    async checkProvider() {
      const provider = await detectEthereumProvider();
      if (!provider) {
        this.$store.commit("setPopupState", {
          type: "browser",
          isShow: true,
        });
        this.$emit("checkError", "请安装MetaMask");
        return false;
      }
      if (provider !== window.ethereum) {
        this.$emit("checkError", "你安装了多个钱包？");
        return false;
      }
      //创建以太坊提供者,web3provider是为了方便使用web3js的应用迁移到ether中
      const userProvider = new this.$ethers.providers.Web3Provider(
        window.ethereum
      );

      const userSigner = userProvider.getSigner();
      this.$store.commit("setMetaMaskActive", true);
      this.$store.commit("setProvider", userProvider);
      this.$store.commit("setSigner", userSigner);

      await this.checkConnection();
    },
    //确认连接
    async checkConnection() {
      //传入当前的以太环境
      const address = await this.$store.dispatch(
        "fetchAccount",
        window.ethereum
      );
      if (!address) {
        this.$emit("checkError", "地址异常");
        this.checkInProgress = false;
        return false;
      }

      this.$store.commit("setWallectConnect", true);
      const chainId = await this.$store.dispatch(
        "fetchChainId",
        window.ethereum
      );
      this.compareNetworkSupport(chainId);
      this.setAccountListeners();
      this.checkInProgress = true;
      this.$emit("checkSuccess");
    },
    async compareNetworkSupport(chainId) {
      const networkObject = this.availableNetworks.find(
        (network) => network.chainId === chainId
      );
      if (networkObject) this.$store.commit("setActiveNetwork", chainId);
    },
    setAccountListeners() {
      window.ethereum.on("chainChanged", this.onChainIdChange);
      window.ethereum.on("accountsChanged", this.onAccountChange);
    },
    //metamask is change
    onAccountChange(accounts) {
      if (accounts.length === 0) {
        this.disconnectHandler();
      } else {
        this.$store.commit("setAccount", accounts[0]);
        window.location.reload;
      }
    },
    onChainIdChange() {
      window.location.reload();
    },
    //断开连接
    disconnectHandler() {
      this.$store.commit("closePopups");
      this.$store.commit("setAccount", null);
      this.$store.commit("setWalletConnection", false);
      this.$store.commit("setChainId", null);
      this.$store.commit("setActiveNetwork", "0xa869");
      this.$store.commit("setFarmPools", []);
      this.$store.commit("setPools", []);
      this.$store.commit("setSwapObject", null);

      const routeName = this.$route.name;
      if (routeName !== "Home") this.$router.push({ name: "Home" });
      this.$emit("checkError", "请再次断开处理程序");
    },
  },
  created() {
    this.checkProvider();
  },
};
</script>
