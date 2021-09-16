<template>
  <div class="login-box">
    <div class="card card-outline card-primary">
      <div class="card-header text-center">
        <a href="../../index2.html" class="h1"><b>Yasal </b>Çağrı</a>
      </div>
      <div class="card-body">
        <p class="login-box-msg">Giriş Yap</p>

        <form @submit="submitForm">
          <app-input-component
            :inputProps="content.inputGroupForLoginUser"
            @userInput="axiosRequest.request.userInput = $event"
          ></app-input-component>

          <div class="row">
            <div class="col-8">
              <div class="icheck-primary">
                <input type="checkbox" id="remember" />
                <label for="remember"> Beni Hatırla </label>
              </div>
            </div>

            <div class="col-4">
              <button
                type="submit"
                class="btn btn-primary btn-block"
                @click="login"
              >
                Giriş Yap
              </button>
            </div>
          </div>
        </form>

        <p class="mb-1">
          <router-link to="/forgot-password"> Şifremi Unuttum </router-link>
        </p>
        <p class="mb-0">
          <router-link to="/register" class="text-center">
            Kayıt Ol
          </router-link>
        </p>
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
      axiosRequest: {
        request: {
          userInput: {},
        },
        response: null,
      },
      content: {
        inputGroupForLoginUser: {
          content: [
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
          ],
          encapsulationElem: {
            class: "col-12 px-0",
          },
        },
      },
    };
  },
  mounted() {
    this.appElement = document.getElementById("app");
    this.appElement.classList.add("login-page");
  },
  unmounted() {
    this.appElement.classList.remove("login-page");
  },
  methods: {
    submitForm(e) {
      e.preventDefault();

      const axiosRequestParams = {
        name: this.$options.__file,
        data: JSON.stringify(this.axiosRequest.request),
        url: this.$store.getters.getRequestEndPoint + "login",
        config: {
          headers: {
            "Content-Type": "application/json",
          },
        },
        toastMessages: {
          success: "Başarıyla Giriş Yaptınız.",
          warning: null,
          error: "Giriş Yapamadınız.",
        },
      };

      console.log(this.axiosRequest.request);

      this.$store.dispatch("makePostRequest", {
        axiosRequestParams,
      });

      //this.$router.push("/");
    }
  },
  computed: {
    response() {
      return this.$store.getters.axiosRequestResponse[this.$options.__file];
    },
  },
  watch: {
    response(val) {
      console.log(val);
      const response = val.responseData;
      if(response.status === 200){
        this.$store.dispatch("changePage","/");
      }
    },
  },
});
</script>
<style>
</style>
