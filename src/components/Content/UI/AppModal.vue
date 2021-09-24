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
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <app-input-component
            :inputProps="inputGroupForUpdateUser"
            @userInput="axiosRequest.request.userInput = $event"
            ref="inputRef"
          ></app-input-component>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
          <button type="button" class="btn btn-primary">Send message</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import $ from "jquery";
import AppInputComponent from "@/components/Content/Form/AppInput.vue";

export default defineComponent({
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
    };
  },
  components: {
    AppInputComponent,
  },
  props: {
    modalProps: {
      type: Object,
      required: true,
    },
  },
  watch: {
    modalProps: {
      handler(val) {
        //this.data = val;
        console.log(val);
        const inputs = Object.keys(val.data).map((dataKey) => {
          return {
            attribute: {
              type: "text",
              targetType: null,
              outerClass: "input-group mb-3",
              innerClass: "form-control",
              required: true,
              pattern: "^([a-zA-ZğüşöçıIİĞÜŞÖÇ]|\\s)*$",
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