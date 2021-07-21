<template>
  <div class="wrapper">
    <app-header @toggle-menu-sidebar="toggleMenuSidebar"></app-header>
    <menu-sidebar></menu-sidebar>
    <div class="content-wrapper">
      <router-view></router-view>
    </div>
    <app-footer></app-footer>
  </div>
</template>
<script>
import { defineComponent } from "@vue/runtime-core";
import Header from "./header/header.vue";
import MenuSidebar from "./menu-sidebar/menu-sidebar.vue";
import Footer from "./footer/footer.vue";

export default defineComponent({
  data() {
    return {
      appElement: null,
    };
  },
  unmounted(){
    (this.appElement).classList.remove("sidebar-mini");
    (this.appElement).classList.remove("layout-fixed");
  },
  mounted() {
    this.appElement = document.getElementById("app");
    this.appElement.classList.add("sidebar-mini");
    this.appElement.classList.add("layout-fixed");
  },
  methods: {
    toggleMenuSidebar() {
      const isCollapsed = (this.appElement).classList.contains(
        "sidebar-collapse"
      );
      if (isCollapsed) {
        (this.appElement).classList.remove("sidebar-collapse");
      } else {
        (this.appElement).classList.add("sidebar-collapse");
      }
    },
  },
  components: {
    "app-header": Header,
    "menu-sidebar": MenuSidebar,
    "app-footer": Footer,
  },
});
</script>
<style></style>
