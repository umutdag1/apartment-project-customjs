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
                      <div class="card card-default">
                        <div class="card-header">
                          <h3 class="card-title">
                            Dosya Ekle
                            <small
                              ><em>Yalnızca Excel Dosya Türü</em> Seçiniz</small
                            >
                          </h3>
                        </div>
                        <div class="card-body">
                          <div id="actions" class="row">
                            <div class="col-lg-12">
                              <div class="btn-group w-100">
                                <input
                                  type="file"
                                  ref="file"
                                  @change="onChangeFileUpload"
                                  accept=".xlsx,.xls"
                                  class="d-none"
                                />
                                <span
                                  class="btn btn-secondary col fileinput-button"
                                  @click="$refs.file.click()"
                                >
                                  <i class="far fa-file mr-2"></i>
                                  <span>Dosya Seç</span>
                                </span>
                                <span
                                  class="btn btn-danger col"
                                  @click="resetForm"
                                >
                                  <i class="fas fa-trash mr-2"></i>
                                  <span>Temizle</span>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div class="table table-striped files" id="previews">
                            <div
                              id="template"
                              class="row mt-3"
                              v-for="(file, index) in files"
                              :key="index"
                            >
                              <div class="col-auto">
                                <span class="preview"
                                  ><i class="far fa-file-excel fa-3x"></i
                                ></span>
                              </div>
                              <div class="col d-flex align-items-center">
                                <p class="mb-0">
                                  <span class="lead"></span>
                                  <span class="file-name">{{ file.name }}</span>
                                </p>
                              </div>
                              <div class="col-5 d-flex align-items-center my-2">
                                <div
                                  class="progress progress-striped active w-100"
                                  role="progressbar"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                  aria-valuenow="0"
                                >
                                  <div
                                    class="progress-bar progress-bar-success"
                                    style="width: 0%"
                                    :ref="`fileProgress_${index + 1}`"
                                  ></div>
                                </div>
                              </div>
                              <div
                                class="col-auto d-flex align-items-center my-2"
                              >
                                <div class="btn-group">
                                  <button
                                    class="btn btn-primary start"
                                    @click="uploadFile(index)"
                                    :ref="`uploadBtn_${index + 1}`"
                                  >
                                    <i class="fas fa-upload mr-2"></i>
                                    <span>Yükle</span>
                                  </button>
                                  <button
                                    class="btn btn-warning cancel"
                                    @click="cancelUploadFile(index)"
                                    :ref="`cancelBtn_${index + 1}`"
                                    disabled="true"
                                  >
                                    <i class="fas fa-times-circle mr-2"></i>
                                    <span>İptal Et</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- /.card-body -->
                      </div>
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
      files: [],
      axiosRequest: {
        isRequestCanceledArr: [],
        isRequestContinuingStatusArr: [],
        cancelTokenArr: [],
      },
      isFileLoaded: false,
      isUploadBtnDisabled: false,
    };
  },
  methods: {
    changeTab(e) {
      const targetID = e.target.href.slice(e.target.href.indexOf("#"));
      const targetIDLastIndexAsNumber = Number(
        targetID.charAt(targetID.length - 1)
      );
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
      const request = {
        url: "https://jsonplaceholder.typicode.com/posts",
        config: {},
        toastMessages: {
          success: "Kişi Başarıyla Eklendi",
          error: "Kişi Ekleme Başarısız",
        },
      };

      this.makeGetRequest(request);
    },
    uploadFile(fileIndex) {
      this.$refs[`uploadBtn_${fileIndex + 1}`].disabled = true;
      this.$refs[`cancelBtn_${fileIndex + 1}`].disabled = false;
      this.axiosRequest.isRequestContinuingStatusArr[fileIndex] = true;
      const formData = new FormData();
      formData.append("bytes", this.files[fileIndex]);
      const request = {
        data: formData,
        fileIndex: fileIndex,
        url: "https://v2.convertapi.com/upload",
        config: {
          cancelToken: this.axiosRequest.cancelTokenArr[fileIndex].token,
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            if (this.axiosRequest.isRequestCanceledArr[fileIndex]) {
              this.axiosRequest.cancelTokenArr[fileIndex].cancel();
              this.axiosRequest.cancelTokenArr[fileIndex] =
                this.axios.CancelToken.source();
              this.axiosRequest.isRequestContinuingStatusArr[fileIndex] = false;
              this.axiosRequest.isRequestCanceledArr[fileIndex] = false;
            } else {
              this.$refs[`fileProgress_${fileIndex + 1}`].style.width =
                (progressEvent.loaded / progressEvent.total) * 100 + "%";
            }
          },
        },
        toastMessages: {
          success: "Dosya Başarıyla Yüklendi",
          warning: "Dosya Yükleme İşlemi İptal Edildi.",
          error: "Dosya Yükleme Başarısız",
        },
      };

      this.makePostRequest(request);
    },
    cancelUploadFile(fileIndex) {
      this.$refs[`uploadBtn_${fileIndex + 1}`].disabled = false;
      this.$refs[`cancelBtn_${fileIndex + 1}`].disabled = true;
      this.axiosRequest.isRequestCanceledArr[fileIndex] = true;
      this.axiosRequest.isRequestContinuingStatusArr[fileIndex] = false;
    },
    resetForm() {
      const isStillRequestContinuingArr =
        this.axiosRequest.isRequestContinuingStatusArr.filter(
          (boolItem) => boolItem === true
        );
      if (isStillRequestContinuingArr.length > 0) {
        this.fireToast(
          "Dosya Yükleme İşlemi Sürerken Temizleyemezsin.",
          "error",
          2000
        );
      } else {
        this.files = [];
        this.axiosRequest.cancelTokenArr = [];
        this.axiosRequest.isRequestCanceledArr = [];
        this.axiosRequest.isRequestContinuingStatusArr = [];
      }
    },
    makePostRequest(request) {
      const vm = this;
      this.axios
        .post(request.url, request.data, request.config)
        .then(function (data) {
          if (Object.keys(request).includes("fileIndex")) {
            vm.axiosRequest.isRequestContinuingStatusArr[
              request.fileIndex
            ] = false;
            vm.$refs[`uploadBtn_${request.fileIndex + 1}`].disabled = true;
            vm.$refs[`cancelBtn_${request.fileIndex + 1}`].disabled = true;
          }
          vm.fireToast(request.toastMessages.success, "success", 2000);
          console.log(data.data);
        })
        .catch(function (thrown) {
          if (thrown.__CANCEL__) {
            vm.fireToast(request.toastMessages.warning, "warning", 2000);
          } else {
            if (Object.keys(request).includes("fileIndex")) {
              vm.axiosRequest.isRequestContinuingStatusArr[
                request.fileIndex
              ] = false;
              vm.$refs[`uploadBtn_${request.fileIndex + 1}`].disabled = false;
              vm.$refs[`cancelBtn_${request.fileIndex + 1}`].disabled = false;
            }
            vm.fireToast(request.toastMessages.error, "error", 2000);
          }
        });
    },
    makeGetRequest(request) {
      const vm = this;
      this.axios
        .get(request.url, request.config)
        .then(function (data) {
          if (Object.keys(request).includes("fileIndex")) {
            vm.axiosRequest.isRequestContinuingStatusArr[
              request.fileIndex
            ] = false;
            vm.$refs[`uploadBtn_${request.fileIndex + 1}`].disabled = true;
            vm.$refs[`cancelBtn_${request.fileIndex + 1}`].disabled = true;
          }
          vm.fireToast(request.toastMessages.success, "success", 2000);
          console.log(data.data);
        })
        .catch(function (thrown) {
          if (thrown.__CANCEL__) {
            vm.fireToast(request.toastMessages.warning, "warning", 2000);
          } else {
            vm.fireToast(request.toastMessages.error, "error", 2000);
            if (Object.keys(request).includes("fileIndex")) {
              vm.axiosRequest.isRequestContinuingStatusArr[
                request.fileIndex
              ] = false;
              vm.$refs[`uploadBtn_${request.fileIndex + 1}`].disabled = false;
              vm.$refs[`cancelBtn_${request.fileIndex + 1}`].disabled = false;
            }
          }
        });
    },
    onChangeFileUpload() {
      this.axiosRequest.isRequestCanceledArr.push(false);
      this.axiosRequest.isRequestContinuingStatusArr.push(false);
      this.axiosRequest.cancelTokenArr.push(this.axios.CancelToken.source());
      this.files.push(this.$refs.file.files[0]);
      this.$refs.file.value = "";
    },
    fireToast(message, type, duration) {
      this.$toast.open({
        message: message,
        position: "top-right",
        type: type,
        duration: duration,
      });
    },
  },
});
</script>
      
  <style>
</style>
  