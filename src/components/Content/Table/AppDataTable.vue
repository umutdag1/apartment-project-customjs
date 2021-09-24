<template>
  <div :class="dataTableProps.encapsulationElem.class">
    <table class="table table-hover table-bordered w-100" id="dataTable">
      <app-data-table-head-component :tableHeads="tableProps.data.keys">
      </app-data-table-head-component>
      <app-data-table-body-component
        :tableDataProps="tableProps.data"
        @callEditUserFunc="editUser($event)"
      >
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
    const tableProps = ref({
      table: null,
      data: {
        keys: [],
        values: [],
      },
    });

    return { tableProps };
  },
  data() {
    return {
      search: {},
      isDataTableCreated: false,
    };
  },
  methods: {
    editUser(tableData) {
      this.$emit("sendToModal",tableData);
    },
    createDataTable() {
      const vm = this;
      this.$nextTick(() => {
        /*var table = */ this.tableProps.table = $("#dataTable").DataTable({
          responsive: true,
          language: {
            url: "assets/custom/library/datatable/language/Turkish.json",
          },
          orderCellsTop: true,
          fixedHeader: true,
          columnDefs: [
            {
              targets: 1,
              checkboxes: {
                selectRow: false,
              },
            },
          ],
          select: {
            style: "multi",
          },
          order: [[1, "asc"]],
          fnInitComplete: function (/*oSettings, json*/) {
            $("#dataTable_filter").html(
              '<div class="row justify-content-center align-items-center" id="datatable-filter"></div>'
            );
            $("#dataTable_filter").addClass("my-2");
            $("#dataTable_filter").css("float", "none");
            $("#dataTable_filter").css("text-align", "left");
            $("#dataTable_length").css("float", "none");
            $("#dataTable_length").css("text-align", "center");
            $("#dataTable thead tr th").each(function (/*i*/) {
              const title = $(this).text();
              const tableFilterValue = vm.search[title] ? vm.search[title] : "";
              if (title !== "") {
                $("#dataTable_filter #datatable-filter").append(
                  `<div class="col-md-auto my-1 mx-2">
                <input type="text" class="w-100" placeholder="Search ${title}" id="${title}" value="${tableFilterValue}"/>
              </div>`
                );
              }
            });
            $(`<div class="offset-md-4 col-md-4 my-3">
                <button type="button" class="btn btn-block btn-primary" id="submitBtn">Ara</button>
              </div>`).insertAfter("#dataTable_filter #datatable-filter");
            $("#dataTable_filter input[type=text]").on("keyup", function () {
              vm.search[this.id] = this.value;
            });
            $("#dataTable_filter #submitBtn").click(function () {
              const keysArr = Object.keys(vm.search);
              const params = keysArr
                .reduce((result, key) => {
                  if (vm.search[key] !== "") {
                    result.push(`${key}=${vm.search[key]}`);
                  }
                  return result;
                }, [])
                .join("&");
              const axiosRequestParams = {
                name: vm.$options.__file,
                url: vm.dataTableProps.axios.url + `?${encodeURI(params)}`,
                config: {},
                toastMessages: null,
              };
              vm.$store.dispatch("makeGetRequest", {
                axiosRequestParams,
              });
            });
          },
        });
      });
    },
    addColumnToDataTable(columnsArr, columnNameArr, where) {
      if (where === "toBeginning") {
        columnsArr.unshift(...columnNameArr);
      } else if (where === "toEnding") {
        columnsArr.push(...columnNameArr);
      }
    },
    reloadDataTable() {
      this.tableProps.table.destroy();
      this.createDataTable();
    },
  },
  mounted() {
    window.JSZip = jsZip;
    /*if (this.dataTableProps.axios.request.group_id !== "") {
      const axiosRequestParams = {
        name: this.$options.__file,
        url:
          this.dataTableProps.axios.url +
          "/" +
          this.dataTableProps.axios.request.group_id,
        config: {},
        toastMessages: null,
      };

      this.$store.dispatch("makeGetRequest", {
        axiosRequestParams,
      });
    }*/
  },
  computed: {
    response() {
      return this.$store.getters.axiosRequestResponse[this.$options.__file];
    },
  },
  watch: {
    dataTableProps: {
      handler(val) {
        if (val.axios.request.group_id !== "") {
          const axiosRequestParams = {
            name: this.$options.__file,
            url: val.axios.url + "/" + val.axios.request.group_id,
            config: {},
            toastMessages: null,
          };

          this.$store.dispatch("makeGetRequest", {
            axiosRequestParams,
          });
        }
      },
      deep: true,
    },
    response(val) {
      const responseData = val.responseData.data;
      console.log(responseData);
      if (this.isDataTableCreated) {
        this.reloadDataTable();
      }
      if (responseData.length > 0) {
        let newResponseData = [];
        Array.isArray(responseData)
          ? (newResponseData = responseData)
          : newResponseData.push(responseData);
        const heads = Object.keys(newResponseData[0]);
        this.addColumnToDataTable(heads, ["", ""], "toBeginning");
        this.tableProps.data.keys = heads;
        this.tableProps.data.values = newResponseData;
        
        if (!this.isDataTableCreated) {
          this.isDataTableCreated = true;
          this.createDataTable();
        }
      } else {
        this.tableProps.data.values = [];
      }
    },
  },
});
</script>

<style>
</style>