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
            :inputProps="content.inputGroupForAddNewGroup"
            @userInput="userInput = $event"
          ></app-input-component>

          <app-button-component
            :buttonProps="content.buttonGroupForAddNewGroup"
            @save="saveStatus = 0"
            @goNextPage="$store.dispatch('changePage', 'createGroupUsers')"
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
export default defineComponent({
  components: {
    AppHeaderComponent,
    AppInputComponent,
    AppButtonComponent,
  },
  data() {
    return {
      saveStatus : 0,
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
          content: [
            {
              attribute: {
                type: "text",
                targetType: null,
                required: true,
                pattern: "^([a-zA-ZğüşöçİĞÜŞÖÇ0-9]|\\s)*$",
                invalidMessage: "Yalnızca Harf veya Rakam kullanınız.",
              },
              type: "text",
              name: "Grup Adı",
              column: "group_name",
              icon: null,
            },
          ],
          encapsulationElem: {
            class: "col-12",
          },
        },
        buttonGroupForAddNewGroup: {
          buttons: [
            {
              class: "btn btn-block btn-info my-2 mr-3",
              clickEvent: "save",
              type: "submit",
              innerHtml: "Kaydet",
            },
            {
              class: "btn btn-block btn-primary my-2 mr-3",
              clickEvent: "goNextPage",
              type: "button",
              innerHtml: "Devam Et",
            },
            {
              class: "btn btn-block btn-success my-2",
              clickEvent: "saveAndnextPage",
              type: "submit",
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
      this.$store.dispatch("fireToast", {
        message: "Grup İsmi Başarıyla Eklendi.",
        type: "success",
        duration: 2000,
      });

      if(this.saveStatus === 1) {
        this.$store.dispatch("changePage", "createGroupUsers");
      } 
    },
  },
});
</script>
        
<style>
</style>
    