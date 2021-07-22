<template>
  <!-- Content Header (Page header) -->
  <div class="content-header">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6">
          <h1 class="m-0">Toplantı Oluştur</h1>
        </div>
        <!-- /.col -->
        <div class="col-sm-6">
          <ol class="breadcrumb float-sm-right">
            <li class="breadcrumb-item">
              <router-link to="/">Home</router-link>
            </li>
            <li class="breadcrumb-item active">Dashboard v1</li>
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
      <div class="row">
        <div class="col-12">
          <!-- Custom Tabs -->
          <div class="card">
            <div class="card-header d-flex p-0">
              <h3 class="card-title p-3">Yeni Veri Kaydı</h3>
              <ul class="nav nav-pills ml-auto p-2">
                <li class="nav-item">
                  <a
                    class="nav-link active"
                    href="#tab_1"
                    data-toggle="tab"
                    @click="resetTab"
                    >Dosya Ekle</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    href="#tab_2"
                    data-toggle="tab"
                    @click="resetTab"
                    >Kişi Ekle</a
                  >
                </li>
              </ul>
            </div>
            <!-- /.card-header -->
            <div class="card-body">
              <div class="tab-content">
                <div class="tab-pane active" id="tab_1">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="col-md-12">
                        <div class="input-group mb-3">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Grup Adı"
                            aria-label="Grup Adı"
                            aria-describedby="basic-addon2"
                          />
                          <div class="input-group-append">
                            <button
                              class="btn btn-outline-primary"
                              type="button"
                            >
                              Ekle
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-12 my-3">
                        <p class="h3">Grup Oluştur</p>
                      </div>
                      <div class="col-md-12">
                        <div class="card">
                          <div class="card-body">
                            <label>
                              <input
                                type="file"
                                id="file"
                                ref="file"
                                accept=".xls,.xlsx"
                                v-on:change="onChangeFileUpload()"
                              />
                            </label>
                            <button class="btn btn-primary mx-2 my-2" @click="submitForm">Yükle</button>
                            <button class="btn btn-danger mx-2 my-2" @click="resetForm">Sil</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <template v-if="isFileLoaded">
                        <div
                          class="
                            col-md-12
                            d-flex
                            justify-content-center
                            align-items-center
                            h-100
                            flex-column
                          "
                        >
                          <button class="btn btn-block btn-primary my-2">
                            Devam Et
                          </button>
                          <button class="btn btn-block btn-danger my-2">
                            İptal Et
                          </button>
                        </div>
                      </template>
                    </div>
                  </div>
                </div>
                <!-- /.tab-pane -->
                <div class="tab-pane" id="tab_2">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="col-md-12">
                        <div class="form-group">
                          <label>Grup Seç</label>
                          <select class="form-control">
                            <option>Group 1</option>
                            <option>Group 2</option>
                            <option>Group 3</option>
                            <option>Group 4</option>
                            <option>Group 5</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="input-group mb-3">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Kişi Adı"
                            aria-label="Kişi Adı"
                            aria-describedby="basic-addon2"
                          />
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="input-group mb-3">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Kişi Soyadı"
                            aria-label="Kişi Soyadı"
                            aria-describedby="basic-addon2"
                          />
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="input-group mb-3">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Kişi Adresi"
                            aria-label="Kişi Adresi"
                            aria-describedby="basic-addon2"
                          />
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="input-group mb-3">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Kişi Doğum Tarihi"
                            aria-label="Kişi Doğum Tarihi"
                            aria-describedby="basic-addon2"
                          />
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="input-group mb-3">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Kişi Telefon Numarası"
                            aria-label="Kişi Telefon Numarası"
                            aria-describedby="basic-addon2"
                          />
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="input-group mb-3">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Kişi E-posta Adresi"
                            aria-label="Kişi E-posta Adresi"
                            aria-describedby="basic-addon2"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div
                        class="
                          col-md-12
                          d-flex
                          justify-content-center
                          align-items-center
                          h-100
                          flex-column
                        "
                      >
                        <button
                          class="btn btn-block btn-primary my-2"
                          @click="addPersonToDB"
                        >
                          Ekle
                        </button>
                        <button class="btn btn-block btn-danger my-2">
                          Sil
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- /.tab-content -->
            </div>
            <!-- /.card-body -->
          </div>
          <!-- ./card -->
        </div>
      </div>
      <!-- /.row -->
    </div>
    <!-- /.container-fluid -->
  </section>
  <!-- /.content -->
</template>
  <script>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      file: "",
      isFileLoaded: false,
    };
  },
  methods: {
    resetTab(e) {
      const targetID = e.target.href.slice(e.target.href.indexOf("#"));
      const targetElem = document.querySelector(targetID);
      if (!targetElem.classList.contains("active")) {
        this.resetForm();
      }
    },
    addPersonToDB() {
      this.axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((response) => {
          if (response.status === 200) {
            this.$toast.open({
              message: "Kişi Başarıyla Kaydedildi.",
              position: "top-right",
              type: "success",
            });
          }
        });
    },
    resetForm(){
      this.isFileLoaded = false;
      this.$refs.file.disabled = false;
      document.querySelector("#file").value = "";
    },
    submitForm() {
      const formData = new FormData();
      formData.append("bytes", this.file);

      /*this.axios.post("https://localhost:44313/api/app/file/save", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function (data) {
          console.log(data.data);
        })
        .catch(function () {
          console.log("FAILURE!!");
        });*/

      this.axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((response) => {
          if (response.status === 200) {
            this.$toast.open({
              message: "Dosya Başarıyla Yüklendi.",
              position: "top-right",
              type: "success",
            });
            this.isFileLoaded = true;
          }
        });
    },
    onChangeFileUpload() {
      this.file = this.$refs.file[0];
      this.$refs.file.disabled = true;
    },
  },
  mounted() {
    const scriptArr = [
      "assets/plugins/jquery/jquery.min.js",
      "assets/plugins/bootstrap/js/bootstrap.bundle.min.js",
      "assets/dist/js/adminlte.min.js",
      "assets/plugins/toastr/toastr.min.js",
      "assets/plugins/sweetalert2/sweetalert2.min.js",
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
});
</script>
      
  <style>
</style>
  