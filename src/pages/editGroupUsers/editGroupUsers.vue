<template>
  <div class="content-header">
    <div class="container-fluid">
      <content-header-component
        :headerObj="content.header"
      ></content-header-component>
    </div>
  </div>

  <section class="content">
    <div class="container-fluid">
      <data-table-component :dataTableProps="content.dataTableProps"></data-table-component>
    </div>
  </section>
</template>
  
<script>
import { defineComponent } from "vue";
import ContentHeaderComponent from "@/components/content/header/header.vue";
import DataTableComponent from "@/components/content/content/mixed/custom/dataTable/dataTable.vue"

export default defineComponent({
  components: {
    ContentHeaderComponent,
    DataTableComponent
  },
  data() {
    return {
      content: {
        header: {
          name: "Grup Kişileri Düzenle",
        },
        dataTableProps : {
          axios : {
            url : "https://jsonplaceholder.typicode.com/posts"
          }
        }
      },
    };
  }
});
</script>

<style>
</style>