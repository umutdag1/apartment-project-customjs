<template>
  <div class="content-header">
    <div class="container-fluid">
      <app-header-component :headerObj="content.header"></app-header-component>
    </div>
  </div>

  <section class="content">
    <div class="container-fluid">
      <app-form-component
        :formGroupProps="content.formGroupForSelectGroup"
        @selectedOption="content.dataTableProps.axios.request.group_id = $event"
      >
      </app-form-component>

      <app-modal-component :modalProps="modalProps"> </app-modal-component>

      <app-data-table-component
        :dataTableProps="content.dataTableProps"
        @sendToModal="triggerModal($event)"
      ></app-data-table-component>

      <app-button-component
        :buttonProps="content.buttonGroupForAddNewGroup"
        @goBackPage="$store.dispatch('changePage', null)"
        @goNextPage="$store.dispatch('changePage', 'createMeetingTemplate')"
      ></app-button-component>
    </div>
  </section>
</template>
  
<script>
import { defineComponent } from "vue";
import AppHeaderComponent from "@/components/Header/AppHeader.vue";
import AppFormComponent from "@/components/Content/Form/AppForm.vue";
import AppDataTableComponent from "@/components/Content/Table/AppDataTable.vue";
import AppButtonComponent from "@/components/Content/UI/AppButton.vue";
import AppModalComponent from "@/components/Content/UI/AppModal.vue";

export default defineComponent({
  components: {
    AppHeaderComponent,
    AppFormComponent,
    AppDataTableComponent,
    AppButtonComponent,
    AppModalComponent,
  },
  data() {
    return {
      axiosRequest: {
        request: null,
        response: null,
      },
      content: {
        header: {
          name: "Grup Kişileri Düzenle",
        },
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
        buttonGroupForAddNewGroup: {
          buttons: [
            {
              class: "btn btn-block btn-secondary my-2 mr-3",
              clickEvent: "goBackPage",
              innerHtml: "Geri Dön",
            },
            {
              class: "btn btn-block btn-primary my-2",
              clickEvent: "goNextPage",
              innerHtml: "Devam Et",
            },
          ],
          encapsulationElem: {
            class: "col-12 d-flex align-items-center justify-content-center",
          },
        },
        dataTableProps: {
          axios: {
            url: null,
            request: {
              group_id: "",
            },
            response: null,
          },
          encapsulationElem: {
            class: "col-12",
          },
        },
      },
      modalProps: {
        data: {},
      },
    };
  },
  methods: {
    triggerModal(data) {
      this.modalProps.data = data;
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
      console.log(val.responseData.data);
      this.content.formGroupForSelectGroup.options =
        this.axiosRequest.response.responseData.data;
    },
  },
  mounted() {
    this.content.dataTableProps.axios.url =
      this.$store.getters.getRequestEndPoint + "getgroupusers";

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