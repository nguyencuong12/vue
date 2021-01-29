<template>
  <div>
    <div v-if="openSidebar === false" class="sidebar-component">
      <div class="sidebar-content"></div>
    </div>
    <div v-else class="sidebar-component active">
      <div class="sidebar-header">
        <h3>Foxit Menu</h3>
      </div>
      <div class="sidebar-body">
        <SidebarItem icon="mdi-home" title="Home" url="/" />
        <SidebarItem icon="mdi-file" title="Templates" url="/template-list" />
        <SidebarItem
          icon="mdi-folder-open"
          title="Documents"
          url="/documents"
        />
        <SidebarItem
          icon="mdi-folder"
          title="Complete Documents"
          url="/complete-documents"
        />
        <SidebarItem
          icon="mdi-lock"
          title="Change Password"
          url="/users/change-password"
        />
        <SidebarItem icon="mdi-exit-to-app" title="Sign Out" url="/signout" />
      </div>
      <div class="sidebar-footer">WEB SIGNATURE</div>
    </div>
  </div>
</template>
<script>
import SidebarItem from "./SidebarItem";

export default {
  mounted() {
    console.log("dashboard mounted", this.$store.state.SidebarMutation.open);
  },
  components: {
    SidebarItem,
  },
  computed: {
    openSidebar() {
      return this.$store.state.SidebarMutation.open;
    },
  },
};
</script>
<style scoped src="./Sidebar.css"></style>
