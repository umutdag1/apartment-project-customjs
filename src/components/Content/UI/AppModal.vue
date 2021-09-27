<template>
  <div
    class="modal fade"
    id="myModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="ModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">New message</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            @click="$emit('resetModalProp')"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <app-input-component
            :inputProps="inputGroupForUpdateUser"
            @userInput="axiosRequest.request.userInput = $event"
          ></app-input-component>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="$emit('resetModalProp')">
            Close
          </button>
          <app-button-component
            :buttonProps="buttonGroup"
            @sendToUpdate="sendToUpdate"
          >
          </app-button-component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import $ from "jquery";
import AppInputComponent from "@/components/Content/Form/AppInput.vue";
import AppButtonComponent from "@/components/Content/UI/AppButton.vue";

export default defineComponent({
  components: {
    AppInputComponent,
    AppButtonComponent,
  },
  props: {
    modalProps: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      axiosRequest: {
        request: {
          userInput: {},
        },
      },
      inputGroupForUpdateUser: {
        content: [],
        encapsulationElem: {
          class: "col-md-6",
        },
      },
      buttonGroup: {
        buttons: [
          {
            class: "btn btn-secondary",
            clickEvent: "sendToUpdate",
            innerHtml: "Kaydet",
          },
        ],
        encapsulationElem: {
          class: "",
        },
      },
    };
  },
  methods: {
    sendToUpdate() {
      const axiosRequestParams = {
        name: "isUserUpdated",
        data: JSON.stringify(this.axiosRequest.request.userInput),
        url: this.$store.getters.getRequestEndPoint + "edituser/" + this.modalProps.data["id"],
        config: {
          headers: {
            "Content-Type": "application/json",
          },
        },
        toastMessages: {
          success: "Kayıt Başarıyla Kaydedildi.",
          warning: null,
          error: "Kayıt Kaydedilemedi.",
        },
      };

      //console.log(axiosRequestParams);

      this.$store.dispatch("makePutRequest", {
        axiosRequestParams,
      });
    },
  },
  computed : {
    getResponse(){
      return this.$store.getters.axiosRequestResponse["isUserUpdated"];
    }
  },
  watch: {
    getResponse(val){
      if(val.success === 1){
        this.$emit("relaodData");
      }
    },
    modalProps: {
      handler(val) {
        //this.data = val;
        console.log(val);
        const filteredKeys = Object.keys(val.data).filter(
          (key) => key !== "id"
        );
        const inputs = filteredKeys.map((dataKey) => {
          return {
            attribute: {
              type: "text",
              targetType: null,
              outerClass: "input-group mb-3",
              innerClass: "form-control",
              required: true,
              pattern: null,//"^([a-zA-ZğüşöçıIİĞÜŞÖÇ]|\\s)*$",
              invalidMessage: "Yanlızca Harf Kullanınız",
            },
            name: `${val.data[dataKey]}`,
            column: `${dataKey}`,
            icon: null,
          };
        });
        console.log(inputs);
        this.inputGroupForUpdateUser.content = inputs;
        $("#myModal").modal("show");
      },
      deep: true,
    },
  },
});
</script>