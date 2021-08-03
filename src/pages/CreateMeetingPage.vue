<template>
  <div class="content-header">
    <div class="container-fluid">
      <app-header-component :headerObj="content.header"></app-header-component>
    </div>
  </div>
  <section class="content">
    <div class="container-fluid">
      <div class="row">
        <app-form-component :formGroupProps="content.formGroupForSelectGroup">
        </app-form-component>

        <app-button-component
          :buttonProps="content.buttonGroupForSelectGroup"
          @goEditGroupUsersPage="
            $store.dispatch('changePage', 'editGroupUsers')
          "
          @goCreateGroupPage="$store.dispatch('changePage', 'createGroup')"
          @goCreateGroupUsersPage="
            $store.dispatch('changePage', 'createGroupUsers')
          "
        ></app-button-component>

        <app-form-component
          :formGroupProps="content.formGroupForSelectTemplate"
        >
        </app-form-component>

        <app-button-component
          :buttonProps="content.buttonGroupForSelectTemplate"
          @goCreateMeetingTemplatePage="
            $store.dispatch('changePage', 'createMeetingTemplate')
          "
          @goEditMeetingTemplatePage="
            $store.dispatch('changePage', 'editMeetingTemplate')
          "
        ></app-button-component>

        <app-button-component
          :buttonProps="content.buttonGroupForCreateMeeting"
          @sendBySMS="sendMeeting($event)"
          @sendByReturnReceipt="sendMeeting($event)"
          @sendByEmail="sendMeeting($event)"
        ></app-button-component>
      </div>
    </div>
  </section>
</template>
  
  <script>
import { defineComponent } from "vue";
import AppHeaderComponent from "@/components/Header/AppHeader.vue";
import AppFormComponent from "@/components/Content/Form/AppForm.vue";
import AppButtonComponent from "@/components/Content/UI/AppButton.vue";

export default defineComponent({
  components: {
    AppHeaderComponent,
    AppFormComponent,
    AppButtonComponent,
  },
  data() {
    return {
      buttonEventToAddItsContent: new PointerEvent(""),
      content: {
        header: {
          name: "Toplantı Oluştur",
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
            class: "col-xl-8",
          },
        },
        buttonGroupForSelectGroup: {
          buttons: [
            {
              class: "btn btn-block btn-secondary my-1 mr-1",
              clickEvent: "goEditGroupUsersPage",
              innerHtml: "Düzenle",
            },
            {
              class: "btn btn-block btn-primary my-1 mr-1",
              clickEvent: "goCreateGroupPage",
              innerHtml: "Oluştur",
            },
            {
              class: "btn btn-block btn-danger my-1",
              clickEvent: "goCreateGroupUsersPage",
              innerHtml: "Kişi Ekle",
            },
          ],
          encapsulationElem: {
            class:
              "col-xl-4 d-flex align-items-center justify-content-center mt-xl-3 overflow-auto",
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
            class: "col-xl-8",
          },
        },
        buttonGroupForSelectTemplate: {
          buttons: [
            {
              class: "btn btn-block btn-secondary my-1 mr-1",
              clickEvent: "goEditMeetingTemplatePage",
              innerHtml: "Düzenle",
            },
            {
              class: "btn btn-block btn-primary my-1",
              clickEvent: "goCreateMeetingTemplatePage",
              innerHtml: "Oluştur",
            },
          ],
          encapsulationElem: {
            class:
              "col-xl-4 d-flex align-items-center justify-content-center mt-xl-3 overflow-auto",
          },
        },
        buttonGroupForCreateMeeting: {
          buttons: [
            {
              class: "btn btn-block btn-info my-2 mr-3",
              clickEvent: "sendBySMS",
              innerHtml: "SMS Gönder",
            },
            {
              class: "btn btn-block btn-primary my-2 mr-3",
              clickEvent: "sendByReturnReceipt",
              innerHtml: "İadeli Taahhütlü Gönder",
            },
            {
              class: "btn btn-block btn-success my-2",
              clickEvent: "sendByEmail",
              innerHtml: "Email Gönder",
            },
          ],
          encapsulationElem: {
            class:
              "col-12 d-flex justify-content-center align-items-center overflow-auto mt-4 ",
          },
        },
      },
    };
  },
  methods: {
    sendMeeting(buttonEvent) {
      const targetElemContentArray = buttonEvent.target.innerHTML.split(" ");
      targetElemContentArray.splice(targetElemContentArray.length - 1, 1);
      this.$store.dispatch("fireToast", [
        `${targetElemContentArray.join(" ")} Başarıyla Gönderildi.`,
        "success",
        2000,
      ]);
    },
  },
});
</script>
  
  <style>
</style>