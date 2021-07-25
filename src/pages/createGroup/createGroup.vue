<template>
  <!-- Content Header (Page header) -->
  <div class="content-header">
    <div class="container-fluid">
      <content-header :headerObj="content.header"></content-header>
      <!-- /.row -->
    </div>
    <!-- /.container-fluid -->
  </div>
  <!-- /.content-header -->
  <!-- Main content -->
  <section class="content">
    <div class="container-fluid">
      <div class="row">
        <input-group
          :inputProps="content.inputGroupForAddNewGroup"
          @userInput="userInput = $event"
        ></input-group>
        <button-group
          :buttonProps="content.buttonGroupForAddNewGroup"
          @saveGroup="saveGroup"
          @nextPage="nextPage"
          @saveAndnextPage="saveAndnextPage"
        ></button-group>
      </div>
    </div>
    <!-- /.container-fluid -->
  </section>
  <!-- /.content -->
</template>
<script>
import { defineComponent } from "vue";
import ContentHeader from "@/components/content/header/header.vue";
import InputGroup from "@/components/content/content/inputGroup.vue";
import ButtonGroup from "@/components/content/content/buttonGroup.vue";
export default defineComponent({
  components: {
    ContentHeader,
    InputGroup,
    ButtonGroup,
  },
  data() {
    return {
      files: [],
      userInput: {},
      axiosRequest: {
        isRequestCanceledArr: [],
        isRequestContinuingStatusArr: [],
        cancelTokenArr: [],
      },
      content: {
        header: {
          name: "Grup Oluştur",
        },
        inputGroupForAddNewGroup: {
          name: ["Grup Adı"],
          encapsulationElem: {
            class: "col-md-12",
          },
        },
        buttonGroupForAddNewGroup: {
          buttons: [
            {
              class: "btn btn-block btn-secondary my-2 mr-2",
              clickEvent: "saveGroup",
              innerHtml: "Kaydet",
            },
            {
              class: "btn btn-block btn-primary my-2 mr-2",
              clickEvent: "nextPage",
              innerHtml: "Devam Et",
            },
            {
              class: "btn btn-block btn-success my-2",
              clickEvent: "saveAndnextPage",
              innerHtml: "Kaydet ve Devam Et",
            },
          ],
          encapsulationElem: {
            class: "col-md-12 d-flex justify-content-center align-items-center",
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
      },
    };
  },
  methods: {
    saveGroup() {
      console.log("Grup Kaydedildi");
      this.emitter.emit("fireToast", [
        "Grup İsmi Başarıyla Eklendi.",
        "success",
        2000,
      ]);
    },
    nextPage() {
      this.$router.push("dashboard");
    },
    saveAndnextPage() {
      this.saveGroup();
      this.nextPage();
    },
  },
});
</script>
        
<style>
</style>
    