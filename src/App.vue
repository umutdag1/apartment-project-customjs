<template>
  <router-view />
</template>

<script>
export default {
  mounted() {
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
      document.head.appendChild(scriptElem);
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
};
</script>

<style>
</style>