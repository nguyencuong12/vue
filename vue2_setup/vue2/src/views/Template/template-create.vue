<template >
  <div class="template-create-wrapper">
    <UploadComponent />
    <div class="template-create-content">
      <div class="template-create-content-header">
        <!-- <v-btn class="btn" color="primary" elevation="2" medium>Create</v-btn> -->
        <v-dialog v-model="dialog" persistent max-width="600">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              Create
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="headline"> Template Name </v-card-title>
            <v-card-text>
              <v-text-field
                label="Name"
                @change="onTakeTemplateName($event)"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="green darken-1"
                text
                @click="onCloseTemplate($event)"
              >
                Cancel
              </v-btn>
              <v-btn
                color="green darken-1"
                text
                @click="onCreateTemplate($event)"
              >
                OK
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-btn
          class="btn"
          color="secondary"
          elevation="2"
          medium
          @click="onHandleCancel($event)"
          >Cancel</v-btn
        >
      </div>

      <div class="template-create-content-body">
        <!-- FIXME:/// -->

        <div class="view-pdf" id="content-container">
          <WVSPDFViewComponent
            v-if="this.file"
            :file="file"
            viewerContainer="content-container"
            :control="this.controlCollections"
          />
          <DNDInteractComponent
            dragItemClass="wvs-draggable"
            dropItemClass="fv__pdf-page-handler-container"
          />
        </div>

        <div class="wvs-design-control">
          <div class="wvs-design-control-title">
            <span>CONTROL ASSIGN</span>
          </div>
          <!-- <div class="wvs-design-control-header">
            <span @click="showSignerOrder = false">Controls</span>
            <span @click="showSignerOrder = true">Signer Order</span>
          </div> -->
          <div class="wrapper-control">
            <div id="control-container" class="template-control-container">
              <div class="control-item wvs-draggable" data-type="wvs-text">
                <v-icon large color="white darken-2"> mdi-sign-text </v-icon>
              </div>
              <div class="control-item wvs-draggable" data-type="wvs-check">
                <v-icon large color="white darken-2"> mdi-check-circle </v-icon>
              </div>
              <div class="control-item wvs-draggable" data-type="wvs-video">
                <v-icon large color="white darken-2"> mdi-video-image </v-icon>
              </div>
            </div>
            <div class="wvs-design-control-description">
              <span
                >Drag & drop control into pdf content to create control.</span
              >
            </div>

            <div class="wvs-coordinate-control">
              <v-container class="wrapper-content-coordinate grey lighten-5">
                <v-row no-gutters>
                  <v-col cols="12" sm="12" md="6">
                    <span>x</span>
                    <v-card class="pa-2 ml-2" outlined tile>
                      <input
                        type="text"
                        :value="
                          this.selectControlRect
                            ? parseInt(this.selectControlRect.x)
                            : 0
                        "
                        @change="onTakeChangeValueCoordinate('x', $event)"
                      />
                    </v-card>
                    <!-- @change="onTakeChangeValueCoordinate("x",$event")" /> -->
                  </v-col>
                  <v-col cols="12" sm="12" md="6">
                    <span>y</span>
                    <v-card class="pa-2 ml-2" outlined tile>
                      <!-- {{ this.selectControlRect ? this.selectControlRect.y : 0 }} -->
                      <input
                        type="text"
                        :value="
                          this.selectControlRect
                            ? parseInt(this.selectControlRect.y)
                            : 0
                        "
                        @change="onTakeChangeValueCoordinate('y', $event)"
                      />
                    </v-card>
                  </v-col>

                  <v-col cols="12" sm="12" md="6">
                    <span>width</span>
                    <v-card class="pa-2 ml-2" outlined tile>
                      <input
                        type="text"
                        :value="
                          this.selectControlRect
                            ? parseInt(this.selectControlRect.width)
                            : 0
                        "
                        @change="onTakeChangeValueCoordinate('width', $event)"
                      />
                    </v-card>
                  </v-col>
                  <v-col cols="12" sm="12" md="6">
                    <span>height</span>
                    <v-card class="pa-2 ml-2" outlined tile>
                      <!-- {{
                      this.selectControlRect ? this.selectControlRect.height : 0
                    }} -->
                      <input
                        type="text"
                        :value="
                          this.selectControlRect
                            ? parseInt(this.selectControlRect.height)
                            : 0
                        "
                        @change="onTakeChangeValueCoordinate('height', $event)"
                      />
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </div>
          </div>

          <div class="signer-order">
            <!-- <span>{{  }}</span> -->
            <template v-if="userSigner">
              <span>{{ userSigner }}</span>
              <small style="display: block; margin-top: 30px; color: #ffb84b"
                >(Drag & drop item to change signer order)</small
              >
            </template>
            <template v-else>
              <span>No signer assigned</span>
            </template>
          </div>
        </div>
      </div>
    </div>
    <!-- !!!!!!!!!!! LOADING  !!!!!!!!!!!-->
    <v-dialog v-model="takeLoadingStatus" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          LOADING
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- !!!!!!!!!!!!!! INPUT FIELD DIALOG !!!!!!!!!!!!!!!! -->
    <!-- <v-row justify="center">
      <v-dialog v-model="dialogInputField" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Signer Options</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12">
                  <v-autocomplete
                    :items="userSigner"
                    label="Interests"
                    multiple
                  ></v-autocomplete>
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
            <v-btn color="blue darken-1" text @click="dialogInputField = false">
              Cancel
            </v-btn>
            <v-btn color="blue darken-1" text @click="dialogInputField = false">
              Ok
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row> -->

    <!-- !!!!!!!!!!!!!! INPUT FIELD DIALOG !!!!!!!!!!!!!!!! -->

    <!-- !!!!!!!!!!!! VIDEO FIELD DIALOG !!!!!!!!!!!!!!!! -->

    <!-- <v-row justify="center">
      <v-dialog v-model="dialogVideoField" persistent max-width="600px">
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
                    label="Email"
                    hint="example of helper text only on focus"
                    @change="
                      onGetFormInput($event, 'VIDEO_CONTROL_FORM', 'email')
                    "
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="12">
                  <v-checkbox
                    label="Show signer thumbnail"
                    color="red"
                    hide-details
                    @change="onCheckBoxChange($event)"
                  ></v-checkbox>
                  <v-checkbox
                    label="2 Factor Authentication"
                    color="red"
                    hide-details
                    @change="onCheckBoxChange($event, 'phoneNumber')"
                  ></v-checkbox>
                </v-col>

                <v-col cols="12" sm="12">
                  <v-text-field
                    label="Phone"
                    :disabled="DoubleFactor_Authenticate"
                    :rules="rulesPhone"
                    @change="
                      onGetFormInput($event, 'VIDEO_CONTROL_FORM', 'phone')
                    "
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
            <v-btn color="blue darken-1" text @click="dialogVideoField = false">
              Cancel
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="onSubmitForm($event, 'VIDEO_SIGNATURE')"
            >
              Ok
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row> -->

    <!-- !!!!!!!!!!!! VIDEO FIELD DIALOG !!!!!!!!!!!!!!!! -->
  </div>
</template>
<script>
import {
  UploadComponent,
  WVSPDFViewComponent,
  DNDInteractComponent,
} from "../../components";
import { PDFHelper } from "../../components/WVS/PDFHelper";
// import { FileAction } from "../../vuex/actions";
import { /*PdfAction*/ TemplateAction } from "../../vuex/actions";
import { v4 as uuidv4 } from "uuid";

export default {
  data() {
    // dragItemClass = "wvs-draggable";
    // dropItemClass = "fv__pdf-page-handler-container";

    return {
      // loadingDialog: this.$store.state.PDFMutation.loading,
      // loading: this.takeLoadingStatus,
      rulesEmail: [
        (value) => !!value || "Required.",
        (value) => (value || "").length <= 20 || "Max 20 characters",
        (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      ],
      rulesPhone: [
        (value) => !!value || "Required.",
        (value) => (value || "").length <= 13 || "Max Phone Number 11",
        (value) => {
          if (value.indexOf("+81") !== -1) {
            console.log("Find + 81");
          } else if (value.indexOf("+84") !== -1) {
            console.log("Find + 84");
          } else {
            return "Please Input Area Number";
          }
        },
      ],

      formDataInput: {},
      userSigner: null,
      DoubleFactor_Authenticate: true,
      dialog: false,
      dialogInputField: false,
      dialogVideoField: false,
      widthWindow: 0,
      selectControlRect: null,
      selectControlElement: null,
      pdfView: null,
      pdfDoc: null,
      file: null,
      pageRender: {},
      // controlCollections: this.$store.state.PDFMutation.controls,
      templateCreate: {},
      showSignerOrder: false,
      controlCollections: [],

      // windowSize: [0, 0],
      // const [windowSize, setWindowSize] = useState([0, 0]);
    };
  },

  // methods: {
  //   myEventHandler(e) {
  //     // your code for handling resize...
  //   }
  // }
  components: {
    UploadComponent,
    WVSPDFViewComponent,
    DNDInteractComponent,
  },
  computed: {
    takeLoadingStatus() {
      return this.$store.state.PDFMutation.loading;
    },

    statusCreateTemplate() {
      return this.$store.state.TemplateMutation.statusCreateTemplate;
    },
  },
  watch: {
    statusCreateTemplate(value) {
      if (value === false) {
        this.$swal({
          title: "Error",
          text: "Error When Create Template Please Check !!!",
          icon: "error",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        console.log("SUCCESS !!!");
        this.$swal({
          title: "Create Template Success",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          this.$router.push({ path: "/" });
        });
      }
      // console.log(
      //   "watch template create !!!!!!!!!!!!!!!!!",
      //   this.$store.state.TemplateMutation.statusCreateTemplate
      // );
    },

    takeLoadingStatus(oldValue, newValue) {
      if (newValue === true) {
        console.log("TRUE");
      }
    },
    showSignerOrder(oldValue, newValue) {
      console.log("show signer order", newValue);
      var manager_Switch = document.getElementsByClassName(
        "wvs-design-control-header"
      );
      var controlLayout = document.getElementsByClassName("wrapper-control");
      var signerLayout = document.getElementsByClassName("signer-order");

      // console.log(
      //   "signerOrderElement",
      // );

      if (newValue === true) {
        console.log(" EXCEPTION (1)");
        manager_Switch[0].lastChild.style.borderBottom = "3px solid #cccccc";
        manager_Switch[0].firstChild.style.borderBottom = "3px solid #ffb84d";
        controlLayout[0].style.display = "block";
        signerLayout[0].style.display = "none";
      } else {
        console.log(" EXCEPTION (2)");
        manager_Switch[0].firstChild.style.borderBottom = "3px solid #cccccc";
        manager_Switch[0].lastChild.style.borderBottom = "3px solid #ffb84d";
        controlLayout[0].style.display = "none";
        signerLayout[0].style.display = "block";
      }
    },
  },
  // watch: {

  //   // loading() {
  //   //   console.log("LOADING CHANGE ");
  //   // },
  // },
  mounted() {
    // console.log(
    //   "TEMPLATE CREATE MOUNT AND CONTROL MUTATION",
    //   this.$store.state.PDFMutation.controls
    // );
  },
  methods: {
    // resizeHandler(event) {
    //   // console.log("window resize", event);
    // },
    // parentMethods(argument) {
    //   console.log("parent method call !!", argument);
    // },

    // <<<<<<<<<< Event Of Element >>>>>>>>>>>>>>>>>

    // onCheckBoxChange(event, phoneNumber) {
    //   console.log("change", event);
    //   if (phoneNumber && event === true) {
    //     this.DoubleFactor_Authenticate = false;
    //   } else {
    //     this.DoubleFactor_Authenticate = true;
    //   }
    // },

    // onGetFormInput(event, type, nameField) {
    //   // console.log("event", event);
    //   // console.log("type", type);
    //   switch (type) {
    //     case "TEMPLATE_CREATE_FORM": {
    //       break;
    //     }

    //     case "VIDEO_CONTROL_FORM": {
    //       console.log("VIDEO_CONTROL_FORM");
    //       this.formDataInput.videoControl = {
    //         ...this.formDataInput.videoControl,
    //         [nameField]: event,
    //       };
    //       console.log("formData", this.formDataInput);
    //       break;
    //     }
    //     case "TEXT_CONTROL_FORM": {
    //       break;
    //     }

    //     case "CHECK_CONTROL_FORM": {
    //       break;
    //     }
    //     default: {
    //       break;
    //     }
    //   }
    //   // // var email = {
    //   // //   email: event,
    //   // // };
    //   // // this.formDataInput. = email;

    //   // // console.log("FORMDATA", this.formDataInput);
    // },
    onSubmitForm(event, type) {
      // numberAuthentication
      switch (type) {
        case "VIDEO_SIGNATURE": {
          // console.log("video signature ", this.formDataInput);
          this.dialogVideoField = false;
          console.log("VIDEO_SIGNATURE", this.DoubleFactor_Authenticate);
          if (
            !this.formDataInput.videoControl.phone &&
            this.DoubleFactor_Authenticate === false
          ) {
            console.log("Please Input Phone Field Of Video Control");
          }
          // if (!this.formthis.numberAuthentication === false) {
          //   console.log(
          //     "You choose 2 Factor Authenticate Please Fill Email And Phone Number !!!"
          //   );
          // }
          if (!this.formDataInput.videoControl.email) {
            console.log("Please Input Email Field Of Video Control");
          } else {
            // this.userSigner.push(this.formDataInput.videoControl.email);
            this.userSigner = this.formDataInput.videoControl.email;
          }

          // if (!this.formDataInput.videoControl) {
          //   console.log("Please Input Field Of Video Control");
          // }
          // if (!this.formDataInput.videoControl.email) {
          //   console.log("Please Input Email Field Of Video Control");
          // }
          // if (!this.formDataInput.videoControl.phone) {
          //   console.log("Please Input Phone Field Of Video Control");
          // } else {
          //   console.log("ELSE CALL");
          //   this.userSigner.push(this.formDataInput.videoControl.email);
          // }

          break;
        }
        case "TEXT_SIGNATURE": {
          break;
        }
        case "CHECK_SIGNATURE": {
          break;
        }
        default: {
          break;
        }
      }
    },

    // <<<<<<<<<< Event Of Element >>>>>>>>>>>>>>>>>

    onHandleUploadFile(fileUpload) {
      if (!fileUpload) {
        return;
      } else {
        this.file = fileUpload;
      }
    },
    onHandleCreate(para) {
      if (!para) {
        return null;
      }
    },
    onHandleCancel(event) {
      event.preventDefault();
      this.$router.push({ path: "/" });
      // this.$store.dispatch([this.$router.push({ path: "/" })]);

      // this.$router.push({ path: "/" });
      // this.$store.dispatch([FileAction.removeFile(), this.$router.push({ path: "/" })]);
    },

    async onDropControlHandleDND(control, element) {
      var pageRenderer = this.pdfView.getPDFPageRender(control.pageNo);
      var rect = element.getBoundingClientRect();
      //this is rectangle of drag item
      this.selectControlRect = rect;
      if (!control.id) {
        //NEW CONTROL
        control.id = uuidv4();
        control.scale = pageRenderer.scale;
        control.pageRect = await PDFHelper.deviceRectToPageRect(
          pageRenderer,
          control.deviceRect,
          control.scale
        );
        // this.controlCollections.push(control);
        // PdfAction.addControlToPDF(control);
        // this.testControlCollection.push(control);
        this.controlCollections.push(control);
        element.id = control.id;
      } else {
        //IF EXIST CONTROL IT'S MEAN USER EDIT DRAG ITEM
        //AND WE MUST UPDATE COORDINATE OF DRAG ITEM USER HAS BEEN DROP !!!!!
        //IMPORTANT
        const found = this.controlCollections.find(
          (item) => item.id === control.id
        );
        found.scale = pageRenderer.scale;
        found.deviceRect = control.deviceRect;
        found.pageRect = await PDFHelper.deviceRectToPageRect(
          pageRenderer,
          control.deviceRect,
          control.scale
        );
      }
    },
    onDragControlHandleDND(dragElement) {
      const rect = dragElement.getBoundingClientRect();
      this.selectControlRect = rect;
      this.selectControlElement = dragElement;
    },
    onTakeTemplateName(event) {
      console.log("template namee", event);
      var tempObject = {
        name: event,
        file: this.file,
        type: this.file.type,
        // metaInfo: JSON.stringify(this.controlCollections),
        controls: JSON.stringify(this.controlCollections),
      };
      this.templateCreate = Object.assign({}, this.templateCreate, tempObject);
      // this.templateCreate = JSON.stringify(
      //   Object.assign({}, this.templateCreate, tempObject)
      // );
    },

    onOpenSuccess(doc) {
      // console.log("on open success ", doc);
      this.pdfDoc = doc;
    },
    onComplete(doc) {
      this.pdfDoc = doc;
    },
    onRenderPageSuccess(render) {
      this.pageRender = render;
    },
    onInitSuccess(pdfview) {
      this.pdfView = pdfview;
    },

    onCreateTemplate(event) {
      event.preventDefault();
      this.dialog = false;
      if (!this.templateCreate.name) {
        this.$swal({
          title: "Error",
          text: "Please Fill Template Name To Create !!!",
          icon: "error",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        this.$store.dispatch([
          TemplateAction.templateCreateAction(this.templateCreate),
          //DISPATCH ACTION
        ]);
      }

      // if (!this.templateCreate.name) {
      //   this.$swal({
      //     title: "Error",
      //     text: "Please Fill Template Name To Create !!!",
      //     icon: "error",
      //     timer: 2000,
      //     showConfirmButton: false,
      //   });
      // } else {
      //   console.log("TEMPLATE CREATE", this.templateCreate);
      //   // this.$swal({
      //   //   'Good job'
      //   // });
      //   // this.$swal('Heading', 'this is a Heading', 'OK');
      //   // this.$swal("Create Template Success", "", "success");
      //   this.$swal({
      //     title: "Create Template Success",
      //     icon: "success",
      //     timer: 1500,
      //     showConfirmButton: false,
      //   }).then(() => {
      //     this.$store.dispatch([
      //       // PdfAction.removeAllControlPDF(),
      //       TemplateAction.templateCreateAction(this.templateCreate),
      //       this.$router.push({ path: "/" }),
      //     ]);
      //   });
      //   //PLACE TO SEND API TO BACKEND REGISTER TEMPLATE !!!!!!!!!!!!!
      // }
    },
    onCloseTemplate() {
      event.preventDefault();
      this.dialog = false;
    },
    async onControlResized(control) {
      var pdfViewer = this.pdfview;
      var pageRenderer = await pdfViewer.getPDFPageRender(control.pageNo);
      const found = this.controlCollections.find(
        (item) => item.id === control.id
      );
      found.scale = pageRenderer.getScale();
      found.deviceRect = control.deviceRect;
      found.pageRect = await PDFHelper.deviceRectToPageRect(
        pageRenderer,
        control.deviceRect
      );
    },
    async onCoordinateControlChange(key, value) {
      const found = this.controlCollections.find(
        (item) => item.id === this.selectControlElement.id
      );
      var pdfViewer = this.pdfView;
      var pageRenderer = await pdfViewer.getPDFPageRender(found.pageNo);
      found.scale = pageRenderer.getScale();

      var valueToInt = parseInt(value);
      switch (key) {
        case "x": {
          this.selectControlRect.x = valueToInt;
          this.selectControlElement.style.left = valueToInt + "px";
          found.deviceRect.left = valueToInt;
          found.deviceRect.right =
            found.deviceRect.left + found.deviceRect.width;
          break;
        }
        case "y": {
          this.selectControlRect.y = valueToInt;
          this.selectControlElement.style.top = valueToInt + "px";
          found.deviceRect.top = valueToInt;
          found.deviceRect.bottom =
            found.deviceRect.top + found.deviceRect.height;

          break;
        }
        case "width": {
          this.selectControlRect.width = valueToInt;
          this.selectControlElement.style.width = valueToInt + "px";
          found.deviceRect.width = valueToInt;
          found.deviceRect.right = found.deviceRect.left + valueToInt;
          break;
        }
        case "height": {
          this.selectControlRect.height = valueToInt;
          this.selectControlElement.style.height = valueToInt + "px";
          found.deviceRect.height = valueToInt;
          found.deviceRect.bottom = found.deviceRect.top + valueToInt;
          break;
        }
      }

      found.pageRect = await PDFHelper.deviceRectToPageRect(
        pageRenderer,
        found.deviceRect
      );
    },

    toPageRect(element) {
      var dropElement = element;
      //this is drag item
      var dropZone = element.parentNode;
      var dragItemRect = dropElement.getBoundingClientRect();
      var dropZoneRect = dropZone.getBoundingClientRect();
      var offsetRect = {
        left: dragItemRect.left - dropZoneRect.left,
        top: dragItemRect.top - dropZoneRect.top,
        right: dragItemRect.left - dropZoneRect.left + dragItemRect.width,
        bottom: dragItemRect.top - dropZoneRect.top + dragItemRect.height,
        width: dragItemRect.width,
        height: dragItemRect.height,
      };
      offsetRect.x = offsetRect.left;
      offsetRect.y = offsetRect.top;
      return offsetRect;
    },
    onTakeChangeValueCoordinate(key, event) {
      // console.log("take change (2)", event.target.value);
      this.onCoordinateControlChange(key, event.target.value);
    },
    onControlClick(event) {
      event.preventDefault();
      var element = event.target;
      var rect = this.toPageRect(element);
      this.selectControlRect = rect;
      this.selectControlElement = element;
    },
    // onControlDoubleClick(event) {
    //   event.preventDefault();
    //   var target = event.target;
    //   var typeControl = target.attributes.dataType.nodeValue;
    //   var controlID = target.getAttribute("id");
    //   console.log("control ID", controlID);

    //   console.log("type control", typeControl);
    //   switch (typeControl) {
    //     case "wvs-recordVideo-icon": {
    //       //TODO:
    //       //ADD event for record icon
    //       this.dialogVideoField = true;

    //       break;
    //     }
    //     case "wvs-text-icon": {
    //       this.dialogInputField = true;
    //       break;
    //     }

    //     case "wvs-check-icon": {
    //       this.dialogInputField = true;

    //       break;
    //     }
    //     default: {
    //       break;
    //     }
    //   }
    //   // console.log("TARGET", target);
    //   // console.log("Attribute", target.attributes.dataType.nodeValue);
    // },
  },
};
</script>
<style scoped src="./Template.css"></style>
