import createNftInfo from "@/utils/contracts/createNft.js";
export default {
  computed: {
    chainId() {
      console.log("chainid:" + this.$store.getters.getChainId);
      return this.$store.getters.getChainId;
    },
    signer() {
      return this.$store.getters.getSigner;
    },
    account() {
      return this.$store.getters.getAccount;
    },
  },
  watch: {
    //监控amt,把amt控制在20
    amt() {
      if (this.amt > 20) {
        this.amt = 20;
      }
    },
  },
  methods: {
    async updateInfo() {
      this.getUSDCBalanceOf().then((d) => {
        this.usdcBalance = d;
      });
      this.getPrice().then((d) => {
        this.price = d;
      });
      this.getRoi().then((d) => {
        this.roi = d;
      });
      this.getPeekSpot().then((d) => {
        this.peekSpot = d;
      });
      //检查是否有approve
      this.checkCreateNftApprove();
    },
    cutAmt() {
      if (this.amt - 1 < 0) {
        this.amt = 0;
      } else {
        this.amt = Number(this.amt) - 1;
      }
      return this.amt;
    },
    addAmt() {
      this.amt = Number(this.amt) + 1;
      if (this.amt > 20) {
        this.amt = 20;
      }
      return this.amt;
    },
    //换算，取4位小数
    retain(num, d) {
      return (parseInt(num * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d);
    },
    //获得对应链上的信息
    _createNftInfo() {
      const _createNftInfo = createNftInfo.find(
        (contract) => contract.contractChain === "0xa869"
      );
      return _createNftInfo;
    },
    //获取buylogic实例
    async createBuyNFTLogicContract() {
      const buyNFTLoginContract = await new this.$ethers.Contract(
        this._createNftInfo().usdcBuyNftLogic.address,
        JSON.stringify(this._createNftInfo().usdcBuyNftLogic.abi),
        this.signer
      );
      return buyNFTLoginContract;
    },
    //获取fish实例
    async createFishContract() {
      const fishContract = await new this.$ethers.Contract(
        this._createNftInfo().FISH.address,
        JSON.stringify(this._createNftInfo().FISH.abi),
        this.signer
      );
      return fishContract;
    },
    //获得usdc实例
    async createUSDCContract() {
      const USDCContract = await new this.$ethers.Contract(
        this._createNftInfo().USDC.address,
        JSON.stringify(this._createNftInfo().USDC.abi),
        this.signer
      );
      return USDCContract;
    },
    //授权检查
    async checkCreateNftApprove() {
      var apporve = await this.USDCContract.allowance(
        this.account,
        this.buyNFTLogicContract.address
      );
      if (apporve > 10000000000000000) {
        //创建nft授权变为true
        this.createNftApprove = true;
        this.$store.commit("setCreateNftApprove", true);
      } else {
        this.createNftApprove = false;
        this.$store.commit("setCreateNftApprove", false);
      }
    },
    //获得USDC余额
    async getUSDCBalanceOf() {
      this.BalanceOf_ = await this.USDCContract.balanceOf(this.account);
      const balanceOf = this.retain(
        parseFloat(
          this.$ethers.utils.formatUnits(this.BalanceOf_.toString(), 18)
        ),
        4
      );
      return balanceOf;
    },
    //获得价格
    async getPrice() {
      this.price_ = await this.buyNFTLogicContract.price();
      const price_ = this.retain(
        parseFloat(this.$ethers.utils.formatUnits(this.price_.toString(), 18)),
        4
      );
      return price_;
    },
    //获得roi
    async getRoi() {
      this.roi_ = await this.buyNFTLogicContract.ROI();
      return this.roi_ / 100;
    },
    //获得预言机价格
    async getPeekSpot() {
      this.peekSpot_ = await this.buyNFTLogicContract.peekSpot();
      const peekSpot_ = this.retain(
        parseFloat(
          this.$ethers.utils.formatUnits(this.peekSpot_.toString(), 18)
        ),
        4
      );
      return peekSpot_;
    },
    async apporve() {
      try {
        //usdc授权usdcBuyNftLogic
        let tx = await this.USDCContract.approve(
          this.buyNFTLogicContract.address,
          "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
        );
        await tx.wait();
        await this.updateInfo(); //刷新数据
        alert("Successful");
      } catch (err) {
        err.data ? alert(err.data.message) : alert(err.message);
      }
    },
    async create() {
      try {
        //查询这次小号的gas
        // let gasLimit = await this.buyNFTLogicContract.estimateGas.buyNft(
        //   this.amt
        // );
        // gasLimit = gasLimit * 2;

        let tx = await this.buyNFTLogicContract.buyNft(this.amt);
        await tx.wait();
        await this.updateInfo();
        alert("Successful");
      } catch (err) {
        err.data ? alert(err.data.message) : alert(err.message);
      }
    },
  },
  //钩子函数，页面加载后从上往下依次跑
  async mounted() {
    this._createNftInfo();
    this.fishContract = await this.createFishContract();
    this.USDCContract = await this.createUSDCContract();
    this.buyNFTLogicContract = await this.createBuyNFTLogicContract();

    //每六秒刷新updateinfo所有数据
    this.timer = setInterval(async () => {
      await this.updateInfo();
    }, 2000);
  },
  data() {
    return {
      usdcBalance: 0,
      fishBalance: 0,
      price: 0,
      amt: 0,
      roi: 0,
      profit: 0,
      peekSpot: 0,
      approveLoader: false,
      createLoader: false,
      createNftApprove: false,
    };
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
