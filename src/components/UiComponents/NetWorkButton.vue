<template>
  <el-button class="btn-network" type="info" plain @click="clickHandler()">
    <div class="btn-content">
      <img class="img" :src="activeNetWork.icon" alt="" />
      {{ activeNetWork.title }}
    </div>
  </el-button>
</template>
<script>
import avaxIcon from "@/assets/images/networks/avax-icon.png";
import ethIcon from "@/assets/images/networks/ethereum-icon.svg";
import binanceIcon from "@/assets/images/networks/binance-icon.svg";

export default {
  //让组件接受外部传过来的数据
  props: {
    networkType: {
      type: String,
      default: "0xa869",
    },
  },
  data() {
    return {
      networks: [
        {
          chainid: "0xa869",
          title: "FUJI",
          icon: avaxIcon,
        },
        {
          chainid: "0xa86a",
          title: "Avax",
          icon: avaxIcon,
        },
        {
          chainid: "0x1",
          title: "ETH-Main",
          icon: ethIcon,
        },
        {
          chainid: "0x38",
          title: "BSC",
          icon: binanceIcon,
        },
      ],
    };
  },
  computed: {
    activeNetWork() {
      return this.networks.find((item) => item.chainid == this.networkType);
    },
  },
  methods: {
    clickHandler() {
      this.$emit("click");
    },
  },
};
</script>
<style>
.btn-content {
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn-network {
  margin-top: 8px;
  width: 130px;
  height: 48px;
}
.img {
  width: 23px;
  height: auto;
  margin-right: 5px;
}
</style>
