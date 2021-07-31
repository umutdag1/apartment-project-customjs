<template>
  <div :class="dataTableProps.encapsulationElem.class">
    <table class="table table-hover table-bordered w-100" id="dataTable">
      <app-data-table-head-component
        :tableHeads="table.heads"
      ></app-data-table-head-component>
      <app-data-table-body-component
        :tableDataProps="table.data"
      ></app-data-table-body-component>
    </table>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import jsZip from "jszip";
import "datatables.net-buttons-dt/js/buttons.dataTables";
import "datatables.net-buttons-dt/css/buttons.dataTables.min.css";
import "datatables.net-buttons/js/buttons.html5.min";
import "datatables.net-responsive-dt/js/responsive.dataTables.min";
import "datatables.net-responsive-dt/css/responsive.dataTables.min.css";
import $ from "jquery";

import AppDataTableHeadComponent from "@/components/Content/Table/AppDataTableHead.vue";
import AppDataTableBodyComponent from "@/components/Content/Table/AppDataTableBody.vue";

export default defineComponent({
  components: {
    AppDataTableHeadComponent,
    AppDataTableBodyComponent,
  },
  props: {
    dataTableProps: {
      required: true,
      type: Object,
    },
  },
  setup() {
    const table = ref({
      heads: ["ID", "Title", "Body"],
      data: {
        keys: null,
        values: null,
      },
    });

    table.value.data.keys = table.value.heads.map((head) => head.toLowerCase());

    return { table };
  },
  methods: {
    createDataTable() {
      this.$nextTick(() => {
        var table = $("#dataTable").DataTable({
          responsive: true,
          language: {
            url: "assets/custom/library/datatable/language/Turkish.json",
          },
          orderCellsTop: true,
          fixedHeader: true,
          fnInitComplete: function (/*oSettings, json*/) {
            $("#dataTable_filter").html('<div class="row overflow-auto"></div>');
            $("#dataTable thead tr th").each(function (i) {
              const title = $(this).text();
              const dataTableColumnLength = $("#dataTable thead tr th").length;
              $("#dataTable_filter .row").append(
                `<div class="col-md-${12 / dataTableColumnLength} my-1 px-2">
                <input type="text" class="w-100" placeholder="Search ${title}" />
              </div>`
              );
              $("input", this).on("keyup change", function () {
                if (table.column(i).search() !== this.value) {
                  table.column(i).search(this.value).draw();
                }
              });
            });
          },
        });
      });
    },
  },
  mounted() {
    window.JSZip = jsZip;
    //API Call
    
    this.axios.get(this.dataTableProps.axios.url).then((res) => {
      this.table.data.values = res.data;
      this.createDataTable();
    });
    /*
    //Server Side Rendering
    $("#dataTable").DataTable({
      processing: true,
      serverSide: true,
      dom: "Bfrtip",
      buttons: ["copyHtml5", "excelHtml5"],
      responsive: true
    });*/
  },
});
</script>

<style>
</style>