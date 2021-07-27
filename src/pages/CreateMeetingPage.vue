<template>
  <div class="content-header">
    <div class="container-fluid">
      <content-header-component
        :headerObj="content.header"
      ></content-header-component>
    </div>
  </div>
  <section class="content">
    <div class="container-fluid">
      <div class="row">
        <content-form-group-component
          :formGroupProps="content.formGroupForSelectGroup"
        >
        </content-form-group-component>

        <content-form-group-component
          :formGroupProps="content.formGroupForSelectTemplate"
        >
        </content-form-group-component>

        <button-group-component
          :buttonProps="content.buttonGroupForCreateMeeting"
          @goBackPage="emitter.emit('goBackPage')"
          @sendBySMS="sendMeeting($event)"
          @sendByReturnReceipt="sendMeeting($event)"
          @sendByEmail="sendMeeting($event)"
        ></button-group-component>
      </div>
    </div>
  </section>
</template>
  
  <script>
import { defineComponent } from "vue";
import ContentHeaderComponent from "@/components/content/header/header.vue";
import ContentFormGroupComponent from "@/components/content/content/mixed/custom/group/formGroup.vue";
import ButtonGroupComponent from "@/components/content/content/mixed/custom/group/buttonGroup.vue";

export default defineComponent({
  components: {
    ContentHeaderComponent,
    ContentFormGroupComponent,
    ButtonGroupComponent,
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
      userInput: {},
      editor: {
        data: "",
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