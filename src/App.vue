<template>
  <router-view />
</template>

<script>
import { defineComponent } from "vue";


export default defineComponent({
  data() {
    return {
      loader: null,
    };
  },
  created() {
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
  beforeMount() {
    this.loader = this.$loading.show({
      container: null,
      opacity: 1,
      canCancel: false,
    });
  },
  mounted() {
    const url = "https://umutrobin.loca.lt/user-api/";
    this.$store.dispatch("setVueThisObj",this);
    this.$store.dispatch("setEndPoint",url);

    setTimeout(() => {
      this.loader.hide();
    }, 1000);
  },
});
</script>

<style>
</style>