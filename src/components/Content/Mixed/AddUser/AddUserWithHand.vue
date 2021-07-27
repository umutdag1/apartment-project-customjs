<template>
  <div class="col-12 mb-3">
    <p class="h3">Gruba Kişi Oluştur</p>
  </div>

  <app-form-component :formGroupProps="content.formGroupForSelectGroup">
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
      content: {
        inputGroupForAddNewUser: {
          name: [
            "Kişi Adı",
            "Kişi Soyadı",
            "Kişi Adresi",
            "Kişi Doğum Tarihi",
            "Kişi Telefon Numarası",
            "Kişi E-posta Adresi",
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
            class: "col-12 d-flex justify-content-center align-items-center",
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
        name: "addUserGetRequest",
        url: "https://jsonplaceholder.typicode.com/posts",
        config: {},
        toastMessages: {
          success: "Kişi Başarıyla Eklendi",
          error: "Kişi Ekleme Başarısız",
        },
      };

      this.emitter.emit("makeGetRequest", {
        axiosRequestParams,
      });
    },
  },
  mounted() {
    this.emitter.on("addUserPostRequest", (data) => {
      console.log(data.responseData);
    });
    this.emitter.on("addUserGetRequest", (data) => {
      console.log(data.responseData);
    });
  },
  unmounted() {
    this.emitter.emit("resetEmitter", [
      "addUserPostRequest",
      "addUserGetRequest",
      "callResetForm",
    ]);
  },
});
</script>

<style>
</style>