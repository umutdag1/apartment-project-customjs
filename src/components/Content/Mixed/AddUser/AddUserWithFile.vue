<template>
  <div class="col-12 mb-3">
    <p class="h3">Gruba Liste Oluştur</p>
  </div>
  <form @submit.prevent="save" ref="form">
    <app-form-component
      :formGroupProps="addUserWithFileProps.formGroupForSelectGroup"
      @selectedOption="selectedGroup = $event"
    >
    </app-form-component>

    <app-file-component
      :fileGroupProps="content.fileGroupForAddFile"
      @onSelectFile="onSelectFile($event)"
      @onResetForm="onResetForm($event)"
      @axiosRequestParamsForFile="sendFileToDB($event)"
    ></app-file-component>
  </form>
</template>

<script>
import { defineComponent } from "vue";
import AppFileComponent from "@/components/Content/Form/AppFile.vue";
import AppFormComponent from "@/components/Content/Form/AppForm.vue";

export default defineComponent({
  components: {
    AppFileComponent,
    AppFormComponent,
  },
  props: {
    addUserWithFileProps: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      selectedGroup: "",
      content: {
        fileGroupForAddFile: {
          axiosRequest: {
            url: "https://v2.convertapi.com/upload",
          },
          file: {
            type: "Excel",
            accepted: ".xlsx,.xls",
            clickEvent: {
              selectFile: "onSelectFile",
              resetForm: "onResetForm",
            },
          },
          encapsulationElem: {
            class: "col-12",
          },
        },
      },
    };
  },
  methods: {
    sendFileToDB(axiosRequestParams) {
      const formData = axiosRequestParams.data;
      const updatedData = JSON.stringify({
        selectedGroup: this.selectedGroup,
        file: formData,
      });

      axiosRequestParams.data = updatedData;

      console.log(updatedData);

      this.$store.dispatch("makePostRequest", {
        axiosRequestParams,
      });
    },
    onSelectFile(childThis) {
      if (childThis.$refs.file.disabled) {
        this.$store.dispatch("fireToast", {
          message: "Sadece Bir Dosya Seçebilirsin.",
          type: "warning",
          duration: 2000,
        });
      } else {
        childThis.$refs.file.click();
        childThis.$refs.file.disabled = true;
      }
    },
    onResetForm(childThis) {
      const isStillUploadContinuedArr =
        childThis.uploadFileInfo.isUploadContinuedArr.filter(
          (boolItem) => boolItem === true
        );
      if (isStillUploadContinuedArr.length > 0) {
        this.$store.dispatch("fireToast", {
          message: "Dosya Yükleme İşlemi Devam Ediyor.",
          type: "warning",
          duration: 2000,
        });
      } else {
        childThis.files = [];
        childThis.axiosRequest.cancelTokenArr = [];
        childThis.uploadFileInfo.isUploadCanceledArr = [];
        childThis.uploadFileInfo.isUploadContinuedArr = [];
        childThis.$refs.file.disabled = false;
      }
    },
  },
});
</script>

<style>
</style>