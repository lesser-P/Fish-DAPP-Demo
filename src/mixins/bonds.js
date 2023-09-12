import bondsInfo from "@/utils/contracts/bonds.js";
import { prettifySeconds } from "@/utils/prettifySeconds";

export default {
  data() {
    return {
      now: null,
      nftBalance: 0,
      youNftInfo: [],
      youNftId: [],
      claimble: 0,
      pending: 0,
      releaseTimestamp: 0,
      lastClaimTimestamp: 0,
      releaseSecond: 0,
      burnLoader: false,
      claimLoader: false,
    };
  },
  async mounted() {
    console.log(this.claimble);
    console.log(this.pending);
    //每秒更新一次
    this.timer = setInterval(async () => {
      //当前时间戳
      this.now = Math.round(new Date() / 1000);
      //还剩释放多少秒
      this.releaseTimestamp =
        Number(this.lastClaimTimestamp) +
        //释放周期
        Number(this.releaseSecond) -
        Number(this.now);
    }, 1000);
    //获取实例
    await this.updateInfo();
    this.fishNftContract = await this.createfishNftContract();
    //更新用户信息
    // this.timer1 = setInterval(async () => {
    //   await this.updateInfo();
    // }, 1000);
    //更新nft信息
    //await this.updateYourNFTs();
  },
  beforeDestroy() {
    clearInterval(this.timer);
    clearInterval(this.timer1);
  },
  computed: {
    chainId() {
      return this.$store.getters.getChainId;
    },
    signer() {
      const userProvider = new this.$ethers.providers.Web3Provider(
        window.ethereum
      );
      return userProvider.getSigner();
    },
    account() {
      console.log(this.$store.getters.getAccount);
      return this.$store.getters.getAccount;
    },
  },
  methods: {
    //保留小数工具
    retain(num, d) {
      return (parseInt(num * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d);
    },
    //根据chainid拿取数据
    _bondsInfo() {
      const _bondsInfo = bondsInfo.find(
        (contract) => contract.contractChain === "0xa869"
      );
      return _bondsInfo;
    },
    //创建FishNFT合约
    async createfishNftContract() {
      const fishNftContract = new this.$ethers.Contract(
        this._bondsInfo().fishNft.address,
        JSON.stringify(this._bondsInfo().fishNft.abi),
        this.signer
      );
      return fishNftContract;
    },
    prettifySeconds(val) {
      return prettifySeconds(val);
    },
    //获得nft数量
    async getNftBalance() {
      this.nftBalanceOf_ = await this.fishNftContract.balanceOf(this.account);
      return this.nftBalanceOf_;
    },
    //获得用户信息
    async getUserInfo() {
      console.log(this.account);
      this.userInfo_ = await this.fishNftContract.userInfo(this.account);
      return this.userInfo_;
    },
    //获得奖励信息
    async getPending() {
      this.pending_ = await this.fishNftContract.pending();
      return this.pending_;
    },
    //更新信息
    async updateInfo() {
      this.getUserInfo().then((d) => {
        //可提取奖励，退18位取4位小数
        this.claimble = this.retain(
          parseFloat(this.$ethers.utils.formatUnits(d.claimble.toString(), 18)),
          4
        );
        this.lastClaimTimestamp = d.lastClaimTimestamp;
        this.releaseSecond = d.releaseSecond;
      });
      this.getPending().then((d) => {
        const pending = this.retain(
          parseFloat(this.$ethers.utils.formatUnits(d.toString(), 18)),
          4
        );
        this.pending = pending;
      });
    },
    //更新NFT信息
    async updateYourNFTs() {
      this.youNftInfo = [];
      this.youNftId = [];
      this.getNftBalance().then((d) => {
        //这个balance是nft数量
        this.nftBalance = d;
        console.log(d);
        for (let i = 0; i < this.nftBalance; i++) {
          this.fishNftContract
            .tokenOfOwnerByIndex(this.account, i)
            .then((f) => {
              this.fishNftContract.nftInfo(f).then((g) => {
                //f为id，g为info
                this.youNftInfo.push(g);
                this.youNftId.push(f);
              });
            });
        }
      });
    },
    //领取奖励
    async claim() {
      try {
        //调用claim函数
        let tx = await this.fishNftContract.claim();
        await tx.wait();
        await this.updateInfo();
        alert("Successful");
      } catch (err) {
        err.data ? alert(err.data.message) : alert(err.message);
      }
    },
    //销毁nft释放奖励
    async burn(id) {
      try {
        //计算gas上限
        let gasLimit = await this.fishNftContract.estimateGas.burn(id);
        gasLimit = gasLimit * 2;
        //调用销毁函数
        let tx = await this.fishNftContract.burn(id, { gasLimit });
        await tx.wait();
        await this.updateInfo();
        await this.updateYourNFTs();
        alert("Successful");
      } catch (err) {
        err.data ? alert(err.data.message) : alert(err.message);
      }
    },
  },
};
