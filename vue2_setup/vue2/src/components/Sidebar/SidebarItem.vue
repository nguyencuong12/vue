<template lang="">
  <div class="sidebar-body-item" @click="onHandleChooseItemMenu(url)">
    <v-icon large color="orange darken-2">
      {{ icon }}
    </v-icon>
    <span>{{ title }}</span>
  </div>
</template>
<script>
import { TokenManager } from "../../tokenManager/token";
import { SidebarAction } from "../../vuex/actions";
// import { TokenManager } from "../../tokenManager/token";
export default {
  props: ["title", "icon", "url"],
  methods: {
    onHandleChooseItemMenu(url) {
      // this.$router.push({ path: url });
      if (url === "/signout") {
        TokenManager.removeToken();
        this.$router.push({ path: "/login" });
      } else {
        this.$store.dispatch([
          SidebarAction.isOpen(),
          this.$router.push({ path: url }),
        ]);
      }

      // this.$store.dispatch([FileAction.removeFile(), this.$router.push({ path: url })]);
    },
  },
};
</script>
<style scoped src="./SidebarItem.css"></style>
