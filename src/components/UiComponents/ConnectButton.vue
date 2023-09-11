<template>
  <el-button
    plain
    type="warning"
    class="btn-connect"
    :class="{ load: connectLoader }"
    @click="walletBtnHandler()"
  >
    {{ walletBtnText }}
  </el-button>
</template>
<script>
export default {
  data() {
    return {
      connectLoader: false,
      btnText: "Connect wallet",
    };
  },
  computed: {
    walletBtnText() {
      let account = this.$store.getters.getAccount;
      //显示账号前六位和后六位
      if (account) {
        let startAddr = account.slice(0, 6);
        let endAddr = account.slice(-6);
        return `${startAddr}...${endAddr}`;
      } else {
        return "Connect wallet";
      }
    },
    isWalletConnected() {
      return this.$store.getters.getWalletIsConnected;
    },
  },
  methods: {
    async walletBtnHandler() {
      if (this.isWalletConnected) {
        return false;
      }

      if (!window.ethereum) {
        return false;
      }

      if (typeof window.ethereum == "undefined") {
        alert("请安装Metamask");
      }
      this.connectLoader = true;
      try {
        //在store中连接账户进行缓存
        await this.$store.dispatch("connectAccount", window.ethereum);
      } catch (err) {
        err.data ? alert(err.data.message) : alert(err.message);
      }
      this.connectLoader = false;
    },
  },
};
</script>
<style>
.btn-connect {
  margin: 8px;
  width: 200px;
  height: 48px;
}
</style>
