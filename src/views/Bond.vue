eslint-disable vue/multi-word-component-names
<template>
  <div class="view-bond">
    <div class="bind-info">
      <div class="title"><h1>NFTs债券</h1></div>
      <div class="info-context">
        <div class="context-title"></div>
        <div class="context-info">
          <el-table :data="nftInfo" style="width: 100%">
            <el-table-column prop="name" label="Name" width="200">
            </el-table-column>
            <el-table-column prop="claimble" label="Claimble" width="200">
            </el-table-column>
            <el-table-column prop="pending" label="Pending" width="200">
            </el-table-column>
            <el-table-column label="Fully Vested" width="200">
              {{ prettifySeconds(this.releaseTimestamp).day }}days
              {{ prettifySeconds(this.releaseTimestamp).hour }}hours
              {{ prettifySeconds(this.releaseTimestamp).minutes }}min
            </el-table-column>
            <el-table-column label="Operation">
              <el-button
                class="btn-claim"
                type="danger"
                size="mini"
                @click="claim()"
                >提取奖励</el-button
              >
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="bond-card">
      <h4 class="card-title">Your NFTs({{ nftBalance }})</h4>
      <div class="container">
        <div class="row">
          <h1 class="empty" v-if="youNftInfo.length == 0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              class="bi bi-trash3"
              view-box="0 0 16 16"
            >
              <path
                d="M4.98 4a.5.5 0 0 0-.39.188L1.54 8H6a.5.5 0 0 1 .5.5 1.5 1.5 0 1 0 3 0A.5.5 0 0 1 10 8h4.46l-3.05-3.812A.5.5 0 0 0 11.02 4H4.98zm9.954 5H10.45a2.5 2.5 0 0 1-4.9 0H1.066l.32 2.562a.5.5 0 0 0 .497.438h12.234a.5.5 0 0 0 .496-.438L14.933 9zM3.809 3.563A1.5 1.5 0 0 1 4.981 3h6.038a1.5 1.5 0 0 1 1.172.563l3.7 4.625a.5.5 0 0 1 .105.374l-.39 3.124A1.5 1.5 0 0 1 14.117 13H1.883a1.5 1.5 0 0 1-1.489-1.314l-.39-3.124a.5.5 0 0 1 .106-.374l3.7-4.625z"
              />
            </svg>
          </h1>
          <div class="col" v-for="(item, index) in youNftInfo" :key="index">
            <div class="youNftCard">
              <el-card :body-style="{ padding: '0px' }">
                <div class="card-title">
                  <span class="lv lv0" v-if="item.lv == 0"
                    >#{{ youNftId[index] }} {{ getLv(item.lv) }}</span
                  >
                  <span class="lv lv1" v-if="item.lv == 1"
                    >#{{ youNftId[index] }} {{ getLv(item.lv) }}</span
                  >
                  <span class="lv lv2" v-if="item.lv == 2"
                    >#{{ youNftId[index] }} {{ getLv(item.lv) }}</span
                  >
                </div>
                <div style="padding: 14px">
                  <svg
                    class="nftImg"
                    xmlns="http://www.w3.org/2000/svg"
                    width="250"
                    height="300"
                    style="background-color: #dcdcdc"
                    :style="getBGC(item.lv)"
                  >
                    <text
                      x="50%"
                      y="50%"
                      dominant-baseline="middle"
                      text-anchor="middle"
                      font-size="40px"
                      :fill="getColor(item.lv)"
                    >
                      {{ item.fishStr }}
                    </text>
                  </svg>
                  <br />
                  <span class="txt"
                    >奖励：{{
                      (item.remainingReward / 10 ** 18).toFixed(4)
                    }}FISH</span
                  ><br />
                  <span class="txt"
                    >释放时间：{{ getFully(item.lv) }} Days</span
                  >
                  <div class="txt">
                    <el-button
                      @click="burn(youNftId[index])"
                      type="danger"
                      size="mini"
                      class="button"
                      >销毁债券 & 释放奖励</el-button
                    >
                  </div>
                </div>
              </el-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import bonds from "@/mixins/bonds.js";
export default {
  mixins: [bonds],
  data() {
    return {};
  },
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Bound",
  methods: {
    getFully(lv) {
      if (lv == 0) {
        return 14;
      } else if (lv == 1) {
        return 10;
      } else {
        return 5;
      }
    },
    getLv(lv) {
      if (lv == 0) {
        return "FISH (level C)";
      } else if (lv == 1) {
        return "FISH (level B)";
      } else {
        return "FISH (level A)";
      }
    },
    getBGC(lv) {
      if (lv == 0) {
        return { "background-color": "rgb(220,220,220)" };
      } else if (lv == 1) {
        return { "background-color": "rgb(169,169,169)" };
      } else {
        return { "background-color": "rgb(0,0,0)" };
      }
    },
    getColor(lv) {
      if (lv == 0) {
        return "#000";
      } else if (lv == 1) {
        return "#000";
      } else {
        return "#fff";
      }
    },
  },
};
</script>
<style>
body {
  width: 100%;
  margin: 0;
  padding: 0;
}
.col {
  float: left;
  margin: 10 auto;
}
.youNftCard {
  margin: 10px;
  float: left;
}
.txt {
  margin-top: 5px;
  font-size: 10px;
}
.title {
  text-align: center;
}
.card-title {
  text-align: center;
  font-size: 15px;
  margin-top: 10px;
  font-weight: bold;
}
.bind-info {
  margin: 0 auto;
  margin-top: 30px;
  width: 1000px;
  height: auto;
  padding: 30px;
  border: solid;
  border-color: gainsboro;
  border-radius: 10px;
}
.view-bond {
  margin: 0;
  padding: 0;
}
.btn-claim {
  text-align: center;
}
</style>
