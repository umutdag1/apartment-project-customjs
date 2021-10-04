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
          <app-form-component
            :formGroupProps="content.formGroupForSelectTemplate"
            @selectedOption="getOneTemplate($event)"
          >
          </app-form-component>

          <app-button-component
            :buttonProps="content.buttonGroupForAddContentToEditor"
            @addContentToEditor="buttonEventToAddItsContent = $event"
          ></app-button-component>

          <app-editor-component
            :wysiwygProps="content.wysiwygProps"
            :addButtonContentToWysiwyg="buttonEventToAddItsContent"
            @editorData="axiosRequest.request.file = $event"
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
import AppFormComponent from "@/components/Content/Form/AppForm.vue";
import AppButtonComponent from "@/components/Content/UI/AppButton.vue";
import AppEditorComponent from "@/components/Content/Form/AppEditor.vue";

export default defineComponent({
  components: {
    AppHeaderComponent,
    AppFormComponent,
    AppButtonComponent,
    AppEditorComponent,
  },
  data() {
    return {
      currentRequestSubject: "",
      axiosRequest: {
        request: {
          id: null,
          idgroup_owner: null,
          name: null,
          file: null,
        },
      },
      saveStatus: null,
      buttonEventToAddItsContent: new PointerEvent(""),
      content: {
        header: {
          name: "Şablon Düzenle",
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
              clickEvent: "saveAndnextPage",
              innerHtml: "Kaydet ve Devam Et",
            },
          ],
          encapsulationElem: {
            class:
              "col-12 d-flex justify-content-center align-items-center overflow-auto",
          },
        },
        formGroupForSelectTemplate: {
          labelName: "Şablon Seç",
          outerClass: "form-group",
          innerClass: "form-control",
          required: true,
          options: [],
          encapsulationElem: {
            class: "col-12",
          },
        },
        wysiwygProps: {
          editorData: "",
          encapsulationElem: {
            class: "col-12 my-2",
          },
        },
      },
    };
  },
  methods: {
    getAllTemplates() {
      const axiosRequestParams = {
        name: "getTemplates",
        url: this.$store.getters.getRequestEndPoint + "getusertemplates/1",
        config: {
          headers: {
            "Content-Type": "application/json",
          },
        },
        toastMessages: null,
      };

      this.$store.dispatch("makeGetRequest", {
        axiosRequestParams,
      });
    },
    getOneTemplate(id) {
      console.log(id);
      if (!id) {
        this.content.wysiwygProps.editorData = "";
        return;
      }
      let templateInfo = this.content.formGroupForSelectTemplate.options.filter(
        (template) => template.id === id
      );

      this.axiosRequest.request.id = id;
      this.axiosRequest.request.idgroup_owner = templateInfo[0].idgroup_owner;
      this.axiosRequest.request.name = templateInfo[0].name;
      this.axiosRequest.request.file = templateInfo[0].file;

      this.content.wysiwygProps.editorData = templateInfo[0].file;
    },
    save() {
      if (this.axiosRequest.request.editorData !== "") {
        console.log(this.axiosRequest.request);
        const axiosRequestParams = {
          name: "saveTemplate",
          data: JSON.stringify(this.axiosRequest.request),
          url:
            this.$store.getters.getRequestEndPoint +
            "updatetemplate/" +
            this.axiosRequest.request.id,
          config: {
            headers: {
              "Content-Type": "application/json",
            },
          },
          toastMessages: {
            success: "Şablon Başarıyla Kaydedildi.",
            warning: null,
            error: "Şablon Kaydedilemedi.",
          },
        };

        this.$store.dispatch("makePutRequest", {
          axiosRequestParams,
        });
      } else {
        this.$store.dispatch("fireToast", {
          message: "Şablon Boş Olamaz.",
          type: "warning",
          duration: 2000,
        });
      }
    },
  },
  computed: {
    getResponseOfTemplateIsSaved() {
      return this.$store.getters.axiosRequestResponse["saveTemplate"];
    },
    getResponseOfTemplates(){
      return this.$store.getters.axiosRequestResponse["getTemplates"];
    }
  },
  watch: {
    getResponseOfTemplateIsSaved(val) {
      /*console.log(val.responseData);
      const endPoint = val.responseData.config.url;
      const splittedEndPoint = endPoint.split("/");
      const foundSubject = splittedEndPoint.filter(
        (subject) => subject === this.currentRequestSubject
      );
      if(foundSubject.length > 0){
        this.content.formGroupForSelectTemplate.options = val.responseData.data;
      } else {
        this.getAllTemplates();
      }*/

      const responseData = val.responseData.data;
      if(responseData.success === 1) {
        this.getAllTemplates();
      }
    },
    getResponseOfTemplates(val){
      this.content.formGroupForSelectTemplate.options = val.responseData.data;
    }
  },
  mounted() {
    this.currentRequestSubject = "getusertemplates";
    this.getAllTemplates();
  },
});
</script>

<style>
</style>