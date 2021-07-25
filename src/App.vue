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
    makePostRequest(configParams) {
      const vm = this;
      const axiosRequestParams = configParams.axiosRequestParams;
      const requestedObjParams = configParams.currentObjParams;
      this.axios
        .post(
          axiosRequestParams.url,
          axiosRequestParams.data,
          axiosRequestParams.config
        )
        .then(function (data) {
          vm.emitter.emit(axiosRequestParams.name, {
            responseData: data,
            situation: "success",
            requestedObjParams,
          });
          vm.fireToast(
            axiosRequestParams.toastMessages.success,
            "success",
            2000
          );
          console.log(data.data);
        })
        .catch(function (thrown) {
          if (thrown.__CANCEL__) {
            vm.fireToast(
              axiosRequestParams.toastMessages.warning,
              "warning",
              2000
            );
          } else {
            vm.emitter.emit(axiosRequestParams.name, {
              responseData: [],
              situation: "error",
              requestedObjParams,
            });
            vm.fireToast(axiosRequestParams.toastMessages.error, "error", 2000);
          }
        });
    },
    makeGetRequest(configParams) {
      const vm = this;
      const axiosRequestParams = configParams.axiosRequestParams;
      this.axios
        .get(axiosRequestParams.url, axiosRequestParams.config)
        .then(function (data) {
          vm.emitter.emit(axiosRequestParams.name, {
            responseData: data,
            situation: "success",
          });
          vm.fireToast(
            axiosRequestParams.toastMessages.success,
            "success",
            2000
          );
          console.log(data.data);
        })
        .catch(function (thrown) {
          if (thrown.__CANCEL__) {
            vm.fireToast(
              axiosRequestParams.toastMessages.warning,
              "warning",
              2000
            );
          } else {
            vm.emitter.emit(axiosRequestParams.name, {
              responseData: [],
              situation: "error",
            });
            vm.fireToast(axiosRequestParams.toastMessages.error, "error", 2000);
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
    this.emitter.on("makePostRequest", (configParams) => {
      this.makePostRequest(configParams);
    });
    this.emitter.on("makeGetRequest", (configParams) => {
      this.makeGetRequest(configParams);
    });
  },
};
</script>

<style>
</style>