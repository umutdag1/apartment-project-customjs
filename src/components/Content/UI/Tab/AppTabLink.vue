<template>
  <h3 class="card-title p-3">{{ activeTab.linkSubject }}</h3>
  <ul class="nav nav-pills ml-auto p-2">
    <li
      class="nav-item"
      v-for="tabIndex in tabLinksProps.links.length"
      :key="tabIndex"
    >
      <a
        class="nav-link"
        :class="{
          active: tabIndex - 1 === 0,
        }"
        :href="`#tab_${tabIndex}`"
        data-toggle="tab"
        @click="changeTab"
        >{{ tabLinksProps.links[tabIndex - 1].linkContent }}</a
      >
    </li>
  </ul>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    tabLinksProps: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      activeTab: {
        linkContent: "Dosya Ekle",
        linkSubject: "Excel Dosya Ekleme",
      },
    };
  },
  methods: {
    changeTab(e) {
      const targetID = e.target.href.slice(e.target.href.indexOf("#"));
      const targetIDLastIndexAsNumber = Number(
        targetID.charAt(targetID.length - 1)
      );

      this.activeTab.linkContent =
        this.tabLinksProps.links[targetIDLastIndexAsNumber - 1].linkContent;
      this.activeTab.linkSubject =
        this.tabLinksProps.links[targetIDLastIndexAsNumber - 1].linkSubject;

    },
  },
});
</script>

<style>
</style>