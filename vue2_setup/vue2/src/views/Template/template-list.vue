<template >
  <v-simple-table class="wrapper">
    <!-- <template v-slot:default> -->
    <!-- <div class="template-table-wrapper"> -->
    <thead>
      <tr>
        <th class="text-left">Name</th>
        <th class="text-left">Size</th>
        <th class="text-left">Created</th>
        <th class="text-left">Modified</th>
        <th class="text-left"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in templateList" :key="item.name">
        <td
          @click="onHandleOpenTemplate($event, item._id)"
          class="template-link"
        >
          {{ item.name }}
        </td>
        <td>{{ item.size }}</td>
        <td>{{ item.created }}</td>
        <td>{{ item.modified }}</td>
        <td>
          <div class="control-table">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  color="primary"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  @click="onHandleOpenTemplate($event, item._id)"
                >
                  <!-- <i class="mdi mdi-table-edit:"></i> -->
                  mdi-clipboard-edit
                </v-icon>
              </template>
              <span>edit</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  color="primary"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  @click="onHandleDeleteTemplate($event, item._id)"
                >
                  <!-- <i class="mdi mdi-table-edit:"></i> -->
                  mdi-trash-can
                </v-icon>
              </template>
              <span>delete</span>
            </v-tooltip>
          </div>
        </td>
      </tr>
    </tbody>
    <!-- </div> -->

    <!-- </template> -->
  </v-simple-table>
</template>

<script>
import { TemplateAPI } from "../../api";
export default {
  mounted() {
    TemplateAPI.fetch().then((response) => {
      response.data.list.map((value) => {
        this.templateList.push(value);
      });
    });
  },
  data() {
    return {
      templateList: [],
      // desserts: [
      //   {
      //     name: "Template Test",
      //     size: 100,
      //     created: new Date(),
      //     modified: new Date(),
      //   },
      //   {
      //     name: "Template Test",
      //     size: 100,
      //     created: new Date(),
      //     modified: new Date(),
      //   },
      // ],
      // filesCreate: this.$store.state.TemplateMutation.templateCreate,
    };
  },
  // watch: {
  //   filesCreate() {
  //     console.log("FILE CHANGEEE", this.filesCreate);
  //   },
  // },
  methods: {
    onHandleDeleteTemplate(event, templateID) {
      event.preventDefault();
      console.log("Event Delete Click", templateID);
    },
    onHandleOpenTemplate(event, templateID) {
      event.preventDefault();
      // const reader = new FileReader();
      // this.$router.push({ path: `/template-edit/test` });
      this.$router.push({
        // path: `/template-edit`,
        name: "Template Edit",
        query: { templateID: templateID },
      });
    },
  },
};
</script>
<style src = "./TemplateList.css">
</style>