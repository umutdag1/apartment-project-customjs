<template>
  <div class="content-header">
    <div class="container-fluid">
      <content-header-component
        :headerObj="content.header"
      ></content-header-component>
    </div>
  </div>
  <section class="content">
    <div class="container-fluid">
      <div class="row">
        <input-group-component
          :inputProps="content.inputGroupForAddTemplate"
          @userInput="userInput = $event"
        ></input-group-component>

        <button-group-component
          :buttonProps="content.buttonGroupForAddContentToEditor"
          @addContentToEditor="
            buttonEventToAddItsContent = $event
          "
        ></button-group-component>

        <wysiwyg-component
          :wysiwygProps="content.wysiwygProps"
          :addButtonContentToWysiwyg="buttonEventToAddItsContent"
          @editorData="editor.data = $event"
        ></wysiwyg-component>

        <button-group-component
          :buttonProps="content.buttonGroupForAddTemplate"
          @goBackPage="emitter.emit('goBackPage')"
          @save="save"
          @goNextPage="emitter.emit('goNextPage','editGroupUser')"
          @saveAndnextPage="saveAndnextPage"
        ></button-group-component>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent } from "vue";
import ContentHeaderComponent from "@/components/content/header/header.vue";
import InputGroupComponent from "@/components/content/content/mixed/custom/group/inputGroup.vue";
import ButtonGroupComponent from "@/components/content/content/mixed/custom/group/buttonGroup.vue";
import WysiwygComponent from "@/components/content/content/mixed/custom/wysiwyg/ckeditor.vue";

export default defineComponent({
  components: {
    ContentHeaderComponent,
    InputGroupComponent,
    ButtonGroupComponent,
    WysiwygComponent,
  },
  data() {
    return {
      buttonEventToAddItsContent: new PointerEvent(""),
      content: {
        header: {
          name: "Toplantı Şablonu Oluştur",
        },
        buttonGroupForAddContentToEditor: {
          buttons: [
            {
              class: "btn btn-outline-secondary mx-2 my-2",
              clickEvent: "addContentToEditor",
              innerHtml: "Ad Ekle",
            },
            {
              class: "btn btn-outline-secondary mx-2 my-2",
              clickEvent: "addContentToEditor",
              innerHtml: "Soyad Ekle",
            },
            {
              class: "btn btn-outline-secondary mx-2 my-2",
              clickEvent: "addContentToEditor",
              innerHtml: "Toplantı Tarihi Ekle",
            },
            {
              class: "btn btn-outline-secondary mx-2 my-2",
              clickEvent: "addContentToEditor",
              innerHtml: "Toplantı Saati Ekle",
            },
            {
              class: "btn btn-outline-secondary mx-2 my-2",
              clickEvent: "addContentToEditor",
              innerHtml: "Toplantı Yeri Ekle",
            },
            {
              class: "btn btn-outline-secondary mx-2 my-2",
              clickEvent: "addContentToEditor",
              innerHtml: "Toplantı Konusu Ekle",
            },
          ],
          encapsulationElem: {
            class: "col-12 text-center",
          },
        },
        buttonGroupForAddTemplate: {
          buttons: [
            {
              class: "btn btn-block btn-secondary my-2 mr-3",
              clickEvent: "goBackPage",
              innerHtml: "Geri Dön",
            },
            {
              class: "btn btn-block btn-info my-2 mr-3",
              clickEvent: "save",
              innerHtml: "Kaydet",
            },
            {
              class: "btn btn-block btn-primary my-2 mr-3",
              clickEvent: "goNextPage",
              innerHtml: "Devam Et",
            },
            {
              class: "btn btn-block btn-success my-2",
              clickEvent: "saveAndnextPage",
              innerHtml: "Kaydet ve Devam Et",
            },
          ],
          encapsulationElem: {
            class: "col-12 d-flex justify-content-center align-items-center",
          },
        },
        inputGroupForAddTemplate: {
          name: ["Şablon Adı"],
          encapsulationElem: {
            class: "col-12",
          },
        },
        wysiwygProps: {
          encapsulationElem: {
            class: "col-12 my-2",
          },
        },
      },
      userInput: {},
      editor: {
        data: "",
      },
    };
  },
  methods: {
    save() {
      this.emitter.emit("fireToast", [
        "Şablon Başarıyla Eklendi.",
        "success",
        2000,
      ]);
    },
    saveAndnextPage() {
      this.save();
      this.emitter.emit('goNextPage','editGroupUser');
    },
  }
});
</script>

<style>

</style>