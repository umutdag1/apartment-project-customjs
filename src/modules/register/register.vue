<template>
  <div class="register-box">
    <div class="card card-outline card-primary">
      <div class="card-header text-center">
        <a href="../../index2.html" class="h1"><b>Admin</b>LTE</a>
      </div>
      <div class="card-body">
        <p class="login-box-msg">Kayıt Ol</p>

        <app-input-component
          :inputProps="content.inputGroupForRegisterNewUser"
          @userInput="userInput = $event"
        ></app-input-component>

        <div class="row">
          <div class="col-8">
            <div class="icheck-primary">
              <input
                type="checkbox"
                id="agreeTerms"
                name="terms"
                value="agree"
              />
              <label for="agreeTerms">
                <a href="#">Şartları</a> kabul ediyorum
              </label>
            </div>
          </div>
          
          <div class="col-4">
            <button
              type="submit"
              @click="register"
              class="btn btn-primary btn-block"
            >
              Kayıt Ol
            </button>
          </div>
        </div>

        <router-link to="/login" class="text-center">
          Zaten üyeliğim var
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import AppInputComponent from "@/components/Content/Form/AppInput.vue";

export default defineComponent({
  components: {
    AppInputComponent,
  },
  data() {
    return {
      appElement: null,
      userInput: {},
      content: {
        inputGroupForRegisterNewUser: {
          content: [
            {
              type: "text",
              name: "Kişi Adı",
              column: "first_name",
              icon: "fas fa-user",
            },
            {
              type: "text",
              name: "Kişi Soyadı",
              column: "last_name",
              icon: "fas fa-user",
            },
            {
              type: "text",
              name: "Kişi Adresi",
              column: "address",
              icon: "fas fa-map-marker-alt",
            },
            {
              type: "text",
              name: "Kişi Doğum Tarihi",
              column: "birth_date",
              icon: "fas fa-calendar",
            },
            {
              type: "tel",
              name: "Kişi Telefon Numarası",
              column: "gsm_number",
              icon: "fas fa-phone",
            },
            {
              type: "text",
              name: "Kişi E-posta Adresi",
              column: "email",
              icon: "fas fa-envelope",
            },
            {
              type: "password",
              name: "Şifre",
              column: "password",
              icon: "fas fa-lock",
            },
            {
              type: "password",
              name: "Şifre Tekrar",
              column: "passwordConf",
              icon: "fas fa-lock",
            },
          ],
          encapsulationElem: {
            class: "col-12",
          },
        },
      },
    };
  },
  mounted() {
    this.appElement = document.getElementById("app");
    this.appElement.classList.add("register-page");
  },
  unmounted() {
    this.appElement.classList.remove("register-page");
  },
  methods: {
    register(e) {
      e.preventDefault();
      console.log(this.userInput);
      //this.$router.push("/");
    },
  },
});
</script>
<style></style>
