<template>
  <div class="content-header">
    <div class="container-fluid">
      <app-header-component :headerObj="content.header"></app-header-component>
    </div>
  </div>
  <section class="content">
    <div class="container-fluid">
      <form class="col-12" @submit.prevent="sendMeeting" ref="form">
        <div class="row">
          <app-input-component
            :inputProps="content.inputGroupForCreateMeeting"
            @userInput="axiosRequest.request.userInput = $event"
            ref="inputRef"
          ></app-input-component>

          <app-form-component
            :formGroupProps="content.formGroupForSelectGroup"
            @selectedOption="axiosRequest.request.group_name = $event"
          >
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
            @selectedOption="axiosRequest.request.template_name = $event"
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
            @sendBySMS="sendingButtonEvent = $event"
            @sendByReturnReceipt="sendingButtonEvent = $event"
            @sendByEmail="sendingButtonEvent = $event"
          ></app-button-component>
        </div>
      </form>
    </div>
  </section>
</template>
  
  <script>
import { defineComponent } from "vue";
import AppHeaderComponent from "@/components/Header/AppHeader.vue";
import AppFormComponent from "@/components/Content/Form/AppForm.vue";
import AppButtonComponent from "@/components/Content/UI/AppButton.vue";
import AppInputComponent from "@/components/Content/Form/AppInput.vue";

export default defineComponent({
  components: {
    AppHeaderComponent,
    AppFormComponent,
    AppButtonComponent,
    AppInputComponent,
  },
  data() {
    return {
      axiosRequest: {
        request: {
          group_name : "",
          template_name : "",
          userInput: {},
        },
        response: null,
      },
      sendingButtonEvent: null,
      buttonEventToAddItsContent: new PointerEvent(""),
      content: {
        header: {
          name: "Toplantı Oluştur",
        },
        inputGroupForCreateMeeting: {
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
              name: "Toplantı Konusu",
              column: "subject",
              icon: null,
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
              name: "Toplantı Yeri",
              column: "location",
              icon: null,
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
              name: "Toplantı Tarihi",
              column: "date",
              icon: null,
            },
            {
              attribute: {
                type: "text",
                targetType: "time",
                outerClass: "input-group mb-3",
                innerClass: "form-control",
                required: true,
                pattern: null,
                invalidMessage: null,
              },
              name: "Toplantı Saati",
              column: "time",
              icon: null,
            },
          ],
          encapsulationElem: {
            class: "col-md-6",
          },
        },
        formGroupForSelectGroup: {
          labelName: "Grup Seç",
          outerClass: "form-group",
          innerClass: "form-control",
          required: true,
          options: [
            {
              name: "Group1",
            },
            {
              name: "Group2",
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
              type: "button",
              clickEvent: "goEditGroupUsersPage",
              innerHtml: "Düzenle",
            },
            {
              class: "btn btn-block btn-primary my-1 mr-1",
              type: "button",
              clickEvent: "goCreateGroupPage",
              innerHtml: "Oluştur",
            },
            {
              class: "btn btn-block btn-danger my-1",
              type: "button",
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
          outerClass: "form-group",
          innerClass: "form-control",
          required: true,
          options: [
            {
              name: "Şablon1",
            },
            {
              name: "Şablon2",
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
              type: "button",
              clickEvent: "goEditMeetingTemplatePage",
              innerHtml: "Düzenle",
            },
            {
              class: "btn btn-block btn-primary my-1",
              type: "button",
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
              type: "submit",
              clickEvent: "sendBySMS",
              innerHtml: "SMS Gönder",
            },
            {
              class: "btn btn-block btn-primary my-2 mr-3",
              type: "submit",
              clickEvent: "sendByReturnReceipt",
              innerHtml: "İadeli Taahhütlü Gönder",
            },
            {
              class: "btn btn-block btn-success my-2",
              type: "submit",
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
    sendMeeting(e) {
      e.preventDefault();
      const targetElemContentArray =
        this.sendingButtonEvent.target.innerHTML.split(" ");
      targetElemContentArray.splice(targetElemContentArray.length - 1, 1);
      console.log(JSON.stringify(this.axiosRequest.request ));
      this.$store.dispatch("fireToast", {
        message: `${targetElemContentArray.join(" ")} Başarıyla Gönderildi.`,
        type: "success",
        duration: 2000,
      });
    },
  },
});
</script>
  
  <style>
</style>