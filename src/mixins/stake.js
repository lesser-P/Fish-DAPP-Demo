import stakeInfo from "@/utils/contracts/stake.js";
export default {
  computed: {
    chainId() {
      return this.$store.getters.getChainId;
    },
    signer() {
      return this.$store.getters.getSigner;
    },
    account() {
      return this.$store.getters.getAccount;
    },
  },
  methods: {
    retain(num, d) {
      return (parseInt(num * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d);
    },
    //获得信息
    _stakeInfo() {
      const _stakeInfo = stakeInfo.find(
        (contract) => contract.contractChain === this.chainId
      );
      return _stakeInfo;
    },
    //生成合约实例
    async createFishContract() {
      const fishContract = new this.$ethers.Contract(
        this._stakeInfo().FISH.address,
        JSON.stringify(this._stakeInfo().FISH.abi),
        this.signer
      );
      return fishContract;
    },
    async createSFishContract() {
      const sFishContract = new this.$ethers.Contract(
        this._stakeInfo().sFISH.address,
        JSON.stringify(this._stakeInfo().sFISH.abi),
        this.signer
      );
      return sFishContract;
    },
    async createFISH_USDC_LPContract() {
      const FISH_USDC_LPContract = new this.$ethers.Contract(
        this._stakeInfo().FISH_USDC_LP.address,
        JSON.stringify(this._stakeInfo().FISH_USDC_LP.abi),
        this.signer
      );
      return FISH_USDC_LPContract;
    },
    async createUSDCContract() {
      const USDCContract = new this.$ethers.Contract(
        this._stakeInfo().USDC.address,
        JSON.stringify(this._stakeInfo().USDC.abi),
        this.signer
      );
      return USDCContract;
    },
    //获得sfish余额
    async getSFISHBalanceOf() {
      this.SFISHBalanceOf_ = await this.sFishContract.balanceOf(this.account);
      const SFISHBalanceOf = this.retain(
        parseFloat(
          this.$ethers.utils.formatUnits(this.SFISHBalanceOf_.toString(), 18)
        ),
        4
      );
      return SFISHBalanceOf;
    },
    //获得fish余额
    async getFISHBalanceOF() {
      this.FISHBalanceOf_ = await this.fishContract.balanceOf(this.account);
      const FISHBalanceOf = this.retain(
        parseFloat(
          this.$ethers.utils.formatUnits(this.FISHBalanceOf_.toString(), 18)
        ),
        4
      );
    },
    //sfish兑换fish价格
    async getSFish_FishPrice() {
      const totalSupply = await this.sFishContract.totalSupply();
      const totalTokens = await this.fishContract.balanceOf(
        this.sFishContract.address
      );
      return parseFloat(totalSupply) / parseFloat(totalTokens);
    },
    //fish兑换sfish的价格
    async getFish_SFishPrice() {
      if (this.sFish_FishPrice === 0) {
        return 0;
      }
      return Number(1 / this.sFish_FishPrice);
    },
    //usdc兑fish的价格
    async getUSD_FishPrice() {
      //获得代币对合约中fish的数量
      const fishAmt = await this.fishContract.balanceOf(
        this.FISH_USDC_LPContract.address
      );
      //获得代币对合约中usdc的数量
      const usdcAmt = await this.USDCContract.balanceOf(
        this.FISH_USDC_LPContract.address
      );
      //一个fish价值多少U
      return parseFloat(usdcAmt) / parseFloat(fishAmt);
    },
    //sfish兑换usdc
    async getSFish_USDPrice() {
      //一个sfish价值多少usdc
      var SFish_Fish = await this.getSFish_FishPrice();
      var USD_Fish = await this.getUSD_FishPrice();
      if (SFish_Fish == 0) {
        return 0;
      }
      return (USD_Fish / SFish_Fish).toFixed(6);
    },
    //授权检查
    async checkApporve() {
      //获得fish授权给sfish的额度
      var Apporve1 = await this.fishContract.allowance(
        this.account,
        this.sFishContract.address
      );
      if (Apporve1 > 1000000000000000000) {
        this.fishIsApporve = true;
      }
      //sFish授权给fish的额度
      var Apporve2 = await this.sFishContract.allowance(
        this.account,
        this.fishContract.address
      );
      if (Apporve2 > 1000000000000000000) {
        this.sFishIsApporve = true;
      }
    },
    //更新信息
    async updateInfo() {
      this.getFISHBalanceOf().then((d) => {
        this.FISHBalanceOf = d;
      });
      this.getSFISHBalanceOf().then((d) => {
        this.SFISHBalanceOf = d;
      });
      this.getFish_SFishPrice().then((d) => {
        this.Fish_sFishPrice = parseFloat(d).toFixed(10);
      });
      this.getSFish_FishPrice().then((d) => {
        this.sFish_FishPrice = parseFloat(d);
      });
      this.getSFish_USDPrice().then((d) => {
        this.SFish_USDPrice = parseFloat(d);
      });
      this.getUSD_FishPrice().then((d) => {
        this.USD_FishPrice = parseFloat(d);
      });
      this.checkApporve();
    },
    reverse() {
      this.stakeState = !this.stakeState;
    },
    //授权
    async apporve() {
      try {
        if (this.stakeState) {
          //授权最大值
          var tx = await this.fishContract.apporve(
            this.sFishContract.address,
            "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
          );
        } else {
          var tx = await this.fishContract.apporve(
            this.fishContract.address,
            "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
          );
        }
        await tx.wait();
        await this.updateInfo();
        alert("Successful");
      } catch (err) {
        err.data ? alert(err.data.message) : alert(err.message);
      }
    },
    //质押
    async stake() {
      try {
        //类型转为wei
        var inputNumber_ = this.ethers.utils.parseUnits(this.fishInput, 18);
        //质押后给的sFish
        let tx = await this.sFishContract.mint(inputNumber_);
        await tx.wait(); //等待交易上链
        await this.updateInfo(); //更新信息
        alert("Successful");
      } catch (err) {
        err.data ? alert(err.data.message) : alert(err.message);
      }
    },
    //赎回
    async unStake() {
      try {
        var inputNumber_ = this.$ethers.utils.parseUnits(this.sFishInput, 18);
        //销毁x的sfish，返回质押的fish
        let tx = await this.sFishContract.burn(this.account, inputNumber_);
        await tx.wait();
        await this.updateInfo();
        alert("Successful");
      } catch (err) {
        err.data ? alert(err.data.message) : alert(err.message);
      }
    },
  },
  async mounted() {
    //生成合约实例
    this.fishContract = await this.createFishContract();
    this.sFishContract = await this.createSFishContract();
    this.FISH_USDC_LPContract = await this.createFISH_USDC_LPContract();
    this.USDCContract = await this.createUSDCContract();
    await this.updateInfo();
  },
  data() {
    return {
      FISHBalanceOf: 0,
      SFISHBalanceOf: 0,
      stakeState: true,

      fishInput: 0,
      sFishInput: 0,

      fishIsApporve: false,
      sFishIsApporve: false,

      sFish_FishPrice: 0,
      Fish_sFishPrice: 0,
      SFish_USDPrice: 0,
      USD_FishPrice: 0,
      amountError: "",
    };
  },
};
