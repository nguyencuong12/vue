<template>
  <div class="main-layout-wrapper">
    <div class="main-layout-header">
      <HeaderComponent />
    </div>
    <div class="main-layout-sidebar">
      <SidebarComponent />
    </div>

    <div class="main-layout-body">
      <slot />
    </div>
    <div class="main-layout-footer">
      © 2020 FoxitJapan, Inc. / Foxit Software Inc. All rights reserved.
    </div>
  </div>
</template>
<script>
import { HeaderComponent, SidebarComponent } from "../components";
import { TokenManager } from "../tokenManager/token";

export default {
  mounted() {
    console.log("MAIN LAYOUT RENDER");
    var token = TokenManager.getToken();
    if (!token) {
      this.$router.push({ path: "/login" });
    }
  },
  components: {
    HeaderComponent,
    SidebarComponent,
  },
};
</script>
<style scoped src="./mainLayout.css"></style>
