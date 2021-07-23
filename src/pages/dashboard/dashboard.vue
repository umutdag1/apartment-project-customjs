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
              <router-link to="/">Anasayfa</router-link>
            </li>
            <li class="breadcrumb-item active">Toplantı Oluştur</li>
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
              <h3 class="card-title p-3">{{ tabs.activeTab.tabLink }}</h3>
              <ul class="nav nav-pills ml-auto p-2">
                <li
                  class="nav-item"
                  v-for="tabIndex in tabs.tabContentArr.length"
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
                    >{{ tabs.tabContentArr[tabIndex - 1] }}</a
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
                      <div class="col-12 mb-3">
                        <p class="h3">Grup Oluştur</p>
                      </div>
                      <div class="col-12">
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
                      <div class="col-12">
                        <label>
                          <input
                            type="file"
                            id="file"
                            accept=".xls,.xlsx"
                            ref="file"
                            @change="onChangeFileUpload"
                            :disabled="isFileLoaded"
                          />
                        </label>
                        <button
                          class="btn btn-primary mx-2 my-2"
                          ref="uploadBtn"
                          @click="submitForm"
                          :disabled="isUploadBtnDisabled"
                        >
                          Yükle
                        </button>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <template v-if="isUploadBtnDisabled">
                        <div
                          class="
                            col-12
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
                          <button
                            class="btn btn-block btn-danger my-2"
                            @click="resetForm"
                          >
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
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const tabs = ref({
      tabContentArr: ["Dosya Ekle", "Kişi Ekle"],
      tabLinkArr: ["Excel Dosya Ekleme", "Kişi Ekleme"],
      activeTab: {
        tabContent: "Dosya Ekle",
        tabLink: "Excel Dosya Ekleme",
      },
    });

    return { tabs };
  },
  data() {
    return {
      file: "",
      isFileLoaded: false,
      isUploadBtnDisabled: false,
    };
  },
  methods: {
    changeTab(e) {
      const targetID = e.target.href.slice(e.target.href.indexOf("#"));
      const targetIDLastIndexAsNumber = Number(targetID.charAt(targetID.length - 1));
      const targetElem = document.querySelector(targetID);
      this.tabs.activeTab.tabContent =
        this.tabs.tabContentArr[targetIDLastIndexAsNumber - 1];
      this.tabs.activeTab.tabLink =
        this.tabs.tabLinkArr[targetIDLastIndexAsNumber - 1];
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
    resetForm() {
      this.isFileLoaded = false;
      this.isUploadBtnDisabled = false;
      document.querySelector("#file").value = "";
    },
    submitForm() {
      if (!this.isUploadBtnDisabled) {
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
              this.isUploadBtnDisabled = true;
              this.isFileLoaded = true;
            }
          });
      }
    },
    onChangeFileUpload() {
      this.file = this.$refs.file[0];
      this.isFileLoaded = true;
    },
  },
});
</script>
      
  <style>
</style>
  