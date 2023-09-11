<template>
  <div id="app">
    <template>
      <Header></Header>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
      <PopupWrapper v-if="showPopup"></PopupWrapper>
      <Footer></Footer>
    </template>
    <MetamaskChecker
      @checkSucess="metamaskCheckSuccess()"
      @checkError="metamaskCheckError()"
    ></MetamaskChecker>
  </div>
</template>

<script>
const Header = () => import("@/components/Header.vue");
const Footer = () => import("@/components/Footer.vue");
const PopupWrapper = () => import("@/components/Popups/PopupWrapper.vue");
const MetamaskChecker = () =>
  import("@/components/MetamaskChecker/MetamaskChecker.vue");

export default {
  data() {
    return {
      checkInProcess: true,
    };
  },
  methods: {
    async metamaskCheckSuccess() {
      this.checkInProcess = false;
      this.Timer = setInterval(async () => {}, 6000);
    },

    async metamaskCheckError(message) {
      this.checkInProcess = true;
      if (message) alert(message);
    },
  },
  computed: {
    showPopup() {
      return this.$store.getters.getPopupState;
    },
  },
  components: {
    MetamaskChecker,
    Header,
    Footer,
    PopupWrapper,
  },
};
</script>
