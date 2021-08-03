<template>
  <div class="col-12 mb-3">
    <p class="h3">Gruba Liste Oluştur</p>
  </div>
    <app-form-component
      :formGroupProps="addUserWithFileProps.formGroupForSelectGroup"
      @selectedOption="content.fileGroupForAddFile.axiosRequest.selectedGroup = $event"
    >
    </app-form-component>

    <app-file-component
      :fileGroupProps="content.fileGroupForAddFile"
      @onSelectFile="onSelectFile($event)"
      @onResetForm="onResetForm($event)"
    ></app-file-component>

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
      content: {
        fileGroupForAddFile: {
          axiosRequest: {
            url: "https://v2.convertapi.com/upload",
            selectedGroup: "",
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
    onSelectFile(childThis) {
      if (childThis.$refs.file.disabled) {
        this.$store.dispatch("fireToast", {
          message: "Sadece Bir Dosya Seçebilirsin.",
          type: "warning",
          duration: 2000,
        });
      } else {
        childThis.$refs.file.click();
        console.log(childThis.$refs.file.value);
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