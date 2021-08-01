<template>
  <div class="col-12 mb-3">
    <p class="h3">Gruba Kişi Oluştur</p>
  </div>

  <form @submit.prevent="addUserToDB" ref="form">
    <div class="row">
      <app-form-component
        :formGroupProps="content.formGroupForSelectGroup"
        @userInput="userInput = $event"
      >
      </app-form-component>

      <app-input-component
        :inputProps="content.inputGroupForAddNewUser"
      ></app-input-component>

      <app-button-component
        :buttonProps="content.buttonGroupForAddNewUser"
        @addUserToDB="saveStatus = 0"
      >
      </app-button-component>
    </div>
  </form>
</template>

<script>
import { defineComponent } from "vue";
import AppInputComponent from "@/components/Content/Form/AppInput.vue";
import AppButtonComponent from "@/components/Content/UI/AppButton.vue";
import AppFormComponent from "@/components/Content/Form/AppForm.vue";

export default defineComponent({
  components: {
    AppInputComponent,
    AppButtonComponent,
    AppFormComponent,
  },
  data() {
    return {
      saveStatus: 0,
      userInput: {},
      axiosRequest: {
        response: null,
      },
      content: {
        inputGroupForAddNewUser: {
          content: [
            {
              attribute: {
                type: "text",
                targetType: null,
                outerClass : "input-group mb-3",
                innerClass : "form-control",
                required: true,
                pattern: "^([a-zA-ZğüşöçİĞÜŞÖÇ]|\\s)*$",
                invalidMessage: "Yanlızca Harf Kullanınız",
              },
              name: "Ad",
              column: "first_name",
              icon: "fas fa-user",
            },
            {
              attribute: {
                type: "text",
                targetType: null,
                outerClass : "input-group mb-3",
                innerClass : "form-control",
                required: true,
                pattern: "^([a-zA-ZğüşöçİĞÜŞÖÇ]|\\s)*$",
                invalidMessage: "Yanlızca Harf Kullanınız",
              },
              name: "Soyad",
              column: "last_name",
              icon: "fas fa-user",
            },
            {
              attribute: {
                type: "text",
                targetType: null,
                outerClass : "input-group mb-3",
                innerClass : "form-control",
                required: true,
                pattern: "^([a-zA-Z0-9ğüşöçİĞÜŞÖÇ]|\\s)*$",
                invalidMessage: "Yanlızca Harf ve Rakam Kullanınız",
              },
              name: "Adres",
              column: "address",
              icon: "fas fa-map-marker-alt",
            },
            {
              attribute: {
                type: "text",
                targetType: "date",
                outerClass : "input-group mb-3",
                innerClass : "form-control",
                required: true,
                pattern: null,
                invalidMessage: null,
              },
              name: "Doğum Tarihi",
              column: "birth_date",
              icon: "fas fa-calendar",
            },
            {
              attribute: {
                type: "text",
                targetType: null,
                outerClass : "input-group mb-3",
                innerClass : "form-control",
                required: true,
                pattern: "[0-9]{3}[0-9]{3}[0-9]{4}",
                invalidMessage:
                  "Başında '0' rakamı olmadan 10 haneli telefon numaranızı giriniz",
              },
              name: "Telefon Numarası",
              column: "gsm_number",
              icon: "fas fa-phone",
            },
            {
              attribute: {
                type: "text",
                targetType: null,
                outerClass : "input-group mb-3",
                innerClass : "form-control",
                required: true,
                pattern:
                  "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?",
                invalidMessage: "Geçerli bir email giriniz.",
              },
              name: "E-posta Adresi",
              column: "email",
              icon: "fas fa-envelope",
            },
            {
              attribute: {
                type: "password",
                targetType: null,
                outerClass : "input-group mb-3",
                innerClass : "form-control",
                required: true,
                pattern: "^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*).{8,}$",
                invalidMessage:
                  "En az 8 karakter ve Geçerli karakterler giriniz.",
              },
              name: "Şifre",
              column: "password",
              icon: "fas fa-lock",
            },
            {
              attribute: {
                type: "password",
                targetType: null,
                outerClass : "input-group mb-3",
                innerClass : "form-control",
                required: true,
                pattern: "^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*).{8,}$",
                invalidMessage:
                  "En az 8 karakter ve Geçerli karakterler giriniz.",
              },
              name: "Şifre Tekrar",
              column: "password_conf",
              icon: "fas fa-lock",
            },
          ],
          encapsulationElem: {
            class: "col-md-6",
          },
        },
        buttonGroupForAddNewUser: {
          buttons: [
            {
              class: "btn btn-block btn-info my-2 mr-3",
              type: "submit",
              clickEvent: "addUserToDB",
              innerHtml: "Kaydet",
            },
            {
              class: "btn btn-block btn-danger my-2",
              type: "button",
              clickEvent: "addPersonToDB",
              innerHtml: "Sil",
            },
          ],
          encapsulationElem: {
            class:
              "col-12 d-flex justify-content-center align-items-center overflow-auto",
          },
        },
        buttonGroupForCreateGroup: {
          buttons: [
            {
              class: "btn btn-primary start",
              type: "button",
              clickEvent: "addPersonToDB",
              innerHtml: "<i class='fas fa-upload mr-2'></i><span>Yükle</span>",
            },
          ],
          encapsulationElem: {
            class: "btn-group",
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
    addUserToDB() {
      const axiosRequestParams = {
        name: this.$options.__file,
        url: "https://jsonplaceholder.typicode.com/posts",
        config: {},
        toastMessages: {
          success: "Kişi Başarıyla Eklendi",
          error: "Kişi Ekleme Başarısız",
        },
      };

      console.log(this.$options.__file);

      this.$store.dispatch("makeGetRequest", {
        axiosRequestParams,
      });
    },
  },
  computed: {
    response() {
      return this.$store.getters.axiosRequestResponse[this.$options.__file];
    },
  },
  watch: {
    response(val) {
      this.axiosRequest.response = val;
    },
  },
});
</script>

<style>
</style>