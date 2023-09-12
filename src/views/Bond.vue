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
            <el-table-column label="Operation" width="200">
              <el-button type="success" size="mini">提取奖励</el-button>
            </el-table-column>
          </el-table>
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
    return {
      nftInfo: [
        { name: "FISH", claimble: this.claimble, pending: this.pending },
      ],
    };
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
.title {
  text-align: center;
}
.view-bond {
  margin: 0 auto;
  margin-top: 30px;
  width: 1000px;
  height: auto;
  padding: 30px;
  border: solid;
  border-color: gainsboro;
  border-radius: 10px;
}
</style>
