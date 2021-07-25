<template>
  <router-view />
</template>

<script>
export default {
  setup() {
    const scriptArr = [
      "assets/plugins/jquery/jquery.min.js",
      "assets/plugins/bootstrap/js/bootstrap.bundle.min.js",
      "assets/dist/js/adminlte.min.js",
      "assets/custom/js/script.js",
    ];

    let scriptIndex = 0;

    function addNextScriptToBody() {
      const scriptElem = document.createElement("script");
      scriptElem.setAttribute("src", scriptArr[scriptIndex++]);
      document.body.appendChild(scriptElem);
      scriptElem.addEventListener(
        "load",
        function () {
          if (scriptArr.length !== scriptIndex) {
            addNextScriptToBody();
          }
        },
        false
      );
    }

    addNextScriptToBody();
  },
  methods: {
    makePostRequest(request) {
      const vm = this;
      this.axios
        .post(request.url, request.data, request.config)
        .then(function (data) {
          vm.emitter.emit(request.name, {
            responseData: data,
            situation: "success",
            requestedData: request,
          });
          vm.fireToast(request.toastMessages.success, "success", 2000);
          console.log(data.data);
        })
        .catch(function (thrown) {
          if (thrown.__CANCEL__) {
            vm.fireToast(request.toastMessages.warning, "warning", 2000);
          } else {
            vm.emitter.emit(request.name, {
              responseData: [],
              situation: "error",
              requestedData: request,
            });
            vm.fireToast(request.toastMessages.error, "error", 2000);
          }
        });
    },
    makeGetRequest(request) {
      const vm = this;
      this.axios
        .get(request.url, request.config)
        .then(function (data) {
          vm.emitter.emit(request.name, {
            responseData: data,
            situation: "success",
          });
          vm.fireToast(request.toastMessages.success, "success", 2000);
          console.log(data.data);
        })
        .catch(function (thrown) {
          if (thrown.__CANCEL__) {
            vm.fireToast(request.toastMessages.warning, "warning", 2000);
          } else {
            vm.emitter.emit(request.name, {
              responseData: [],
              situation: "error",
            });
            vm.fireToast(request.toastMessages.error, "error", 2000);
          }
        });
    },
    fireToast(message, type, duration) {
      this.$toast.open({
        message: message,
        position: "top-right",
        type: type,
        duration: duration,
      });
    },
  },
  mounted() {
    this.emitter.on("fireToast", (data) => {
      this.fireToast(...data);
    });
    this.emitter.on("makePostRequest", (request) => {
      this.makePostRequest(request)
    });
    this.emitter.on("makeGetRequest", (request) => {
      this.makeGetRequest(request)
    });
  },
};
</script>

<style>
</style>