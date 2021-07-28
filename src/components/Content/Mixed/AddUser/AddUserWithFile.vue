<template>
  <div class="col-12 mb-3">
    <p class="h3">Gruba Liste Oluştur</p>
  </div>

  <app-form-component :formGroupProps="content.formGroupForSelectGroup">
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
  data() {
    return {
      content: {
        fileGroupForAddFile: {
          file: {
            type: "Excel",
            accepted: ".xlsx,.xls",
            clickEvent: {
              selectFile: "onSelectFile",
              resetForm: "onResetForm"
            },
          },
          encapsulationElem: {
            class: "col-12",
          },
        },
        formGroupForSelectGroup: {
          labelName: "Grup Seç",
          options: [
            {
              name: "Group1",
              class: "",
            },
            {
              name: "Group2",
              class: "",
            },
          ],
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
        this.emitter.emit("fireToast", [
          "Sadece Bir Dosya Seçebilirsin.",
          "warning",
          2000,
        ]);
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
        this.emitter.emit("fireToast", [
          "Dosya Yükleme İşlemi Devam Ediyor.",
          "warning",
          2000,
        ]);
      } else {
        childThis.files = [];
        childThis.axiosRequest.cancelTokenArr = [];
        childThis.uploadFileInfo.isUploadCanceledArr = [];
        childThis.uploadFileInfo.isUploadContinuedArr = [];
        childThis.$refs.file.disabled = false;
      }
    },
  },
  unmounted() {
    this.emitter.emit("resetEmitter", ["resetForm"]);
  },
});
</script>

<style>
</style>