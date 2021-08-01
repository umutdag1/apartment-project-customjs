<template>
  <div :class="dataTableProps.encapsulationElem.class">
    <table class="table table-hover table-bordered w-100" id="dataTable">
      <app-data-table-head-component
        :tableHeads="table.heads"
      ></app-data-table-head-component>
      <app-data-table-body-component
        :tableDataProps="table.data"
        @callDataTable="createDataTable()"
      >
        <template v-slot:checkbox>
          <app-input-component
            :inputProps="content.inputCheckbox"
          ></app-input-component>
        </template>
      </app-data-table-body-component>
    </table>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net/js/jquery.dataTables.min";
import "datatables.net/js/jquery.dataTables.checkboxes.min";
import "datatables.net/css/dataTables.checkboxes.css";
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
import AppInputComponent from "@/components/Content/Form/AppInput.vue";
export default defineComponent({
  components: {
    AppDataTableHeadComponent,
    AppDataTableBodyComponent,
    AppInputComponent,
  },
  props: {
    dataTableProps: {
      required: true,
      type: Object,
    },
  },
  setup() {
    const table = ref({
      heads: [``, `ID`, `Title`, `Body`],
      data: {
        keys: null,
        values: null,
      },
    });

    table.value.data.keys = table.value.heads.map((head) => head.toLowerCase());
    console.log(table.value.heads);

    return { table };
  },
  data() {
    return {
      content: {
        inputCheckbox: {
          content: [
            {
              attribute: {
                type: "checkbox",
                targetType: null,
                required: null,
                pattern: null,
                invalidMessage: null,
              },
              name: "Checkbox",
              column: "checkbox",
              icon: null,
            },
          ],
          encapsulationElem: {
            class: "col-12",
          },
        },
      },
    };
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
          columnDefs: [
            {
              targets: 0,
              checkboxes: {
                selectRow: true,
              },
            },
          ],
          select: {
            style: "multi",
          },
          order: [[1, "asc"]],
          fnInitComplete: function (/*oSettings, json*/) {
            $("#dataTable_filter").html(
              '<div class="row overflow-auto"></div>'
            );
            $("#dataTable thead tr th").each(function (i) {
              const title = $(this).text();
              const dataTableColumnLength = $("#dataTable thead tr th").length;
              $("#dataTable_filter .row").append(
                `<div class="col-md-${12 / dataTableColumnLength} my-1 px-2">
                <input type="text" class="w-100" placeholder="Search ${title}" />
              </div>`
              );
              $("input[type=text]", this).on("keyup change", function () {
                if (table.column(i).search() !== this.value) {
                  table.column(i).search(this.value).draw();
                }
              });
            });
          },
        });
        table
          .on("click", "th.select-checkbox", function () {
            if ($("th.select-checkbox").hasClass("selected")) {
              table.rows().deselect();
              $("th.select-checkbox").removeClass("selected");
            } else {
              table.rows().select();
              $("th.select-checkbox").addClass("selected");
            }
          })
          .on("select deselect", function () {
            ("Some selection or deselection going on");
            if (
              table
                .rows({
                  selected: true,
                })
                .count() !== table.rows().count()
            ) {
              $("th.select-checkbox").removeClass("selected");
            } else {
              $("th.select-checkbox").addClass("selected");
            }
          });
      });
    },
  },
  mounted() {
    window.JSZip = jsZip;
    //API Call

    this.table.data.values = this.$options.__file;

    const axiosRequestParams = {
      name: this.$options.__file,
      url: this.dataTableProps.axios.url,
      config: {},
      toastMessages: null,
    };

    this.$store.dispatch("makeGetRequest", {
      axiosRequestParams,
    });

    /*
    this.axios.get(this.dataTableProps.axios.url).then((res) => {
      this.table.data.values = res.data;
      this.createDataTable();
    });
    */
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
table.dataTable tr th.select-checkbox.selected::after {
  content: "✔";
  margin-top: -11px;
  margin-left: -4px;
  text-align: center;
  text-shadow: rgb(176, 190, 217) 1px 1px, rgb(176, 190, 217) -1px -1px,
    rgb(176, 190, 217) 1px -1px, rgb(176, 190, 217) -1px 1px;
}
</style>