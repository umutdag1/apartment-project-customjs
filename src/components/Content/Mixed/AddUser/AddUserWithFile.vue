<template>
  <div class="col-12 mb-3">
    <p class="h3">Gruba Liste Oluştur</p>
  </div>

  <app-form-component :formGroupProps="content.formGroupForSelectGroup">
  </app-form-component>

  <app-file-component
    :fileGroupProps="content.fileGroupForAddFile"
    ref="fileGroupElem"
  ></app-file-component>

</template>

<script>
import { defineComponent } from "vue";
import AppFileComponent from "@/components/Content/Form/AppFile.vue";
import AppFormComponent from "@/components/Content/Form/AppForm.vue";

export default defineComponent({
  components: {
    AppFileComponent,
    AppFormComponent
  },
  data() {
    return {
      content: {
        fileGroupForAddFile: {
          fileType: "Excel",
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
        }
      },
    };
  },
  mounted() {
    this.emitter.on("resetForm", (callFunc) => {
      callFunc();
    });
  },
  unmounted() {
    this.emitter.emit("resetEmitter", ["resetForm"]);
  },
});
</script>

<style>
</style>