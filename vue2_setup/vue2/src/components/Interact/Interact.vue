<template>
  <div class="interact-vue"></div>
</template>
<script>
import interact from "interactjs";

// const position = { x: 0, y: 0 };
// const controlA = document.getElementsByClassName("wvs-resizable");

//PROBLEM : HOW TO MAKE SURE CONTROL WAS RENDERED !!!!!
export default {
  name: "DragAndDropComponent",
  data() {
    return {
      showRuler: true,
      pdfLoaded: this.$store.state.PDFMutation.pdfLoaded,
      // controlAddonRender: this.$store.state.ControlMutation
      controlRendered: this.takeControlRenderedStatus,
    };
  },

  mounted() {
    console.log("PDF LOADED", this.pdfLoaded);
    //FIXME:

    // if (this.controlRendered === true) {
    //   const controlResizeReRender = document.getElementsByClassName(
    //     "wvs-resizable"
    //   );
    //   console.log("CONTROL RESIZE LENGTH", controlResizeReRender.length);
    //   // [].forEach.call(controlResizeReRender, (element) =>
    //   //   this.registerResize(element)
    //   // );
    // }
    this.initInteract();
    return () => this.unregisterDragDrop();
  },

  computed: {
    takeControlRenderedStatus() {
      return this.$store.state.PDFMutation.controlRendered;
    },
  },
  watch: {
    takeControlRenderedStatus(newValue) {
      console.log("NEW", newValue);
      console.log("PDFLOADED", this.pdfLoaded);
      const controlResizeReRender = document.getElementsByClassName(
        "wvs-resizable"
      );

      if (this.pdfLoaded === false && newValue === true) {
        console.log(
          "control resize rerender length ",
          controlResizeReRender.length
        );
      }
    },
  },

  props: ["dragItemClass", "dropItemClass"],

  methods: {
    unregisterDragDrop() {
      interact(`.${this.dragItemClass}`)
        .draggable(false)
        .resizable(false)
        .unset();
      interact(`.${this.dropItemClass}`).dropzone(false).unset();
      interact(`.${this.dragItemClass}`).resizable(false).unset();
    },
    removeRuler() {
      if (!this.showRuler) {
        return;
      }
      var rulerContainer = document.getElementById("ruler-container");
      if (rulerContainer) {
        rulerContainer.parentElement.removeChild(rulerContainer);
      }
    },
    drawRuler(dragElement, dropzone) {
      if (!this.showRuler) {
        return;
      }

      if (!dropzone) {
        dropzone = document.getElementById("ruler-container");
      }
      if (!dropzone) {
        return;
      }
      const lineWidth = 1;
      var dropZoneRect = dropzone.getBoundingClientRect();
      var dragItemRect = dragElement.getBoundingClientRect();
      // var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      var line1 = document.getElementById("v-left");
      var line2 = document.getElementById("v-right");
      var line3 = document.getElementById("h-top");
      var line4 = document.getElementById("h-bottom");

      // console.log(dropZoneRect)

      // line1.setAttribute('id', 'v-left');
      line1.setAttribute("x1", Math.abs(dragItemRect.left - dropZoneRect.left));
      line1.setAttribute("y1", 0);
      line1.setAttribute("x2", Math.abs(dragItemRect.left - dropZoneRect.left));
      line1.setAttribute("y2", dropZoneRect.height);

      // line2.setAttribute('id', 'v-right');
      line2.setAttribute(
        "x1",
        Math.abs(dragItemRect.left - dropZoneRect.left) +
          dragItemRect.width -
          lineWidth
      );
      line2.setAttribute("y1", 0);
      line2.setAttribute(
        "x2",
        Math.abs(dragItemRect.left - dropZoneRect.left) +
          dragItemRect.width -
          lineWidth
      );
      line2.setAttribute("y2", dropZoneRect.height);

      // line3.setAttribute('id', 'h-top');
      line3.setAttribute("x1", 0);
      line3.setAttribute(
        "y1",
        Math.abs(dragItemRect.top - dropZoneRect.top) + lineWidth
      );
      line3.setAttribute("x2", dropZoneRect.right);
      line3.setAttribute(
        "y2",
        Math.abs(dragItemRect.top - dropZoneRect.top) + lineWidth
      );

      // line4.setAttribute('id', 'h-bottom');
      line4.setAttribute("x1", 0);
      line4.setAttribute(
        "y1",
        Math.abs(dragItemRect.top - dropZoneRect.top) + dragItemRect.height
      );
      line4.setAttribute("x2", dropZoneRect.right);
      line4.setAttribute(
        "y2",
        Math.abs(dragItemRect.top - dropZoneRect.top) + dragItemRect.height
      );
    },
    // ***** FUNCTION CREATE RULERS ******
    createRulers(dragElement, dropzone) {
      if (!this.showRuler) {
        console.debug("show Ruleres (1)");
        return;
      }
      if (document.getElementById("ruler-container")) {
        console.debug("show Rulers (2)");

        return;
      }
      var dropZoneRect = dropzone.getBoundingClientRect();
      //TODO: WHAT IS GET BOUDING CLIENT RECT !!!
      var dragItemRect = dragElement.getBoundingClientRect();
      var svgElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );

      //Create Empty SVG Element !!!

      var line1 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      var line2 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      var line3 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      var line4 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );

      const lineWidth = 1,
        dashLength = 5,
        lineColor = "blue";

      //THIS IS CREATE RULER FOR DRAG ITEM !!!

      svgElement.setAttribute("id", "ruler-container");
      svgElement.setAttribute("top", dropZoneRect.top);
      svgElement.setAttribute("left", dropZoneRect.left);
      svgElement.setAttribute("width", dropZoneRect.width);
      svgElement.setAttribute("height", dropZoneRect.height);
      svgElement.style.setProperty("background-color", "rgba(0,255,0,0.1)");
      svgElement.style.setProperty("z-index", 1);

      line1.setAttribute("id", "v-left");
      line1.setAttribute("x1", dragItemRect.left + lineWidth);
      line1.setAttribute("y1", 0);
      line1.setAttribute("x2", dragItemRect.left + lineWidth);
      line1.setAttribute("y2", dropZoneRect.bottom);
      line1.setAttribute("stroke", lineColor);
      line1.setAttribute("stroke-width", lineWidth + "px");
      line1.setAttribute("stroke-dasharray", dashLength);
      line1.setAttribute("shape-rendering", "crispEdges");

      line2.setAttribute("id", "v-right");
      line2.setAttribute("x1", dragItemRect.right - lineWidth * 2);
      line2.setAttribute("y1", 0);
      line2.setAttribute("x2", dragItemRect.right - lineWidth * 2);
      line2.setAttribute("y2", dropZoneRect.bottom);
      line2.setAttribute("stroke", lineColor);
      line2.setAttribute("stroke-width", lineWidth + "px");
      line2.setAttribute("stroke-dasharray", dashLength);
      line2.setAttribute("shape-rendering", "crispEdges");

      line3.setAttribute("id", "h-top");
      line3.setAttribute("x1", 0);
      line3.setAttribute("y1", dragItemRect.top + lineWidth);
      line3.setAttribute("x2", dropZoneRect.right);
      line3.setAttribute("y2", dragItemRect.top + lineWidth);
      line3.setAttribute("stroke", lineColor);
      line3.setAttribute("stroke-width", lineWidth + "px");
      line3.setAttribute("stroke-dasharray", dashLength);
      line3.setAttribute("shape-rendering", "crispEdges");

      line4.setAttribute("id", "h-bottom");
      line4.setAttribute("x1", 0);
      line4.setAttribute("y1", dragItemRect.bottom - lineWidth);
      line4.setAttribute("x2", dropZoneRect.right);
      line4.setAttribute("y2", dragItemRect.bottom - lineWidth);
      line4.setAttribute("stroke", lineColor);
      line4.setAttribute("stroke-width", lineWidth + "px");
      line4.setAttribute("stroke-dasharray", dashLength);
      line4.setAttribute("shape-rendering", "crispEdges");

      const step = 10;
      const lineLen = 15;
      const rulerLineColor = "white";
      // draw ruler background
      var horzRulerBg = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect"
      );
      horzRulerBg.setAttribute("width", dropZoneRect.width);
      horzRulerBg.setAttribute("height", lineLen + 1);
      horzRulerBg.style.setProperty("fill", "rgba(0,0,0, 0.5)");
      svgElement.appendChild(horzRulerBg);
      var verzRulerBg = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect"
      );
      verzRulerBg.setAttribute("width", lineLen + 1);
      verzRulerBg.setAttribute("height", dropZoneRect.height);
      verzRulerBg.style.setProperty("fill", "rgba(0,0,0, 0.5)");
      svgElement.appendChild(verzRulerBg);

      for (var i = 0; i < dropZoneRect.width; i += step) {
        var horzRuler = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );
        horzRuler.setAttribute("x1", i + lineLen);
        horzRuler.setAttribute("y1", i % 100 === 0 ? 0 : i % 50 == 0 ? 5 : 10);
        horzRuler.setAttribute("x2", i + lineLen);
        horzRuler.setAttribute("y2", lineLen);
        horzRuler.setAttribute("stroke", rulerLineColor);
        horzRuler.setAttribute("stroke-width", lineWidth + "px");
        horzRuler.setAttribute("shape-rendering", "crispEdges");
        svgElement.appendChild(horzRuler);
        if (i % 100 === 0 && i !== 0) {
          var label = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text"
          );
          label.setAttribute("x", i + lineLen + 2);
          label.setAttribute("y", 9);
          label.setAttribute("font-size", "9px");
          label.setAttribute("fill", "#ff0");
          label.textContent = i + "";
          svgElement.appendChild(label);
        }
      }
      //WARNING I
      for (i = 0; i < dropZoneRect.height; i += step) {
        var verzRuler = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );
        verzRuler.setAttribute("x1", i % 100 === 0 ? 0 : i % 50 == 0 ? 5 : 10);
        verzRuler.setAttribute("y1", i + lineLen);
        verzRuler.setAttribute("x2", lineLen);
        verzRuler.setAttribute("y2", i + lineLen);
        verzRuler.setAttribute("stroke", rulerLineColor);
        verzRuler.setAttribute("stroke-width", lineWidth + "px");
        verzRuler.setAttribute("shape-rendering", "crispEdges");
        svgElement.appendChild(verzRuler);
        if (i % 100 === 0 && i !== 0) {
          label = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text"
          );
          // WARNING LABEL
          label.setAttribute("x", 1);
          label.setAttribute("y", i + lineLen - 2);
          label.setAttribute("font-size", "9px");
          label.setAttribute("fill", "#ff0");
          label.textContent = i + "";
          svgElement.appendChild(label);
        }
      }
      svgElement.appendChild(line1);
      svgElement.appendChild(line2);
      svgElement.appendChild(line3);
      svgElement.appendChild(line4);
      dropzone.appendChild(svgElement);
    },
    // ***** FUNCTION CREATE RULERS ******

    // **************** FUNCTION HANDLE RESIZE DRAG ITEM ***********
    resizeStartHandler(event) {
      // this.drawRuler(event.target);

      this.createRulers(event.target, event.target.parentElement);
    },
    resizeMoveHandler(event) {
      console.log("RESIZE MOVEEE !!!!!");
      var target = event.target,
        x = parseFloat(target.getAttribute("data-x")) || 0,
        y = parseFloat(target.getAttribute("data-y")) || 0;

      // update the element's style
      target.style.width = event.rect.width + "px";
      target.style.height = event.rect.height + "px";
      this.$parent.onDragControlHandleDND(target);

      // translate when resizing from top or left edges
      x += event.deltaRect.left;
      y += event.deltaRect.top;

      target.style.webkitTransform = target.style.transform =
        "translate(" + x + "px," + y + "px)";

      target.setAttribute("data-x", x);
      target.setAttribute("data-y", y);

      // onResizeMove(target);

      // calculate drag element rect
      var dragItemRect = target.getBoundingClientRect();
      var dropZoneRect = target.parentElement.getBoundingClientRect();
      var offsetRect = { left: 0, top: 0, right: 0, bottom: 0 };
      offsetRect.left = Math.abs(dragItemRect.left - dropZoneRect.left);
      offsetRect.top = Math.abs(dragItemRect.top - dropZoneRect.top);
      offsetRect.right = offsetRect.left + dragItemRect.width;
      offsetRect.bottom = offsetRect.top + dragItemRect.height;
      offsetRect.width = dragItemRect.width;
      offsetRect.height = dragItemRect.height;

      this.drawRuler(target);
    },
    resizeEndHandler(event) {
      console.log("RESIZE END CALL !!");
      // removeRulers();
      this.removeRuler();
      var dropElement = event.target;
      var dropZone = event.target.parentNode;
      var dragItemRect = dropElement.getBoundingClientRect();
      var dropZoneRect = dropZone.getBoundingClientRect();
      var offsetRect = {
        left: Math.abs(dragItemRect.left - dropZoneRect.left),
        top: Math.abs(dragItemRect.top - dropZoneRect.top),
        right:
          Math.abs(dragItemRect.left - dropZoneRect.left) + dragItemRect.width,
        bottom:
          Math.abs(dragItemRect.top - dropZoneRect.top) + dragItemRect.height,
        width: dragItemRect.width,
        height: dragItemRect.height,
      };

      dropElement.style.top = offsetRect.top + "px";
      dropElement.style.left = offsetRect.left + "px";
      dropElement.style.width = offsetRect.width + "px";
      dropElement.style.height = offsetRect.height + "px";
      dropElement.style.margin = "0px";
      dropElement.setAttribute("data-x", 0);
      dropElement.setAttribute("data-y", 0);
      dropElement.style.webkitTransform = dropElement.style.transform = "";

      var pageNo = parseInt(dropZone.parentElement.getAttribute("data-index"));
      var controlInfo = {
        id: dropElement.id,
        type: dropElement.getAttribute("data-type"),
        pageNo: pageNo,
        deviceRect: offsetRect,
      };
      this.$parent.onControlResized(controlInfo);
      // onResize(controlInfo, dropElement);
      // move element to drop zone

      // Get page number
      // var pageNo = parseInt(dropZone.parentElement.getAttribute("data-index"));
      // var controlInfo = {
      //   id: dropElement.id,
      //   type: dropElement.getAttribute("data-type"),
      //   pageNo: pageNo,
      //   deviceRect: offsetRect,
      // };
    },
    registerResize(element) {
      interact(element)
        .draggable({
          inertia: true,
          snap: {
            targets: [interact.createSnapGrid({ x: 1, y: 1 })],
          },
          onstart: this.dragStartHandler,
          onmove: this.dragMoveHandler,
          onend: this.dragEndHandler,
        })
        .resizable({
          // preserveAspectRatio: true,
          margin: 5,
          edges: { left: true, right: true, bottom: true, top: true },
          inertia: true,
        })
        .on("resizestart", this.resizeStartHandler)
        .on("resizemove", this.resizeMoveHandler)
        .on("resizeend", this.resizeEndHandler)
        .on("up", (event) => {
          console.log(event);
        });
    },
    // **************** FUNCTION HANDLE RESIZE DRAG ITEM ***********

    // ****************** FUNCTION HANDLE EVENT DRAG******************
    // dragStartHandler: (event) => {
    //   console.log("drag start", event);
    // },

    onDragEnterHandler(event) {
      var draggableElement = event.relatedTarget,
        dropzoneElement = event.target;
      this.createRulers(draggableElement, dropzoneElement);
    },
    dragStartHandler(event) {
      // when can't clone drag item => stop drag
      if (event.target && event.target.classList.contains(this.dragItemClass)) {
        event.interaction.stop();
      }
    },

    dragMoveHandler(event) {
      var target = event.target;
      // keep the dragged position in the data-x/data-y attributes
      var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
      var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

      target.style.webkitTransform = target.style.transform =
        "translate(" + x + "px, " + y + "px)";
      // update the posiion attributes
      target.setAttribute("data-x", x);
      target.setAttribute("data-y", y);

      this.$parent.onDragControlHandleDND(target);

      if (event.dropzone && this.showRuler) {
        this.drawRuler(event.target);
      }
    },

    dragEndHandler(event) {
      if (!event.relatedTarget) {
        // remove previous clone item from its parent when it's not drop on expected drop zone
        var container = event.target.parentNode;
        container.removeChild(event.target);
      } else {
        // this.$parent.parentMethods("hahaha");
        this.removeRuler();
      }

      // else {
      //   removeRulers(event.dropzone);
      // }
    },

    // ****************** FUNCTION HANDLE EVENT DRAG******************

    // ****************** FUNCTION HANDLE EVENT DROP******************

    onDragLeaveHandler() {
      this.removeRuler();
    },

    onDropHandler(event) {
      var dropElement = event.relatedTarget;
      var dropZone = event.target;
      var dragItemRect = dropElement.getBoundingClientRect();
      var dropZoneRect = dropZone.getBoundingClientRect();
      var offsetRect = {
        left: Math.abs(dragItemRect.left - dropZoneRect.left),
        top: Math.abs(dragItemRect.top - dropZoneRect.top),
        right:
          Math.abs(dragItemRect.left - dropZoneRect.left) + dragItemRect.width,
        bottom:
          Math.abs(dragItemRect.top - dropZoneRect.top) + dragItemRect.height,
        width: dragItemRect.width,
        height: dragItemRect.height,
      };
      dropElement.style.top = offsetRect.top + "px";
      dropElement.style.left = offsetRect.left + "px";
      dropElement.style.width = offsetRect.width + "px";
      dropElement.style.height = offsetRect.height + "px";
      dropElement.style.margin = "0px";
      dropElement.setAttribute("data-x", 0);
      dropElement.setAttribute("data-y", 0);
      dropElement.style.webkitTransform = dropElement.style.transform = "";
      // move element to drop zone
      event.target.appendChild(dropElement);

      var pageNo = parseInt(dropZone.parentElement.getAttribute("data-index"));
      var controlInfo = {
        id: dropElement.id,
        type: dropElement.getAttribute("data-type"),
        pageNo: pageNo,
        deviceRect: offsetRect,
      };

      if (typeof dropElement.id != "undefined") {
        this.registerResize(dropElement);
        dropElement.addEventListener("click", this.onControlItemClick);
        dropElement.addEventListener(
          "dblclick",
          this.$parent.onControlDoubleClick
        );
        //This place to add event click for control
      }
      // this.$parent.onDropHanle(controlInfo, dropElement);
      this.$parent.onDropControlHandleDND(controlInfo, dropElement);
      // onDrop(controlInfo, dropElement);
    },
    // ****************** FUNCTION HANDLE EVENT DROP******************
    onControlItemClick(event) {
      var elementList = document.querySelectorAll(".control-item");
      for (var i = 0; i < elementList.length; i++) {
        elementList[i].classList.remove("active");
      }
      event.target.classList.add("active");
      this.$parent.onControlClick(event);
      // controlsEventHandlers.onClick(event);
    },
    // ************** FUNCTION INITIAL INTERACT **************
    initInteract() {
      var dndListener = {
        inertia: true,
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: this.dropItemClass,
            endOnly: true,
          }),
        ],
        onstart: this.dragStartHandler,
        onmove: this.dragMoveHandler,
        onend: this.dragEndHandler,
      };

      // TODO:This is listen for the parent element controll but not listen for clone child control
      interact(`.${this.dragItemClass}`)
        .draggable(dndListener)
        .on("move", (event) => {
          var interaction = event.interaction;
          //MAKE SURE CLONE OBJECT CREATED
          if (interaction.pointerIsDown && !interaction.interacting()) {
            console.log("draggable move !!!");
            var original = event.currentTarget,
              clone = event.currentTarget.cloneNode(true);
            clone.style.position = "absolute";
            clone.style.setProperty("z-index", "101");
            clone.style.left = event.currentTarget.offsetLeft + "px";
            clone.style.top = event.currentTarget.offsetTop + "px";
            clone.classList.remove(this.dragItemClass);
            console.log("CLONE OBJECT", clone);
            // clone.classList.remove(this.dragItemClass);
            //APPEND FUNCTION FOR CLONE ELEMENT
            original.parentNode.appendChild(clone);
            //REGISTER EVENT DRAG FOR CLONE ELEMENT
            interaction.start({ name: "drag" }, event.interactable, clone);
          }
        });

      // ***** DRAGGABLE *****

      // ***** DROPABLE *****

      var dropzoneEventListener = {
        overlap: 1,
        // ondropactivate: onDropActivateHandler,
        ondragenter: this.onDragEnterHandler,
        // ondragleave: onDragLeaveHandler,
        ondrop: this.onDropHandler,
        ondragleave: this.onDragLeaveHandler,

        // ondropdeactivate: onDropDeactivate,
      };
      interact(`.${this.dropItemClass}`).dropzone(dropzoneEventListener);
      // ***** DROPABLE *****
    },

    // ************** FUNCTION INITIAL INTERACT **************
  },
};
</script>
