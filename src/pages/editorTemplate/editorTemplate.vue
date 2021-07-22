<template>
  <!-- Content Header (Page header) -->
  <div class="content-header">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6">
          <h1 class="m-0">Toplantı Şablonu Oluştur</h1>
        </div>
        <!-- /.col -->
        <div class="col-sm-6">
          <ol class="breadcrumb float-sm-right">
            <li class="breadcrumb-item">
              <router-link to="/">Home</router-link>
            </li>
            <li class="breadcrumb-item active">Editor Template</li>
          </ol>
        </div>
        <!-- /.col -->
      </div>
      <!-- /.row -->
    </div>
    <!-- /.container-fluid -->
  </div>
  <!-- /.content-header -->

  <!-- Main content -->
  <section class="content">
    <div class="container-fluid">
      <!-- Small boxes (Stat box) -->
      <div class="row">
        <div class="col-12 text-center" id="contentButtons">
          <button
            class="btn btn-outline-secondary mx-2 my-2"
            @click="addNameToEditorContent"
          >
            Yasal Ad Ekle
          </button>
          <button
            class="btn btn-outline-secondary mx-2 my-2"
            @click="addSurnameToEditorContent"
          >
            Yasal Soyad Ekle
          </button>
          <button
            class="btn btn-outline-secondary mx-2 my-2"
            @click="addGroupToEditorContent"
          >
            Yasal Grup Ekle
          </button>
          <button
            class="btn btn-outline-secondary mx-2 my-2"
            @click="addDateToEditorContent"
          >
            Tarih Ekle
          </button>
          <button
            class="btn btn-outline-secondary mx-2 my-2"
            @click="addTimeToEditorContent"
          >
            Saat Ekle
          </button>
          <button
            class="btn btn-outline-secondary mx-2 my-2"
            @click="addLocationToEditorContent"
          >
            Lokasyon Ekle
          </button>
          <button
            class="btn btn-outline-secondary mx-2 my-2"
            @click="addMeetingCodeToEditorContent"
          >
            Toplantı Kodu Ekle
          </button>
        </div>
        <div class="col-12 text-center">
          <button
            class="btn btn-outline-primary mx-2 my-2"
            @click="putContentsInEditor"
          >
            Döküman'a Aktar
          </button>
          <button
            class="btn btn-outline-danger mx-2 my-2"
            @click="resetAll"
          >
            Iptal Et
          </button>
        </div>
        <div class="col-12 my-2 vh-100">
          <ckeditor
            :editor="editor"
            v-model="editorData"
            :config="editorConfig"
          ></ckeditor>
        </div>
      </div>
      <!-- /.row -->
    </div>
    <!-- /.container-fluid -->
  </section>
  <!-- /.content -->
</template>

<script>
import { defineComponent } from "vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default defineComponent({
  data() {
    return {
      editor: ClassicEditor,
      editorData: "",
      editorContent: {
        introduction: "",
        body: "",
        result: "",
      },
      defaultContent: {
        introduction:
          " bilgileri dahilinde gerçekleştirilecek olan toplantıya ",
        body: " katılımınızı rica ederiz. ",
        result_1: ' Katılım için "KATIL" yazıp ',
        result_2: " 3184 sms yolla.",
      },
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
    addNameToEditorContent(e) {
      this.editorContent.introduction += "@Name ";
      this.$toast.open({
        message: "Yasal Ad Başarıyla Eklendi.",
        position: "top-right",
        type: "success",
        duration: 800,
      });
      e.target.disabled = true;
    },
    addSurnameToEditorContent(e) {
      this.editorContent.introduction += "@Surname ";
      this.$toast.open({
        message: "Yasal Soyad Başarıyla Eklendi.",
        position: "top-right",
        type: "success",
        duration: 800,
      });
      e.target.disabled = true;
    },
    addGroupToEditorContent(e) {
      this.editorContent.introduction += "@Group ";
      this.$toast.open({
        message: "Yasal Grup Başarıyla Eklendi.",
        position: "top-right",
        type: "success",
        duration: 800,
      });
      e.target.disabled = true;
    },
    addDateToEditorContent(e) {
      this.editorContent.body += "@Date ";
      this.$toast.open({
        message: "Tarih Başarıyla Eklendi.",
        position: "top-right",
        type: "success",
        duration: 800,
      });
      e.target.disabled = true;
    },
    addTimeToEditorContent(e) {
      this.editorContent.body += "@Time ";
      this.$toast.open({
        message: "Saat Başarıyla Eklendi.",
        position: "top-right",
        type: "success",
        duration: 800,
      });
      e.target.disabled = true;
    },
    addLocationToEditorContent(e) {
      this.editorContent.body += "@Location ";
      this.$toast.open({
        message: "Lokasyon Başarıyla Eklendi.",
        position: "top-right",
        type: "success",
        duration: 800,
      });
      e.target.disabled = true;
    },
    addMeetingCodeToEditorContent(e) {
      this.editorContent.result += "@Meeting Code ";
      this.$toast.open({
        message: "Toplantı Kodu Başarıyla Eklendi.",
        position: "top-right",
        type: "success",
        duration: 800,
      });
      e.target.disabled = true;
    },
    putContentsInEditor() {
      if (this.editorContent !== "") {
        this.editorData = this.editorContent.introduction + this.defaultContent.introduction + this.editorContent.body + this.defaultContent.body + this.defaultContent.result_1 + this.editorContent.result + this.defaultContent.result_2;
        this.clearEditorContent();
      }
    },
    resetAll(){
      this.clearEditorData();
      this.clearEditorContent();
      this.activeContentButtons();
    },  
    clearEditorData() {
      this.editorData = "";
    },
    clearEditorContent() {
      const editorContentObjKeys = Object.keys(this.editorContent);
      editorContentObjKeys.forEach((editorContentKey) => {
        this.editorContent[editorContentKey] = "";
      });
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
    min-height : 300px;
  }
</style>