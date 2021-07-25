<template>
  <div class="col-12 mb-3">
    <p class="h3">Gruba Liste Oluştur</p>
  </div>
  <content-form-group :formGroupProps="content.formGroupForSelectGroup">
  </content-form-group>
  <content-file-group
    :fileGroupProps="content.fileGroupForAddFile"
    ref="fileGroupElem"
  ></content-file-group>
</template>

<script>
import { defineComponent } from "vue";
import ContentFileGroup from "@/components/content/content/mixed/custom/group/fileGroup.vue";
import ContentFormGroup from "@/components/content/content/mixed/custom/group/formGroup.vue";

export default defineComponent({
  components: {
    ContentFileGroup,
    ContentFormGroup,
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
        },
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