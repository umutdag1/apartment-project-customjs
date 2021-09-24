<template>
  <div class="content-header">
    <div class="container-fluid">
      <app-header-component :headerObj="content.header"></app-header-component>
    </div>
  </div>

  <section class="content">
    <div class="container-fluid">
      <add-user-with-hand-component
        :addUserWithHandProps="content.addUserProps.content"
      ></add-user-with-hand-component>
      <app-button-component
        :buttonProps="content.buttonGroupForChangingPage"
        @goBackPage="$store.dispatch('changePage', null)"
      ></app-button-component>
    </div>
  </section>
</template>
  
<script>
import { defineComponent } from "vue";
import AppHeaderComponent from "@/components/Header/AppHeader.vue";
import AddUserWithHandComponent from "@/components/Content/Mixed/AddUser/AddUserWithHand.vue";
import AppButtonComponent from "@/components/Content/UI/AppButton.vue";

export default defineComponent({
  components: {
    AppHeaderComponent,
    AddUserWithHandComponent,
    AppButtonComponent,
  },
  data() {
    return {
      axiosRequest: {
        request: null,
        response: null,
      },
      content: {
        header: {
          name: "Grup Kişi Güncelle",
        },
        addUserProps: {
          content: {
            formGroupForSelectGroup: {
              labelName: "Grup Seç",
              outerClass: "form-group",
              innerClass: "form-control",
              required: true,
              options: [],
              encapsulationElem: {
                class: "col-12",
              },
            },
            userForUpdating: {
              axios: {
                url: "",
              },
            },
          },
        },
        buttonGroupForChangingPage: {
          buttons: [
            {
              class: "btn btn-block btn-secondary my-2",
              clickEvent: "goBackPage",
              innerHtml: "Geri Dön",
            },
          ],
          encapsulationElem: {
            class: "col-12 d-flex align-items-center justify-content-center",
          },
        },
      },
    };
  },
  computed: {
    response() {
      return this.$store.getters.axiosRequestResponse[this.$options.__file];
    },
  },
  watch: {
    response(val) {
      this.axiosRequest.response = val;
      console.log(val.responseData.data);
      this.content.formGroupForSelectGroup.options =
        this.axiosRequest.response.responseData.data;
    },
  },
  mounted() {
    this.userForUpdating.axios.url =
      this.$store.getters.getRequestEndPoint +
      "getuser/" +
      this.$route.params.id;

    console.log(this.userForUpdating.axios);

    const axiosRequestParams = {
      name: this.$options.__file,
      url: this.$store.getters.getRequestEndPoint + "getgroups",
      config: {
        headers: {
          "Content-Type": "application/json",
        },
      },
      toastMessages: null,
    };

    this.$store.dispatch("makeGetRequest", {
      axiosRequestParams,
    });
  },
});
</script>

<style>
</style>