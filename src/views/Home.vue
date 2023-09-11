<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="home-view">
    <div class="main">
      <svg
        class="bigBanner"
        xmlns="http://www.w3.org/2000/svg"
        width="500"
        height="300"
        style="font-style: no"
      >
        <text
          x="50%"
          y="50%"
          dominant-baseline="middle"
          text-anchor="middle"
          font-size="100px"
          fill="#fff"
        >
          🐠
        </text>
      </svg>
    </div>
    <div class="btn-create">
      <el-button class="create-btn" type="warning" @click="changeVisible" plain
        >创建NFT</el-button
      >
    </div>
    <el-dialog
      title="创建NFT"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <div class="dig-content">
        <el-row>
          <el-col :span="12"
            ><div class="dig-left">
              <svg
                class="nftImg"
                xmlns="http://www.w3.org/2000/svg"
                width="200"
                height="200"
              >
                <text
                  x="50%"
                  y="50%"
                  dominant-baseline="middle"
                  text-anchor="middle"
                  font-size="35px"
                  fill="#000"
                >
                  {{ "<°)????≤" }}
                </text>
              </svg>
            </div></el-col
          >
          <el-col :span="12"
            ><div class="dig-right">
              <template>
                <el-input-number
                  v-model="amt"
                  @change="handleChange"
                  s
                  :min="1"
                  :max="20"
                  :disabled="!createNftApprove"
                  label="购买NFT的数量"
                ></el-input-number>
              </template>
              <el-row class="text-row">
                <el-col :span="17"
                  ><div class="txt-start">余额(Balance)：</div>
                </el-col>
                <el-col :span="7"
                  ><div class="txt-end">
                    {{ this.usdcBalance }} USDC
                  </div></el-col
                >
              </el-row>
              <el-row class="text-row">
                <el-col :span="17"
                  ><div class="txt-start">价格(Price)：</div>
                </el-col>
                <el-col :span="7"
                  ><div class="txt-end">{{ this.price }} USDC</div></el-col
                >
              </el-row>
              <el-row class="text-row">
                <el-col :span="17"
                  ><div class="txt-start">Roi(利率)：</div>
                </el-col>
                <el-col :span="7"
                  ><div class="txt-end">{{ this.roi }} USDC</div></el-col
                >
              </el-row>
              <el-row class="text-row">
                <el-col :span="17"
                  ><div class="txt-start">质押奖励(Bond profit)：</div>
                </el-col>
                <el-col :span="7"
                  ><div class="txt-end">
                    {{
                      this.peekSpot * this.price * amt * (this.roi / 100 + 1)
                    }}
                    FISH
                  </div></el-col
                >
              </el-row>
              <el-button
                class="btn-buy"
                type="success"
                v-if="createNftApprove"
                @click="create()"
                >{{ this.price * amt }} USDC</el-button
              >
              <el-button
                class="btn-buy"
                type="success"
                v-else
                @click="apporve()"
                >Approve</el-button
              >
            </div></el-col
          >
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import createNft from "@/mixins/createNft";
export default {
  mixins: [createNft],
  data() {
    return {
      dialogVisible: false,
      num: 1,
    };
  },
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  methods: {
    changeVisible() {
      this.dialogVisible = true;
    },
    goOtherPage(url) {
      window.open(url);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    handleChange(value) {
      console.log(value);
    },
  },
  components: {},
};
</script>
<style>
.main {
  width: 400px;
  margin: 30px auto;
}
.bigBanner {
  width: 400px;
  margin: 0 auto;
}
.el-dialog {
  border-radius: 15px;
}
.home-view {
  width: 1000px;
  margin: 0 auto;
}
.text-row {
  margin-top: 27px;
}
.el-input {
  width: 300px;
}
.dialog-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.btn-buy {
  margin-top: 30px;
}
.nftImg {
  width: 300px;
  height: auto;
  margin: 0 auto;
  border: 1px solid #c6c6c6;
  border-radius: 10px;
  background-color: rgb(220, 220, 220);
  padding: 10px;
  text {
    font-family: "Work Sans";
  }
}
.btn-create {
  width: 800px;
  margin: 0 auto;
}
.create-btn {
  width: 400px;
  margin-left: 200px;
}
.dig-left {
  flex: 1;
  padding: 20px;
}
.el-button--success {
  width: 310px;
}
.dig-right {
  flex: 1;
  padding: 20px;
}
.el-input-number__increase {
  right: -119px;
}
.txt-start {
  font-size: 18px;
  font-weight: bold;
}
.txt-end {
  font-size: 18px;
}
</style>
