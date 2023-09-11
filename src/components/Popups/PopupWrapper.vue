<template>
  <div class="popup-wrap" v-if="popupActiveType">
    <NetworkPopup
      @close="closePopup"
      v-if="popupActiveType === 'network'"
    ></NetworkPopup>
  </div>
</template>
<script>
const NetworkPopup = () => import("@/components/Popups/NetworkPopup.vue");
export default {
  methods: {
    closePopup() {
      this.$store.commit("closePopups");
    },
  },
  computed: {
    popupActiveType() {
      return this.$store.getters.getPopupType;
    },
  },
  components: {
    NetworkPopup,
  },
};
</script>
