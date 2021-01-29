<template>
  <div>
    <v-dialog v-model="dialog" width="500" class="wrapper-upload" persistent>
      <div
        class="drop-zone"
        @drop="onDrop($event)"
        @dragover="onDragOver($event)"
        @dragleave="onDragLeave($event)"
        @dragend="onDragEnd($event)"
        @click="onHandleDropzoneClick()"
      >
        <span class="drop-zone-prompt">Drop File Here Or Click</span>
        <input
          type="file"
          name="myFile"
          class="dropzone-input"
          accept="application/pdf"
          @change="onTakeInputFieldChange($event)"
        />
      </div>
    </v-dialog>
  </div>
</template>
<script>
// import { FileAction } from "../../vuex/actions";
var dropzone = document.getElementsByClassName("drop-zone");
var inputTag = document.getElementsByClassName("dropzone-input");

export default {
  name: "Upload",
  components: {},

  data() {
    return {
      dialog: true,
      file: [],
    };
  },
  methods: {
    onDragOver(e) {
      e.preventDefault();
      dropzone[0].classList.add("drop-zone--over");
    },
    onDragLeave(e) {
      e.preventDefault();
      dropzone[0].classList.remove("drop-zone--over");
    },
    onDragEnd(e) {
      e.preventDefault();
    },
    onDrop(e) {
      e.preventDefault();
      console.log("drop", e.dataTransfer.files);
      this.file = e.dataTransfer.files;
      dropzone[0].classList.remove("drop-zone--over");
    },
    onHandleDropzoneClick() {
      inputTag[0].click();
    },
    onTakeInputFieldChange(e) {
      this.file = e.target.files;
    },
  },
  watch: {
    file() {
      if (this.file) {
        this.$parent.onHandleUploadFile(this.file[0]);
        this.dialog = false;

        // this.$store.dispatch([FileAction.assignFile(this.file[0]), (this.dialog = false)]);
      }
    },
  },
};
</script>
<style scoped src="./Upload.css"></style>
