<template>
  <div class="dialog-network">
    <img
      src="@/assets/images/close-popup.svg"
      alt=""
      class="close-btn"
      @click="closePopup()"
    />
    <div class="networks-wrap">
      <div
        class="network-btn"
        v-for="network in networksArr"
        :key="network.chainId"
      >
        <NetworkButton
          class="networkButton"
          :networkType="network.chainId"
          @click="switchNetwork(network.chainId)"
        />
      </div>
    </div>
  </div>
</template>
<script>
const NetworkButton = () =>
  import("@/components/UiComponents/NetWorkButton.vue");
export default {
  data() {
    return {
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
        {
          chainId: "0x1",
          chainName: "ETH-Main",
          rpcUrls: [
            "https://mainnet.infura.io/v3/200c1554096d4b7aa08be1cba45e9e19",
          ],
          iconUrls: [
            "https://s2.coinmarketcap.com/static/img/coins/200x200/1839.png",
          ],
          blockExplorerUrls: ["https://etherscan.io/"],
          nativeCurrency: {
            name: "ETH",
            symbol: "ETH",
            decimals: 18,
          },
        },
      ],
    };
  },
  methods: {
    closePopup() {
      this.$emit("close");
    },
    async switchNetwork(chainId) {
      const data = this.networksData.find((item) => item.chainId === chainId);
      let resp = await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [data],
      });
      console.log(resp);
      if (resp === null) {
        this.$store.commit("setActiveNetwork", chainId);
        this.closePopup();
      }
    },
  },
  computed: {
    networksArr() {
      console.log(this.$store.getters.getAvailableNetworks);
      return this.$store.getters.getAvailableNetworks;
    },
    currentNetwork() {
      const activeNetwork = this.$store.getters.getActiveNetworks;
      if (activeNetwork === "0x61") return "Binance Smart Chain Test";
      if (activeNetwork === "0xa869") return "FUji";
      console.log(activeNetwork);
      return "";
    },
  },
  components: {
    NetworkButton,
  },
};
</script>
<style>
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
.dialog-network {
  margin: 100px auto;
  width: 500px;
  height: 270px;
  border-radius: 7px;
  box-shadow: 2px 2px 5px grey;
}
.close-btn {
  margin: 10px;
}
.title {
  height: 5px;
  width: 130px;
  margin: 0 auto;
}
.network-btn {
  padding: 6px;
  width: 130px;
  height: 48px;
  margin: 0 auto;
}
</style>
