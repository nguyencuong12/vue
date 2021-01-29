<template lang="">
  <div class="card-wrapper">
    <v-card class="mx-auto" max-width="350" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1">
            {{ title }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ description }} </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar tile size="80" color="white">
          <v-icon size="70" color="orange darken-2">
            {{ icon }}
          </v-icon>
        </v-list-item-avatar>
      </v-list-item>

      <v-card-actions>
        <v-btn outlined rounded text @click="onHandleGoPage(url)">
          Go Page
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
export default {
  methods: {
    onHandleGoPage(url) {
      //   console.log("url", url);
      this.$router.push({ path: url });
    },
  },
  props: ["title", "description", "icon", "url"],
};
</script>
<style scoped src="./Card.css"></style>
