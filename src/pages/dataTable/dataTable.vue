<template>
  <!-- Content Header (Page header) -->
  <div class="content-header">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6">
          <h1 class="m-0">Toplantı Şablonu Oluştur</h1>
        </div>
        <!-- /.col -->
        <div class="col-sm-6">
          <ol class="breadcrumb float-sm-right">
            <li class="breadcrumb-item">
              <router-link to="/">Home</router-link>
            </li>
            <li class="breadcrumb-item active">Editor Template</li>
          </ol>
        </div>
        <!-- /.col -->
      </div>
      <!-- /.row -->
    </div>
    <!-- /.container-fluid -->
  </div>
  <!-- /.content-header -->

  <!-- Main content -->
  <section class="content">
    <div class="container-fluid">
      <!-- Small boxes (Stat box) -->
      <table class="table table-hover table-bordered w-100" id="dataTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
            <th>UserID</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.title }}</td>
            <td>{{ user.body }}</td>
            <td>{{ user.userId }}</td>
          </tr>
        </tbody>
      </table>
      <!-- /.row -->
    </div>
    <!-- /.container-fluid -->
  </section>
  <!-- /.content -->
</template>
  
<script>
import { defineComponent } from "vue";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import jsZip from "jszip";
import "datatables.net-buttons-dt/js/buttons.dataTables";
import "datatables.net-buttons-dt/css/buttons.dataTables.min.css";
import "datatables.net-buttons/js/buttons.html5.min";
import "datatables.net-responsive-dt/js/responsive.dataTables.min";
import "datatables.net-responsive-dt/css/responsive.dataTables.min.css";
import $ from "jquery";

export default defineComponent({
  mounted() {
    window.JSZip = jsZip;
    //API Call
    this.axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
      this.users = res.data;
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
  methods: {
    createDataTable() {
      this.$nextTick(() => {
        var table = $("#dataTable").DataTable({
          //dom: "Bfrtip",
          //buttons: ["copyHtml5", "excelHtml5"],
          responsive: true,
          language: {
            url: "assets/custom/library/datatable/language/Turkish.json",
          },
          searching: false,
          orderCellsTop: true,
          autoWidth : false,
          fixedHeader: true,
        });
        $("#dataTable thead tr").clone(true).appendTo("#dataTable thead");
        $("#dataTable thead tr:eq(1) th").each(function (i) {
          var title = $(this).text();
          $(this).html(
            '<input type="text" class="w-100" placeholder="Search ' + title + '" />'
          );

          $("input", this).on("keyup change", function () {
            if (table.column(i).search() !== this.value) {
              table.column(i).search(this.value).draw();
            }
          });
        });
      });
    },
  },
  data() {
    return {
      users: [],
    };
  },
});
</script>

<style>
</style>