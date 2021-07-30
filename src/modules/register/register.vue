<template>
  <div class="register-box">
    <div class="card card-outline card-primary">
      <div class="card-header text-center">
        <a href="../../index2.html" class="h1"><b>Yasal </b>Çağrı</a>
      </div>
      <div class="card-body">
        <p class="login-box-msg">Kayıt Ol</p>

        <form @submit.prevent="submitForm" ref="form">
          <app-input-component
            :inputProps="content.inputGroupForRegisterNewUser"
            @userInput="user = $event"
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

            <app-button-component
              :buttonProps="content.buttonGroupForSubmit"
            ></app-button-component>
          </div>
        </form>

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
import AppButtonComponent from "@/components/Content/UI/AppButton.vue";

export default defineComponent({
  components: {
    AppInputComponent,
    AppButtonComponent,
  },
  data() {
    return {
      appElement: null,
      user: {
        input: {},
      },
      content: {
        inputGroupForRegisterNewUser: {
          content: [
            {
              type: "text",
              required: true,
              name: "Ad",
              column: "first_name",
              icon: "fas fa-user",
            },
            {
              type: "text",
              required: true,
              name: "Soyad",
              column: "last_name",
              icon: "fas fa-user",
            },
            {
              type: "text",
              required: true,
              name: "Adres",
              column: "address",
              icon: "fas fa-map-marker-alt",
            },
            {
              type: "text",
              required: true,
              name: "Doğum Tarihi",
              column: "birth_date",
              icon: "fas fa-calendar",
            },
            {
              type: "text",
              required: true,
              pattern: "[0-9]{3}[0-9]{3}[0-9]{4}",
              invalidMessage:
                "Başında '0' rakamı olmadan 10 haneli telefon numaranızı giriniz ",
              name: "Telefon Numarası",
              column: "gsm_number",
              icon: "fas fa-phone",
            },
            {
              type: "email",
              required: true,
              name: "E-posta Adresi",
              column: "email",
              icon: "fas fa-envelope",
            },
            {
              type: "password",
              required: true,
              pattern: "^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*).{8,}$",
              invalidMessage : "Geçerli karakterler giriniz.",
              name: "Şifre",
              column: "password",
              icon: "fas fa-lock",
            },
            {
              type: "password",
              required: true,
              pattern: "^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*).{8,}$",
              invalidMessage : "Geçerli karakterler giriniz.",
              name: "Şifre Tekrar",
              column: "password_conf",
              icon: "fas fa-lock",
            },
          ],
          encapsulationElem: {
            class: "col-12 px-0",
          },
        },
        buttonGroupForSubmit: {
          buttons: [
            {
              class: "btn btn-primary btn-block",
              clickEvent: "",
              type: "submit",
              innerHtml: "Kayıt Ol",
            },
          ],
          encapsulationElem: {
            class: "col-4",
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
    submitForm(e) {
      e.preventDefault();
      
      if(this.user.input.password !== this.user.input.password_conf){
        this.$store.dispatch("fireToast", {
          message : "Şifreler Eşleşmiyor",
          type : "warning",
          duration : 1000
        });
      } else {
        //Request
        console.log(e);
      }
    },
  },
});
</script>

<style></style>
