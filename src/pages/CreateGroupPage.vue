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
            @userInput="axiosRequest.request.userInput = $event"
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
      saveStatus: null,
      axiosRequest: {
        request: {
          userInput: {},
        },
        response : null
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
                outerClass: "input-group mb-3",
                innerClass: "form-control",
                required: true,
                pattern: "^([a-zA-ZğüşöçıIİĞÜŞÖÇ0-9]|\\s)*$",
                invalidMessage: "Yalnızca Harf veya Rakam kullanınız.",
              },
              type: "text",
              name: "Grup Adı",
              column: "name",
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
      },
    };
  },
  methods: {
    save() {
      this.axiosRequest.request.userInput.idgroup_owner = "1";
      const axiosRequestParams = {
        name: this.$options.__file,
        data: JSON.stringify(this.axiosRequest.request.userInput),
        url: this.$store.getters.getRequestEndPoint  + "creategroup",
        config: {
          headers: {
            "Content-Type": "application/json",
          },
        },
        toastMessages: {
          success: "Grup İsmi Başarıyla Kaydedildi.",
          warning: null,
          error: "Grup İsmi Kaydedilemedi.",
        },
      };

      console.log(JSON.stringify(this.axiosRequest.request.userInput));

      this.$store.dispatch("makePostRequest", {
        axiosRequestParams,
      });

      if (this.saveStatus === 1) {
        this.$store.dispatch("changePage", "createGroupUsers");
      }
    },
  },
});
</script>
        
<style>
</style>
    