<template>
  <div class="content-header">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6">
          <h1 class="m-0">Toplantı Şablonu Oluştur</h1>
        </div>
        <div class="col-sm-6">
          <ol class="breadcrumb float-sm-right">
            <li class="breadcrumb-item">
              <router-link to="/">Home</router-link>
            </li>
            <li class="breadcrumb-item active">Editor Template</li>
          </ol>
        </div>
      </div>
    </div>
  </div>

  <!-- Main content -->
  <section class="content">
    <div class="container-fluid">
      <!-- Small boxes (Stat box) -->
      <div class="row">
        <div class="col-12 text-center" id="contentButtons">
          <button
            class="btn btn-outline-secondary mx-2 my-2"
            @click="addContentToEditor($event)"
          >
            Ad Ekle
          </button>
          <button
            class="btn btn-outline-secondary mx-2 my-2"
            @click="addContentToEditor($event)"
          >
            Soyad Ekle
          </button>
          <button
            class="btn btn-outline-secondary mx-2 my-2"
            @click="addContentToEditor($event)"
          >
            Toplantı Tarihi Ekle
          </button>
          <button
            class="btn btn-outline-secondary mx-2 my-2"
            @click="addContentToEditor($event)"
          >
            Toplantı Saati Ekle
          </button>
          <button
            class="btn btn-outline-secondary mx-2 my-2"
            @click="addContentToEditor($event)"
          >
            Toplantı Yeri Ekle
          </button>
          <button
            class="btn btn-outline-secondary mx-2 my-2"
            @click="addContentToEditor($event)"
          >
            Toplantı Konusu Ekle
          </button>
        </div>
        <div class="col-12 my-2">
          <ckeditor
            :editor="editor"
            v-model="editorData"
            :config="editorConfig"
            @focus="onEditorFocus"
          ></ckeditor>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent, markRaw } from "vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default defineComponent({
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
        this.fireToast("Bir Alan Seçiniz", "error", 800);
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
        this.fireToast(
          `${targetElemContentArray.join(" ")} Başarıyla Eklendi.`,
          "success",
          800
        );
      }
    },
    fireToast(message, type, duration) {
      this.$toast.open({
        message: message,
        position: "top-right",
        type: type,
        duration: duration,
      });
    },
    resetAll() {
      this.clearEditorData();
      this.clearEditorContent();
      this.activeContentButtons();
    },
    clearEditorData() {
      this.editorData = "";
    },
    activeContentButtons() {
      const contentButtons = document.querySelectorAll("#contentButtons .btn");
      for (const contentButton of contentButtons) {
        contentButton.disabled = false;
      }
    },
  },
});
</script>
<style>
.ck-editor__editable_inline {
  min-height: 300px;
  width: 100%;
}
</style>