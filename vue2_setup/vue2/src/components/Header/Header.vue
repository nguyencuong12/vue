<template lang="">
  <div class="header-content">
    <div class="header-content-menu" @click="onHandleOpenSidebar()">
      <v-icon v-if="openSidebar === false" medium color="orange darken-2">
        mdi-menu
      </v-icon>
      <v-icon v-else medium color="orange darken-2">
        mdi-close
      </v-icon>
      <!-- <v-icon medium color="orange darken-2">
        mdi-close
      </v-icon> -->
    </div>
    <div class="header-content-account">
      <v-icon medium color="orange darken-2">
        mdi-account
      </v-icon>
      <span>demo@foxit.co.jp</span>
    </div>
  </div>
</template>
<script>
import { SidebarAction } from "../../vuex/actions";
// import { UserAPI } from "../../api";
export default {
  //   mounted() {
  //     console.log("store ", this.$store.state.SidebarMutation.open);
  //   },
  mounted() {
    // UserAPI.getUserInfo().then((response) => {
    //   console.log("HEADER RESPONSE", response);
    // });
  },
  methods: {
    onHandleOpenSidebar() {
      this.$store.dispatch(SidebarAction.isOpen());
    },
  },
  computed: {
    openSidebar() {
      return this.$store.state.SidebarMutation.open;
    },
  },
};
</script>
<style scoped src="./Header.css"></style>
