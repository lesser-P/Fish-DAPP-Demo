<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="stake-view">
    <div class="price-info">
      <h1 class="info-title">质押</h1>
      <div class="info-detail">
        <p>sFish | {{ SFish_USDPrice }} USDC</p>
        <p>兑换 | 1个sFISH = {{ sFish_FishPrice }} 个 FISH</p>
        <p>FISH 余额 | {{ SFISHBalanceOf }} (FISH)</p>
        <p>已质押 sFISH | {{ SFISHBalanceOf }} (sFISH)</p>
      </div>
    </div>
    <div class="stake-unstake">
      <el-tabs
        v-model="activeName"
        class="tab-main"
        type="border-card"
        @tab-click="handleClick"
        :stretch="true"
      >
        <el-tab-pane class="tab-stake" label="质押" name="stake">
          <div class="stake-title">
            <span>FISH Balance</span>
            <span style="float: right">{{ FISHBalanceOf }}</span>
          </div>
          <div class="stake-input">
            <el-input placeholder="请输入质押FISH数量" v-model="fishInput">
              <template slot="prepend">FISH:</template>
            </el-input>
          </div>
          <div class="stake-btn">
            <el-button
              class="use-btn"
              type="warning"
              @click="apporve"
              v-if="!fishIsApporve"
              >授权(Approve)</el-button
            >
            <el-button class="use-btn" type="primary" @click="stake" v-else
              >质押</el-button
            >
          </div>
        </el-tab-pane>
        <el-tab-pane class="tab-unstake" label="赎回" name="unstake"
          ><div class="unstake-title">
            <span>sFISH Balance</span>
            <span style="float: right">{{ SFISHBalanceOf }}</span>
          </div>
          <div class="stake-input">
            <el-input placeholder="请输入质押sFISH数量" v-model="sFishInput">
              <template slot="prepend">sFISH:</template>
            </el-input>
          </div>
          <div class="stake-btn">
            <el-button
              class="use-btn"
              type="warning"
              @click="apporve"
              v-if="!sFishIsApporve"
              >授权(Approve)</el-button
            >
            <el-button class="use-btn" @click="unStake" type="primary" v-else
              >赎回</el-button
            >
          </div></el-tab-pane
        >
      </el-tabs>
    </div>
  </div>
</template>
<script>
import stake from "@/mixins/stake";
export default {
  mixins: [stake],
  methods: {
    handleClick() {},
  },
  data() {
    return {
      activeName: "stake",
    };
  },
};
</script>
<style>
body {
  margin: 0;
  padding: 0;
  text-decoration: none;
}
.stake-btn {
  width: 200px;
  margin: 10px auto;
}
.stake-view {
  width: 1000px;
  height: auto;
  margin: 0 auto;
}
.use-btn {
  width: 200px;
}
.price-info {
  text-align: center;
  width: 700px;
  margin: 20px auto;
}
.info-detail {
  font-size: 20px;
}
.stake-input {
  margin-top: 10px auto;
}
.tab-stake {
  width: 1000px;
  margin: 0, auto;
}
</style>
