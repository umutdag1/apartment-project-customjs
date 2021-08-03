<template>
  <div :class="wysiwygProps.encapsulationElem.class">
    <ckeditor
      :editor="editor"
      v-model.lazy="editorData"
      :config="editorConfig"
      @focus="onEditorFocus"
    ></ckeditor>
  </div>
</template>

<script>
import { defineComponent, markRaw } from "vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default defineComponent({
  props: {
    wysiwygProps: {
      required: true,
      type: Object,
    },
    addButtonContentToWysiwyg: {
      required: false,
      type: PointerEvent,
    },
  },
  data() {
    return {
      editor: ClassicEditor,
      editorData: "",
      tempFocusEditor: null,
      positionOfCursorInEditor: null,
      editorConfig: {
        toolbar: {
          items: [
            "heading",
            "bold",
            "italic",
            "link",
            "undo",
            "redo",
            "|",
            "bulletedList",
            "numberedList",
          ],
        },
      },
    };
  },
  methods: {
    onEditorFocus(event, editor) {
      this.tempFocusEditor = markRaw(editor);
    },
    addContentToEditor(e) {
      if (this.tempFocusEditor === null) {
        this.$store.dispatch("fireToast", {
          message: "Bir Alan Seçiniz",
          type: "error",
          duration: 800,
        });
      } else {
        const targetElemContentArray = e.target.innerText.split(" ");
        targetElemContentArray.splice(targetElemContentArray.length - 1, 1);
        this.tempFocusEditor.model.change((writer) => {
          writer.insertText(
            ` @${targetElemContentArray.join("")} `,
            { bold: true },
            this.tempFocusEditor.model.document.selection.getFirstPosition()
          );
          this.tempFocusEditor.setData(this.tempFocusEditor.getData());
        });
        this.$store.dispatch("fireToast", {
          message: `${targetElemContentArray.join(" ")} Başarıyla Eklendi.`,
          type: "success",
          duration: 800,
        });
      }
    },
    resetAll() {
      this.clearEditorData();
    },
    clearEditorData() {
      this.editorData = "";
    },
  },
  watch: {
    editorData(data) {
      this.$emit("editorData", data);
    },
    addButtonContentToWysiwyg(buttonEvent) {
      this.addContentToEditor(buttonEvent);
    },
    wysiwygProps : {
      handler(val){
        this.editorData = val.editorData;
      }
    }
  },
});
</script>

<style>
.ck-editor__editable_inline {
  min-height: 300px;
  width: 100%;
}
</style>