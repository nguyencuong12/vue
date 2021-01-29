<template>
  <!-- <div ref="viewer" class="viewer-container"> -->
  <div id="pdf-viewer"></div>
  <!-- </div> -->
</template>
<script>
import {
  PDFViewer,
  ScrollWrap,
  Events,
} from "../../foxit-lib/PDFViewCtrl.full";
import { licenseSN, licenseKey } from "../../license-key";
// import { PDFViewer } from "../../foxit-lib/PDFViewCtrl.full";
import {
  PdfAction,
  // RenderControlAction,
} from "../../vuex/actions";
import { PDFHelper } from "../../components/WVS/PDFHelper";

export default {
  mounted: function () {
    var pdfview = this.initPDFView();
    this.pdfViewer = pdfview;
    this.registerPdfViewerEvents(pdfview, this.controls);
    // pdfview.openPDFByFile(this.file);
    this.PDFFile = this.file;

    // console.log("LOAD", this.pdfLoaded);
    // console.log("CONTROL", this.controls);
    // console.log("LOAD", this.$store.state);
    // if (this.pdfLoaded && this.controls.length > 0) {
    //   console.log("THIS PLACE TO RENDER CONTROL EDIT PAGE");
    // }
  },
  data() {
    // const a = "11";
    return {
      // testControl: [],
      currentPage: 0,
      pdfViewer: null,
      PDFFile: null,
      pdfLoaded: this.takePDFLoaderMutation,
      controls: this.control,
    };
  },

  props: ["file", "viewerContainer", "control"],

  created() {
    window.addEventListener("resize", this.windowResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.windowResize);
  },

  computed: {
    //THE SAME VARIABLE
    takePDFLoaderMutation() {
      return this.$store.state.PDFMutation.pdfLoaded;
    },
  },
  watch: {
    takePDFLoaderMutation(newValue) {
      if (newValue === false && this.controls.length > 0) {
        console.log("RENDER CONTROL EDIT");
        this.$store.dispatch([
          PdfAction.startRenderWVSControls(),
          this.renderAddonControl(),
          PdfAction.endRenderWVSControls(),
        ]);
      }
    },

    PDFFile() {
      this.$store.dispatch([
        PdfAction.startLoading(),
        // PdfAction.startRenderWVSControls(),
        this.pdfViewer.openPDFByFile(this.PDFFile).then(() => {
          this.$store.dispatch(PdfAction.endLoading());
        }),
      ]);
    },
  },
  methods: {
    initPDFView() {
      // var container = document.getElementsByClassName("viewer-container");
      let container = document.getElementById(this.viewerContainer);
      var pdfview = new PDFViewer({
        libPath: "../../foxit-lib",
        jr: {
          licenseSN: licenseSN,
          licenseKey: licenseKey,
        },
        customs: {
          ScrollWrap: class CustomScrollWrap extends ScrollWrap {
            constructor(viewerRender) {
              super(viewerRender);
            }
            getScrollHost() {
              return container;
            }
            getScrollOffsetTop() {
              return this.viewerRender.$ui[0].offsetTop;
            }
            getScrollOffsetLeft() {
              return this.viewerRender.$ui[0].offsetLeft;
            }
            getWidth() {
              return container.offsetWidth - 30;
            }
            getHeight() {
              return container.offsetHeight;
            }
            getScrollTop() {
              return container.scrollTop;
            }
            getScrollLeft() {
              return container.scrollLeft;
            }
          },
        },
      });

      pdfview.init("#pdf-viewer");
      this.$parent.onInitSuccess(pdfview);
      return pdfview;
    },

    async rerenderAddonControl(pdfView, controls) {
      for (var control of controls) {
        var pageRender = pdfView.getPDFPageRender(control.pageNo);
        var controlRect = await PDFHelper.toDeviceRect(
          pageRender,
          control.pageRect,
          controls.scale
        );
        //caculator coordinate of control using SDK!!!
        var div = document.getElementById(control.id);
        if (div) {
          div.style.top = controlRect.top + "px";
          div.style.left = controlRect.left + "px";
          div.style.width = controlRect.right - controlRect.left + "px";
          div.style.height = controlRect.bottom - controlRect.top + "px";
        }
      }
    },
    onControlItemClick(event) {
      var elementList = document.querySelectorAll(".control-item");
      for (var i = 0; i < elementList.length; i++) {
        elementList[i].classList.remove("active");
      }
      event.target.classList.add("active");
      // onControlClick
      this.$parent.onControlClick(event);
    },
    async renderAddonControl() {
      //FIXME:
      for (var control of this.controls) {
        var pageRender = this.pdfViewer.getPDFPageRender(control.pageNo);
        var parentElement = this.getParentElementByPageNo(control.pageNo);

        if (parentElement) {
          var controlRect = await PDFHelper.toDeviceRect(
            pageRender,
            control.pageRect,
            this.controls.scale
            // this.controls.scale
          );
          var div = document.createElement("div");
          div.classList.add("control-item");
          div.classList.add("wvs-resizable");

          /// <<<<<<<<<<<<<<<<<<<<<<<<<<  Why when create control-item not inheritance style of template-edit page !!!! >>>>>>>>>>>>>>>>>>>>>>
          // div.classList.add("wvs-resizable");
          div.style.overflow = "hidden";
          div.setAttribute("id", control.id);
          div.setAttribute("data-type", control.type);
          div.style.position = "absolute";
          div.style.top = controlRect.top + "px";
          div.style.left = controlRect.left + "px";
          div.style.width = controlRect.right - controlRect.left + "px";
          div.style.height = controlRect.bottom - controlRect.top + "px";
          console.debug("renderAddonControl CALL");
          div.addEventListener("dblclick", this.$parent.onControlDoubleClick);
          div.addEventListener("click", this.onControlItemClick);
          var icon = document.createElement("i");
          var type = div.getAttribute("data-type");
          switch (type) {
            case "wvs-text": {
              icon.style.pointerEvents = "none";
              icon.classList.add("notranslate");
              icon.classList.add("mdi");
              icon.classList.add("mdi-sign-text");
              icon.classList.add("theme--light");
              icon.classList.add("white--text");
              icon.classList.add("text--darken-2");
              icon.setAttribute("v-text", "mdi-sign-text");
              break;
            }
            case "wvs-check": {
              icon.style.pointerEvents = "none";
              icon.classList.add("notranslate");
              icon.classList.add("mdi");
              icon.classList.add("mdi-check-circle");
              icon.classList.add("theme--light");
              icon.classList.add("white--text");
              icon.classList.add("text--darken-2");
              icon.setAttribute("v-text", "mdi-check-circle");
              break;
            }
            case "wvs-video": {
              icon.style.pointerEvents = "none";
              icon.classList.add("notranslate");
              icon.classList.add("mdi");
              icon.classList.add("mdi-video-image");
              icon.classList.add("theme--light");
              icon.classList.add("white--text");
              icon.classList.add("text--darken-2");
              icon.setAttribute("v-text", "mdi-video-image");
              break;
            }
            default: {
              return null;
            }
          }
          icon.style.fontSize = "36px";
          div.appendChild(icon);
          parentElement.appendChild(div);
          // >>>>>>>>>>>>>>>>>> THIS IS TEST !!!!!! >>>>>>>>>>>>>>>>>>
          // this.$store.dispatch(RenderControlAction.renderControl(div));
          // this.$store.dispatch(RenderControlAction.renderControl(div));
        }
        // this.$store.dispatch(RenderControlAction.renderControl(div));
      }
    },

    // ******* This is event trigger when pdfview resize and redraw*******
    windowResize() {
      this.pdfViewer.redraw(true);
    },
    getParentElementByPageNo(pageNo) {
      // var elementList = document.querySelectorAll(".fv__pdf-page-handler-container");
      var elementList = document.querySelectorAll(".fv__pdf-page-layout");
      if (!elementList) return null;

      for (var i = 0; i < elementList.length; i++) {
        // var targetPageNo = parseInt(elementList[i].parentElement.getAttribute("data-index"));
        var targetPageNo = parseInt(elementList[i].getAttribute("data-index"));
        if (targetPageNo === pageNo) {
          // elementList[i].style.setProperty("z-index", 20);
          return elementList[i];
        }
      }
    },

    registerPdfViewerEvents(pdfViewer, controls) {
      const parentComponent = this.$parent;
      const parentFunction = this;
      // var renderControl = this.renderAddonControl;
      pdfViewer.getEventEmitter().on(Events.openFileSuccess, function (doc) {
        this.currentPage = 0;
        parentComponent.onOpenSuccess(doc);
        // this.rerenderAddonControl();
      });
      pdfViewer
        .getEventEmitter()
        .on(Events.renderPageSuccess, function (render) {
          parentComponent.onRenderPageSuccess(render);
          parentFunction.rerenderAddonControl(pdfViewer || {}, controls || []);
        });

      // pdfViewer
      //   .getEventEmitter()
      //   .on(Events.pageLayoutRedraw, function (render) {
      //     console.log("page layout redraw", render);
      //   });
      pdfViewer
        .getEventEmitter()
        .on(Events.zoomToSuccess, function (newScale, oldScale) {
          console.log("Scale", oldScale, newScale);
        });

      pdfViewer
        .getEventEmitter()
        .on(Events.pageNumberChange, function (newPageNumber) {
          // setCurrentPageNo(newPageNumber - 1);
          this.currentPage = newPageNumber - 1;
          // onCurrentPageChange(newPageNumber - 1);
        });
    },
  },
};
</script>
 <style  src="../../views/Template/Template.css"></style>'
<style scoped src="./PDFView.css"></style>
