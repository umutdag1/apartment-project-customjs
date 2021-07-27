<template>
  <div class="content-header">
    <div class="container-fluid">
      <app-header-component
        :headerObj="content.header"
      ></app-header-component>
    </div>
  </div>
  <section class="content">
    <div class="container-fluid">
      <div class="row">
        <app-form-component
          :formGroupProps="content.formGroupForSelectGroup"
        >
        </app-form-component>

        <app-form-component
          :formGroupProps="content.formGroupForSelectTemplate"
        >
        </app-form-component>

        <app-button-component
          :buttonProps="content.buttonGroupForCreateMeeting"
          @goBackPage="emitter.emit('goBackPage')"
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
            class: "col-12",
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
        buttonGroupForCreateMeeting: {
          buttons: [
            {
              class: "btn btn-block btn-secondary my-2 mr-3",
              clickEvent: "goBackPage",
              innerHtml: "Geri Dön",
            },
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
            class: "col-12 d-flex justify-content-center align-items-center",
          },
        },
      },
    };
  },
  methods: {
    sendMeeting(buttonEvent) {
      const targetElemContentArray = buttonEvent.target.innerHTML.split(" ");
      targetElemContentArray.splice(targetElemContentArray.length - 1, 1);
      this.emitter.emit("fireToast", [
        `${targetElemContentArray.join(" ")} Başarıyla Gönderildi.`,
        "success",
        2000,
      ]);
    }
  },
});
</script>
  
  <style>
</style>