


<template >
  <div class="template-create-wrapper">
    <div class="template-create-content">
      <div class="template-create-content-header">
        <!-- <v-btn class="btn" color="primary" elevation="2" medium>Create</v-btn> -->
        <!-- <v-dialog v-model="dialog" persistent max-width="600"> -->
        <!-- <template v-slot:activator="{ on, attrs }"> -->

        <v-btn color="primary" dark @click="onHandleUpdateTemplate">
          Update Template
        </v-btn>

        <v-btn color="primary" dark @click="openInitInteract = true">
          Init Interact
        </v-btn>

        <!-- </template> -->
        <!-- <v-card>
            <v-card-title class="headline"> Template Name </v-card-title>
            <v-card-text>
              <v-text-field label="Name"></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text> Cancel </v-btn>
              <v-btn color="green darken-1" text> OK </v-btn>
            </v-card-actions>
          </v-card> -->
        <!-- </v-dialog> -->

        <v-btn
          class="btn"
          color="secondary"
          elevation="2"
          medium
          @click="onHandleCancel($event)"
          >Cancel</v-btn
        >
        <v-btn :disabled="enalbleSignDoc" medium color="success"
          >Make Sign Doc</v-btn
        >
      </div>

      <div class="template-create-content-body">
        <!-- FIXME:/// -->
        <!-- :file="this.testFile[0].file" -->

        <div class="view-pdf" id="content-container">
          <WVSPDFViewComponent
            v-if="pdfFile"
            :file="this.pdfFile"
            viewerContainer="content-container"
            :control="this.controlCollections"
          />
          <DNDInteractComponent
            dragItemClass="wvs-draggable"
            dropItemClass="fv__pdf-page-handler-container"
          />
          <!-- v-if="this.controlRender === true" -->
          <!-- v-if="openInitInteract" -->
          <!-- v-if="this.controlRender === true && pdfLoaded === false" -->
        </div>

        <div class="wvs-design-control">
          <div class="wvs-design-control-title">
            <span>CONTROL ASSIGN</span>
          </div>
          <div class="wvs-design-control-header">
            <span @click="showSignerOrder = false">Controls</span>
            <span @click="showSignerOrder = true">Signer Order</span>
          </div>
          <div class="wrapper-control">
            <div id="control-container" class="template-control-container">
              <div class="control-item wvs-draggable" data-type="wvs-text">
                <v-icon medium color="white darken-2"> mdi-sign-text </v-icon>
              </div>
              <div class="control-item wvs-draggable" data-type="wvs-check">
                <v-icon medium color="white darken-2">
                  mdi-check-circle
                </v-icon>
              </div>
              <div class="control-item wvs-draggable" data-type="wvs-video">
                <v-icon medium color="white darken-2"> mdi-video-image </v-icon>
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
              <!-- <span>{{ userSigner }}</span> -->
              <div class="signer-order-list">
                <span v-for="item in userSigner" :key="item">{{
                  item.signer
                }}</span>
                <!-- <span>{{ userSigner }}</span> -->
              </div>
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
                  <v-autocomplete :items="userSigner"></v-autocomplete>
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
                  >
                    ></v-text-field
                  >
                
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

    <!-- SOLUTION CREATE MULTIPLE SIGNER DIALOG FOR EACH ITEM -->
    <SignerDialog
      :show="this.showControlSetting"
      :currentControl="this.takeCurrentControl"
      @Approve="this.onApprove"
      @Reject="this.onReject"
    ></SignerDialog>
  </div>
</template>
<script>
import { WVSPDFViewComponent, DNDInteractComponent } from "../../components";
import { PDFHelper } from "../../components/WVS/PDFHelper";
// import { FileAction } from "../../vuex/actions";
// import { PdfAction } from "../../vuex/actions";
import { v4 as uuidv4 } from "uuid";
import { TemplateAPI } from "../../api";
import SignerOrderDialog from "../../components/SignerOrder/SignerOrder";
// import { ModalOrderAction } from "../../vuex/actions";
export default {
  components: {
    SignerDialog: SignerOrderDialog,
    WVSPDFViewComponent,
    DNDInteractComponent,
  },
  computed: {
    takeCurrentControl() {
      //     currentControl={controlCollectionsRef.current.find( (control) => control.id
      // === selectedControlId, )}
      // var currentControl = controlCollections.find((control)=>{
      //   control.id ==
      // })
      var currentControl = this.controlCollections.find(
        (control) => control.id === this.selectControlID
      );
      return currentControl;
    },
    controlRender() {
      // return this.$store.state.PDFMutation.controlRendered;
      return this.$store.state.PDFMutation.controlRendered;
    },
    takeLoadingStatus() {
      return this.$store.state.PDFMutation.loading;
    },
  },
  mounted() {
    TemplateAPI.get({ id: this.templateID }).then((response) => {
      // console.log("get template response", response);
      this.controlCollections = response.data.template[0].controls || [];
      this.templateInfo = response.data.template[0];
    });

    // console.log("THIS PARAM EDIT", this.$router.params.templateID);
  },
  data() {
    // dragItemClass = "wvs-draggable";
    // dropItemClass = "fv__pdf-page-handler-container";
    return {
      // controlRender: this.$store.state.PDFMutation.controlRendered,
      pdfLoaded: this.$store.state.PDFMutation.pdfLoaded,
      openInitInteract: false,
      controlCollections: [],
      pdfFile: "",
      templateID: this.$route.query.templateID,
      templateInfo: "",
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

      // loadingDialog: this.$store.state.PDFMutation.loading,
      // loading: this.takeLoadingStatus,
      //FIXME:
      showControlSetting: false,
      userSigner: [],
      DoubleFactor_Authenticate: true,
      formDataInput: {},
      formData: {},
      showSignerOrder: false,
      dialogInputField: false,
      dialogVideoField: false,
      enalbleSignDoc: true,
      dialog: false,
      widthWindow: 0,
      selectControlRect: null,
      selectControlElement: null,
      pdfView: null,
      pdfDoc: null,
      file: null,
      pageRender: {},
      templateCreate: {},
      selectControlID: "",
      // windowSize: [0, 0],
      // const [windowSize, setWindowSize] = useState([0, 0]);
    };
  },

  watch: {
    // controlCollections(value) {
    //   console.log("control collection call watch", value);
    // },
    templateInfo(value) {
      TemplateAPI.getTemplateDoc({ doc: value.path }).then((response) => {
        this.pdfFile = response.data;
      });
    },
    showSignerOrder(newValue) {
      var manager_Switch = document.getElementsByClassName(
        "wvs-design-control-header"
      );
      var controlLayout = document.getElementsByClassName("wrapper-control");
      var signerLayout = document.getElementsByClassName("signer-order");
      // console.log(
      //   "signerOrderElement",
      // );
      if (newValue === true) {
        manager_Switch[0].firstChild.style.borderBottom = "3px solid #cccccc";
        manager_Switch[0].lastChild.style.borderBottom = "3px solid #ffb84d";
        controlLayout[0].style.display = "none";
        signerLayout[0].style.display = "block";
      } else {
        manager_Switch[0].lastChild.style.borderBottom = "3px solid #cccccc";
        manager_Switch[0].firstChild.style.borderBottom = "3px solid #ffb84d";
        controlLayout[0].style.display = "block";
        signerLayout[0].style.display = "none";
      }
    },
  },
  // methods: {
  //   myEventHandler(e) {
  //     // your code for handling resize...
  //   }
  // }

  methods: {
    // resizeHandler(event) {
    //   // console.log("window resize", event);
    // },
    // parentMethods(argument) {
    //   console.log("parent method call !!", argument);
    // },
    onApprove(e) {
      console.log("ON APPROVE CALL !!!", e);
      this.userSigner.push(e);

      this.showControlSetting = false;
    },
    onReject() {
      console.log("ON REJECT CALL !!!");
      this.showControlSetting = false;
    },

    onHandleUpdateTemplate() {
      // this.templateID;
      // this.controlCollections;
      this.formData.id = this.templateID;
      this.formData.controls = this.controlCollections;
      console.log("FORM ID UPDATE", this.formData.id);
      console.log("FORM CONTROLS UPDATE", this.formData.controls);
      TemplateAPI.update(this.formData).then((response) => {
        console.log("UPDATE RESPONSE !!!", response);
        if (response.data.status === "success") {
          this.$swal({
            title: "Update Template Success ",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
        } else {
          this.$swal({
            title: "Update Template Fail ",
            icon: "error",
            timer: 2000,
            showConfirmButton: false,
          });
        }
      });
    },

    onGetFormInput(event, type, nameField) {
      switch (type) {
        case "VIDEO_CONTROL_FORM": {
          this.formDataInput.videoControl = {
            ...this.formDataInput.videoControl,
            [nameField]: event,
          };
          break;
        }
        default: {
          break;
        }
      }
    },
    onSubmitForm(event, type) {
      switch (type) {
        case "VIDEO_SIGNATURE": {
          this.dialogVideoField = false;
          if (
            !this.formDataInput.videoControl.phone &&
            this.DoubleFactor_Authenticate === false
          ) {
            console.log("Please Input Phone Field Of Video COntrol");
          }

          if (!this.formDataInput.videoControl.email) {
            console.log("Please Input Email Field Of Video Control");
          } else {
            // this.userSigner.push(this.formDataInput.videoControl.email);
            // this.userSigner = this.formDataInput.videoControl.email;
            // this.userSigner.push(this.formDataInput.videoControl.email);
            console.log("FLAG !!!");
            // this.userSigner = this.formDataInput.videoControl.email;
            this.userSigner.push(this.formDataInput.videoControl.email);
            // this.userSigner = this.formDataInput.videoControl.email;
            // this.userSigner({
            //   ...this.userSigner,
            //   user: this.userSigner,
            // });
            // console.log("USER SIGNER !!!", this.userSigner);

            // this.userSigner = this.formDataInput.videoControl.email;
            // var a = Object.assign(
            //   this.userSigner,
            //   this.formDataInput.videoControl.email
            // );
            // console.log("Aaa", a);
            // Object.assign(this.templateCreate, tempObject);
          }
        }
      }
    },
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
      this.$store.dispatch([
        // PdfAction.removeAllControlPDF(),
        this.$router.push({ path: "/" }),
      ]);

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
      var tempObject = {
        name: event,
        file: this.file,
        controls: this.controlCollections,
        // controls: JSON.stringify(this.controlCollections),
      };
      Object.assign(this.templateCreate, tempObject);
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
    },
    onCloseTemplate() {
      event.preventDefault();
      this.dialog = false;
    },
    onHandleEnableSignDoc() {
      this.enalbleSignDoc = false;
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
    onControlClick(event) {
      event.preventDefault();
      var element = event.target;
      var rect = this.toPageRect(element);
      this.selectControlRect = rect;
      this.selectControlElement = element;
    },

    onControlDoubleClick(event) {
      console.log("ON CONTROL DOUBLE CLICK CALL !!");

      // event.preventDefault();
      var target = event.target;
      // var typeControl = target.attributes.dataType.nodeValue;
      // var typeControl = target.getAttribute("data-type");
      var controlID = target.getAttribute("id");
      this.selectControlID = controlID;
      // var formDataControl = {
      //   id: controlID,
      //   type: typeControl,
      // };
      // this.$store.dispatch(ModalOrderAction.showModalOrder(formDataControl));
      // this.showControlSetting = true;
      this.showControlSetting = true;

      // switch (typeControl) {
      //   case "wvs-video": {

      //     this.dialogVideoField = true;
      //     break;
      //   }
      //   case "wvs-text": {
      //     this.dialogInputField = true;
      //     break;
      //   }

      //   case "wvs-check": {
      //     this.dialogInputField = true;

      //     break;
      //   }
      //   default: {
      //     break;
      //   }
      // }
    },
  },
};
</script>
 <style scoped src="./Template.css"></style>