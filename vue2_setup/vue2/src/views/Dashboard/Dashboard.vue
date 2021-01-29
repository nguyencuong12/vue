<template lang="">
  <div class="dashboard-wrapper">
    <div class="dashboard-title">
      <h3>Dashboard</h3>
    </div>
    <div class="dashboard-content">
      <CardComponent
        title="Create Template"
        description="This page to create template"
        icon="mdi-upload"
        url="/template-create"
      />
      <CardComponent title="Template" description="This page to view template" icon="mdi-file" url = "/template-list"/>
      <CardComponent
        title="Document"
        description="This page to view document"
        icon="mdi-folder-open"
      />
      <CardComponent
        title="Document Complete"
        description="This page to view document complete"
        icon="mdi-folder"
      />
    </div>
  </div>
</template>
<script>
import { CardComponent } from "../../components";
export default {
  data() {
    return {};
  },
  components: {
    CardComponent,
  },
};
</script>
<style scoped src="./Dashboard.css"></style>
