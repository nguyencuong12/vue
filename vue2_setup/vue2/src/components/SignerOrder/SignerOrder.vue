<template >
  <v-row justify="center">
    <v-dialog v-model="show" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Signer Options</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12">
                <v-text-field
                  :rules="rulesEmail"
                  default=""
                  label="Email"
                  hint="example of helper text only on focus"
                  @change="setFormDataValue($event, 'signer')"
                  :value="getFormData('signer') || ''"
                >
                  <!-- :v-model="getFormData('signer') || ''" -->
                </v-text-field>
              </v-col>

              <v-col cols="12" sm="12">
                <v-checkbox
                  label="Show signer thumbnail"
                  color="red"
                  hide-details
                ></v-checkbox>
                <v-checkbox
                  label="2 Factor Authentication"
                  color="red"
                  hide-details
                ></v-checkbox>
              </v-col>

              <v-col cols="12" sm="12">
                <v-text-field
                  label="Phone"
                  :disabled="DoubleFactor_Authenticate"
                  :rules="rulesPhone"
                ></v-text-field>
                <small
                  >*(Phone must start with a country code, ie "+81" for Japan)
                </small>
              </v-col>
            </v-row>
          </v-container>
          <small
            >*Please select field owner. If not specified, anyone can
            change/edit this form value.
          </small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="this.onClose">
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" text @click="this.onSubmit"> Ok </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
// import {} from '../../vuex/'
// import { ModalOrderAction } from "../../vuex/actions";
export default {
  // data() {
  //   return {
  //     showModal: this.show,
  //   };
  // },
  data() {
    return {
      formData: {},
    };
  },
  methods: {
    onClose() {
      this.$emit("Reject");
    },
    onSubmit() {
      this.$emit("Approve", this.formData);
    },

    getFormData(key) {
      return this.formData[key];
    },
    setFormDataValue(event, key) {
      this.formData = Object.assign({}, this.formData, { [key]: event });
      console.log("FORMDATA AFTER SET", this.formData);
    },
  },
  props: {
    show: Boolean,
    currentControl: Object,
  },
  mounted() {
    console.log("CURRENT CONTROL", this.currentControl);
  },
  watch: {
    show(newValue) {
      console.log("watch for show ", newValue);
    },
    currentControl(newValue) {
      console.log("Current control watch", newValue);
      if (newValue.signer) {
        console.log("HAVE SIGNER");
      } else {
        console.log("DON'T HAVE SIGNER");
        this.formData.signer = "";
      }
    },
  },
};
</script>
