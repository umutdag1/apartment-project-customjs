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
              attribute: {
                type: "text",
                outerClass: "input-group mb-3",
                innerClass: "form-control",
                targetType: null,
                required: true,
                pattern: "^([a-zA-ZğüşöçıIİĞÜŞÖÇ]|\\s)*$",
                invalidMessage: "Yanlızca Harf Kullanınız",
              },
              name: "Ad",
              column: "first_name",
              icon: "fas fa-user",
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
              name: "Soyad",
              column: "last_name",
              icon: "fas fa-user",
            },
            {
              attribute: {
                type: "text",
                targetType: null,
                outerClass: "input-group mb-3",
                innerClass: "form-control",
                required: true,
                pattern: "^([a-zA-Z0-9ğüşöçıIİĞÜŞÖÇ]|\\s)*$",
                invalidMessage: "Yanlızca Harf ve Rakam Kullanınız",
              },
              name: "Adres",
              column: "address",
              icon: "fas fa-map-marker-alt",
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
              name: "Doğum Tarihi",
              column: "birth_date",
              icon: "fas fa-calendar",
            },
            {
              attribute: {
                type: "text",
                targetType: null,
                outerClass: "input-group mb-3",
                innerClass: "form-control",
                required: true,
                pattern: "[0-9]{3}[0-9]{3}[0-9]{4}",
                invalidMessage:
                  "Başında '0' rakamı olmadan 10 haneli telefon numaranızı giriniz",
              },
              name: "Telefon Numarası",
              column: "gsm_number",
              icon: "fas fa-phone",
            },
            {
              attribute: {
                type: "text",
                targetType: null,
                outerClass: "input-group mb-3",
                innerClass: "form-control",
                required: true,
                pattern:
                  "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?",
                invalidMessage: "Geçerli bir email giriniz.",
              },
              name: "E-posta Adresi",
              column: "email",
              icon: "fas fa-envelope",
            },
            {
              attribute: {
                type: "password",
                targetType: null,
                outerClass: "input-group mb-3",
                innerClass: "form-control",
                required: true,
                pattern: "^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*).{8,}$",
                invalidMessage:
                  "En az 8 karakter ve Geçerli karakterler giriniz.",
              },
              name: "Şifre",
              column: "password",
              icon: "fas fa-lock",
            },
            {
              attribute: {
                type: "password",
                targetType: null,
                outerClass: "input-group mb-3",
                innerClass: "form-control",
                required: true,
                pattern: "^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*).{8,}$",
                invalidMessage:
                  "En az 8 karakter ve Geçerli karakterler giriniz.",
              },
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
      //Request
      const axiosRequestParams = {
        name: this.$options.__file,
        data: JSON.stringify(this.user.input),
        url: "https://reqres.in/api/users",
        config: {
          headers: {
            "Content-Type": "application/json",
          },
        },
        toastMessages: {
          success: "Bilgileriniz Başarıyla Kayıt Edildi.",
          warning: null,
          error: "Bilgileriniz Kayıt Edilemedi.",
        },
      };

      this.$store.dispatch("makePostRequest", {
        axiosRequestParams,
      });
      
      console.log(JSON.stringify(this.user.input));
      console.log(e);
    },
  },
});
</script>

<style></style>
