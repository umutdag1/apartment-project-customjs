<template>
  <div class="col-12 mb-3">
    <p class="h3">Gruba Kişi Oluştur</p>
  </div>

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
    @addUserToDB="addUserToDB"
  >
  </app-button-component>
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
      userInput: {},
      axiosRequest: {
        response: null,
      },
      content: {
        inputGroupForAddNewUser: {
          content: [
            {
              type: "text",
              name: "Kişi Adı",
              column: "first_name",
              icon: "fas fa-user",
            },
            {
              type: "text",
              name: "Kişi Soyadı",
              column: "last_name",
              icon: "fas fa-user",
            },
            {
              type: "text",
              name: "Kişi Adresi",
              column: "address",
              icon: "fas fa-map-marker-alt",
            },
            {
              type: "text",
              name: "Kişi Doğum Tarihi",
              column: "birth_date",
              icon: "fas fa-calendar",
            },
            {
              type: "tel",
              name: "Kişi Telefon Numarası",
              column: "gsm_number",
              icon: "fas fa-phone",
            },
            {
              type: "text",
              name: "Kişi E-posta Adresi",
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
              clickEvent: "addUserToDB",
              innerHtml: "Kaydet",
            },
            {
              class: "btn btn-block btn-danger my-2",
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