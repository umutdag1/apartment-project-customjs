<template>
  <div class="content-header">
    <div class="container-fluid">
      <app-header-component :headerObj="content.header"></app-header-component>
    </div>
  </div>
  <section class="content">
    <div class="container-fluid">
      <form @submit.prevent="save" ref="form">
        <div class="row">
          <app-input-component
            :inputProps="content.inputGroupForAddTemplate"
            @userInput="userInput = $event"
          ></app-input-component>

          <app-button-component
            :buttonProps="content.buttonGroupForAddContentToEditor"
            @addContentToEditor="buttonEventToAddItsContent = $event"
          ></app-button-component>

          <app-editor-component
            :wysiwygProps="content.wysiwygProps"
            :addButtonContentToWysiwyg="buttonEventToAddItsContent"
            @editorData="editor.data = $event"
          ></app-editor-component>

          <app-button-component
            :buttonProps="content.buttonGroupForAddTemplate"
            @goBackPage="$store.dispatch('changePage', null)"
            @save="saveStatus = 0"
            @goNextPage="$store.dispatch('changePage', 'createMeeting')"
            @saveAndnextPage="saveStatus = 1"
          ></app-button-component>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { defineComponent } from "vue";
import AppHeaderComponent from "@/components/Header/AppHeader.vue";
import AppInputComponent from "@/components/Content/Form/AppInput.vue";
import AppButtonComponent from "@/components/Content/UI/AppButton.vue";
import AppEditorComponent from "@/components/Content/Form/AppEditor.vue";

export default defineComponent({
  components: {
    AppHeaderComponent,
    AppInputComponent,
    AppButtonComponent,
    AppEditorComponent,
  },
  data() {
    return {
      saveStatus: 0,
      buttonEventToAddItsContent: new PointerEvent(""),
      content: {
        header: {
          name: "Şablon Oluştur",
        },
        buttonGroupForAddContentToEditor: {
          buttons: [
            {
              class: "btn btn-outline-secondary mx-2 my-2",
              type: "button",
              clickEvent: "addContentToEditor",
              innerHtml: "Ad Ekle",
            },
            {
              class: "btn btn-outline-secondary mx-2 my-2",
              type: "button",
              clickEvent: "addContentToEditor",
              innerHtml: "Soyad Ekle",
            },
            {
              class: "btn btn-outline-secondary mx-2 my-2",
              type: "button",
              clickEvent: "addContentToEditor",
              innerHtml: "Toplantı Tarihi Ekle",
            },
            {
              class: "btn btn-outline-secondary mx-2 my-2",
              type: "button",
              clickEvent: "addContentToEditor",
              innerHtml: "Toplantı Saati Ekle",
            },
            {
              class: "btn btn-outline-secondary mx-2 my-2",
              type: "button",
              clickEvent: "addContentToEditor",
              innerHtml: "Toplantı Yeri Ekle",
            },
            {
              class: "btn btn-outline-secondary mx-2 my-2",
              type: "button",
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
              type: "button",
              clickEvent: "goBackPage",
              innerHtml: "Geri Dön",
            },
            {
              class: "btn btn-block btn-info my-2 mr-3",
              type: "submit",
              clickEvent: "save",
              innerHtml: "Kaydet",
            },
            {
              class: "btn btn-block btn-primary my-2 mr-3",
              type: "button",
              clickEvent: "goNextPage",
              innerHtml: "Devam Et",
            },
            {
              class: "btn btn-block btn-success my-2",
              type: "submit",
              clickEvent: "saveAndnextPage",
              innerHtml: "Kaydet ve Devam Et",
            },
          ],
          encapsulationElem: {
            class:
              "col-12 d-flex justify-content-center align-items-center overflow-auto",
          },
        },
        inputGroupForAddTemplate: {
          content: [
            {
              attribute: {
                type: "text",
                targetType: null,
                required: true,
                pattern: "^([a-zA-Z0-9ğüşöçİĞÜŞÖÇ]|\\s)*$",
                invalidMessage: "Yalnızca Harf veya Rakam Kullanınız",
              },
              type: "text",
              name: "Şablon Adı",
              column: "template_name",
              icon: null,
            },
          ],
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
      this.$store.dispatch("fireToast", {
        message: "Şablon Başarıyla Eklendi.",
        type: "success",
        duration: 2000,
      });

      if (this.saveStatus === 1) {
        this.$store.dispatch("changePage", "createMeeting");
      }
    },
  },
});
</script>

<style>
</style>