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
          🐟
        </text>
      </svg>
    </div>
    <createNFTsPopup></createNFTsPopup>
  </div>
</template>
<script>
const createNFTsPopup = () => import("@/components/Popups/CreateNFTsPopup.vue");
import home from "@/mixins/home.js";
export default {
  mixins: [home],
  data() {
    return {};
  },
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  methods: {
    goOtherPage(url) {
      window.open(url);
    },
  },
  components: {
    createNFTsPopup,
  },
};
</script>
