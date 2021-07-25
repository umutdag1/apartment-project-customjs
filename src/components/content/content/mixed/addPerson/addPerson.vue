<template>
  <content-form-group :formGroupProps="content.formGroupForSelectGroup">
  </content-form-group>
  <content-input-group
    :inputProps="content.inputGroupForAddNewUser"
  ></content-input-group>
  <content-button-group
    :buttonProps="content.buttonGroupForAddNewUser"
    @addUserToDB="addUserToDB"
  >
  </content-button-group>
</template>

<script>
import { defineComponent } from "vue";
import ContentInputGroup from "@/components/content/content/mixed/custom/group/inputGroup.vue";
import ContentButtonGroup from "@/components/content/content/mixed/custom/group/buttonGroup.vue";
import ContentFormGroup from "@/components/content/content/mixed/custom/group/formGroup.vue";

export default defineComponent({
  components: {
    ContentFormGroup,
    ContentInputGroup,
    ContentButtonGroup,
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
              class: "btn btn-block btn-primary my-2 mr-3",
              clickEvent: "addUserToDB",
              innerHtml: "Ekle",
            },
            {
              class: "btn btn-block btn-danger my-2",
              clickEvent: "addPersonToDB",
              innerHtml: "Sil",
            },
          ],
          encapsulationElem: {
            class: "col-md-12 d-flex justify-content-center align-items-center",
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
        axiosRequestParams
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
});
</script>

<style>
</style>