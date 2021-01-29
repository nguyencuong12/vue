<template>
  <v-app>
    <v-main>
      <!-- <router-view /> -->
      <component :is="layout">
        <router-view />
      </component>
    </v-main>
  </v-app>
</template>

<script>
const main_layout = "main-layout";
export default {
  name: "App",
  computed: {
    layout() {
      return this.$route.meta.layout || main_layout;
    },
  },
  data: () => ({
    //
  }),
};
</script>

<style scoped>
/* body {
  height: 100%;
} */
* {
  /* box-sizing: border-box; */
  /* overflow: hidden; */
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;
  /* overflow: hidden; */
}
</style>
