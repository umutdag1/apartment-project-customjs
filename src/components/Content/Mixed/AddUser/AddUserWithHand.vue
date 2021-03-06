<template>
  <div class="col-12 mb-3" v-if="!addUserWithHandProps.userForUpdating">
    <p class="h3">Gruba Kişi Oluştur</p>
  </div>

  <form class="col-12" @submit.prevent="addUserToDB" ref="form">
    <div class="row">
      <app-form-component
        :formGroupProps="addUserWithHandProps.formGroupForSelectGroup"
        @selectedOption="axiosRequest.request.group_id = $event"
      >
      </app-form-component>

      <app-input-component
        :inputProps="content.inputGroupForAddNewUser"
        @userInput="axiosRequest.request.userInput = $event"
        ref="inputRef"
      ></app-input-component>

      <app-button-component
        :buttonProps="content.buttonGroupForAddNewUser"
        @addUserToDB="saveStatus = 0"
        @clearInputs="clearInputs()"
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
  props: {
    addUserWithHandProps: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      saveStatus: 0,
      axiosRequest: {
        request: {
          group_id: "",
          userInput: {},
        },
        response: null,
      },
      content: {
        inputGroupForAddNewUser: {
          content: [
            {
              attribute: {
                type: "text",
                targetType: null,
                outerClass: "input-group mb-3",
                innerClass: "form-control",
                required: true,
                pattern: "^([a-zA-ZğüşöçıIİĞÜŞÖÇ]|\\s)*$",
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
                outerClass: "input-group mb-3",
                innerClass: "form-control",
                required: true,
                pattern: "^([a-zA-ZğüşöçıIİĞÜŞÖÇ]|\\s)*$",
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
                outerClass: "input-group mb-3",
                innerClass: "form-control",
                required: true,
                pattern: "^([a-zA-Z0-9ğüşöçıIİĞÜŞÖÇ]|\\s)*$",
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
                outerClass: "input-group mb-3",
                innerClass: "form-control",
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
                outerClass: "input-group mb-3",
                innerClass: "form-control",
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
                outerClass: "input-group mb-3",
                innerClass: "form-control",
                required: true,
                pattern:
                  "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?",
                invalidMessage: "Geçerli bir email giriniz.",
              },
              name: "E-posta Adresi",
              column: "email",
              icon: "fas fa-envelope",
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
              clickEvent: "clearInputs",
              innerHtml: "Temizle",
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
      },
    };
  },
  methods: {
    addUserToDB() {
      const axiosRequestParams = {
        name: this.$options.__file,
        data: JSON.stringify(this.axiosRequest.request),
        config: {
          headers: {
            "Content-Type": "application/json",
          },
        },
      };

      if (this.addUserWithHandProps.userForUpdating) {
        axiosRequestParams.url =
          this.$store.getters.getRequestEndPoint + "updateusertogroupbyhand";
        axiosRequestParams.toastMessages = {
          success: "Kişi Başarıyla Güncellendi",
          warning: null,
          error: "Kişi Güncelleme Başarısız",
        };
      } else {
        axiosRequestParams.url =
          this.$store.getters.getRequestEndPoint + "addusertogroupbyhand";
        axiosRequestParams.toastMessages = {
          success: "Kişi Başarıyla Eklendi",
          warning: null,
          error: "Kişi Ekleme Başarısız",
        };
      }

      console.log(axiosRequestParams.data);

      this.$store.dispatch("makePostRequest", {
        axiosRequestParams,
      });
    },
    clearInputs() {
      this.$refs.inputRef.user.input = {};
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
      console.log(this.axiosRequest.response);
    },
  },
  mounted() {
    if (this.addUserWithHandProps.userForUpdating) {
      const axiosRequestParams = {
        name: this.$options.__file,
        url: this.addUserWithHandProps.userForUpdating.url,
        config: {
          headers: {
            "Content-Type": "application/json",
          },
        },
        toastMessages: null,
      };

      console.log(axiosRequestParams.data);

      this.$store.dispatch("makeGetRequest", {
        axiosRequestParams,
      });
    }
  },
});
</script>

<style>
</style>