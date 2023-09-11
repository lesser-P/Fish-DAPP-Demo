<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <el-header class="el-header">
    <header>
      <el-menu
        :default-active="$route.path"
        class="menu-header"
        mode="horizontal"
        router
      >
        <el-menu-item class="meun-item" index="/home"
          >主页
          <router-link :to="{ name: 'home' }"></router-link>
        </el-menu-item>
        <el-menu-item class="meun-item" index="/bond">
          债券
          <router-link :to="{ name: 'bond' }"></router-link>
        </el-menu-item>
        <el-menu-item class="meun-item" index="/stake"
          >质押
          <router-link :to="{ name: 'stake' }"></router-link>
        </el-menu-item>
        <div class="btn-wrap">
          <NetworkButton
            :networkType="activeNetWork"
            @click="netwowrkClickHandler"
          ></NetworkButton>
          <ConnectButton></ConnectButton>
        </div>
      </el-menu>
    </header>
  </el-header>
</template>
<script>
const NetworkButton = () =>
  import("@/components/UiComponents/NetWorkButton.vue");
const ConnectButton = () =>
  import("@/components/UiComponents/ConnectButton.vue");

export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
    };
  },
  computed: {
    activeNetWork() {
      return this.$store.getters.getActiveNetwork;
    },
  },
  methods: {
    netwowrkClickHandler() {
      this.$store.commit("setPopupState", {
        type: "network",
        isShow: true,
      });
      var network = this.$store.getters.getPopupState;
      console.log(network);
    },
  },
  components: {
    NetworkButton,
    ConnectButton,
  },
};
</script>
<style>
body {
  margin: 0;
  padding: 0;
  width: 100%;
}
.btn-wrap {
  float: right;
  display: flex;
  justify-content: space-between;
}
.el-header {
  width: 80%;
  margin: 0 auto;
}
.menu-header {
  margin: 0 auto;
  padding-left: 80px;
}
.meun-item {
  width: 200px;
  text-align: center;
}
</style>
