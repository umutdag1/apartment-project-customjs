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
          :inputProps="content.inputGroupForAddNewGroup"
          @userInput="userInput = $event"
        ></input-group-component>
        
        <button-group-component
          :buttonProps="content.buttonGroupForAddNewGroup"
          @save="save"
          @goNextPage="emitter.emit('goNextPage','createGroupUsers')"
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
export default defineComponent({
  components: {
    ContentHeaderComponent,
    InputGroupComponent,
    ButtonGroupComponent,
  },
  data() {
    return {
      files: [],
      userInput: {},
      axiosRequest: {
        isRequestCanceledArr: [],
        isRequestContinuingStatusArr: [],
        cancelTokenArr: [],
      },
      content: {
        header: {
          name: "Grup Oluştur",
        },
        inputGroupForAddNewGroup: {
          name: ["Grup Adı"],
          encapsulationElem: {
            class: "col-12",
          },
        },
        buttonGroupForAddNewGroup: {
          buttons: [
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
        formGroupForSelectTemplate: {
          labelName: "Şablon Seç",
          options: [
            {
              name: "Şablon1",
              class: "",
            },
            {
              name: "Şablon2",
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
    save() {
      this.emitter.emit("fireToast", [
        "Grup İsmi Başarıyla Eklendi.",
        "success",
        2000,
      ]);
    },
    saveAndnextPage() {
      this.save();
      this.emitter.emit('goNextPage','createGroupUsers')
    },
  },
});
</script>
        
<style>
</style>
    