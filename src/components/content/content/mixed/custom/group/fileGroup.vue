<template>
  <div :class="fileGroupProps.encapsulationElem.class">
    <div class="card card-default">
      <div class="card-header">
        <h3 class="card-title">
          Dosya Ekle
          <small
            ><em>Yalnızca {{ fileGroupProps.fileType }} Dosya Türü</em>
            Seçiniz</small
          >
        </h3>
      </div>
      <div class="card-body">
        <div id="actions" class="row">
          <div class="col-lg-12">
            <input
              type="file"
              ref="file"
              @change="onChangeFileUpload"
              accept=".xlsx,.xls"
              class="d-none"
            />
            <div class="btn-group w-100">
              <button class="btn btn-secondary col" @click="$refs.file.click()">
                <i class="far fa-file mr-2"></i>
                <span>Dosya Seç</span>
              </button>
              <button class="btn btn-danger col" @click="resetForm">
                <i class="fas fa-trash mr-2"></i>
                <span>Temizle</span>
              </button>
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
                ><i class="fas fa-file-upload fa-3x"></i
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
            <div class="col-auto d-flex align-items-center my-2">
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
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    fileGroupProps: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      files: [],
      uploadFileInfo: {
        isUploadCanceledArr: [],
        isUploadContinuedArr: [],
      },
      axiosRequest: {
        cancelTokenArr: [],
      },
      isFileLoaded: false,
      isUploadBtnDisabled: false,
    };
  },
  methods: {
    uploadFile(fileIndex) {
      this.$refs[`uploadBtn_${fileIndex + 1}`].disabled = true;
      this.$refs[`cancelBtn_${fileIndex + 1}`].disabled = false;
      this.uploadFileInfo.isUploadContinuedArr[fileIndex] = true;

      const formData = new FormData();
      formData.append("bytes", this.files[fileIndex]);

      const axiosRequestParams = {
        name: "uploadFilePostRequest",
        data: formData,
        url: "https://v2.convertapi.com/upload",
        config: {
          cancelToken: this.axiosRequest.cancelTokenArr[fileIndex].token,
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const fileProgressElem =
              this.$refs[`fileProgress_${fileIndex + 1}`];

            if (this.uploadFileInfo.isUploadCanceledArr[fileIndex]) {
              cancelProcess(this);
            } else {
              if (fileProgressElem === null) {
                cancelProcess(this);
              } else {
                fileProgressElem.style.width =
                  (progressEvent.loaded / progressEvent.total) * 100 + "%";
              }
            }

            function cancelProcess(curThis) {
              curThis.axiosRequest.cancelTokenArr[fileIndex].cancel();
              curThis.axiosRequest.cancelTokenArr[fileIndex] =
                curThis.axios.CancelToken.source();
              curThis.uploadFileInfo.isUploadContinuedArr[fileIndex] = false;
              curThis.uploadFileInfo.isUploadCanceledArr[fileIndex] = false;
            }
          },
        },
        toastMessages: {
          success: "Dosya Başarıyla Yüklendi",
          warning: "Dosya Yükleme İşlemi İptal Edildi.",
          error: "Dosya Yükleme Başarısız",
        },
      };

      const currentObjParams = {
        curThis: this,
        fileIndex,
      };

      this.emitter.emit("makePostRequest", {
        axiosRequestParams,
        currentObjParams,
      });
    },
    cancelUploadFile(fileIndex) {
      this.uploadFileInfo.isUploadCanceledArr[fileIndex] = true;
      this.$refs[`uploadBtn_${fileIndex + 1}`].disabled = false;
      this.$refs[`cancelBtn_${fileIndex + 1}`].disabled = true;
    },
    resetForm() {
      const isStillUploadContinuedArr =
        this.uploadFileInfo.isUploadContinuedArr.filter(
          (boolItem) => boolItem === true
        );
      if (isStillUploadContinuedArr.length > 0) {
        this.emitter.emit("fireToast", [
          "Dosya Yükleme İşlemi Devam Ediyor.",
          "warning",
          2000,
        ]);
      } else {
        this.files = [];
        this.axiosRequest.cancelTokenArr = [];
        this.uploadFileInfo.isUploadCanceledArr = [];
        this.uploadFileInfo.isUploadContinuedArr = [];
      }
    },
    onChangeFileUpload() {
      this.uploadFileInfo.isUploadCanceledArr.push(false);
      this.uploadFileInfo.isUploadContinuedArr.push(false);
      this.axiosRequest.cancelTokenArr.push(this.axios.CancelToken.source());
      this.files.push(this.$refs.file.files[0]);
      this.$refs.file.value = "";
    },
  },
  mounted() {
    this.emitter.on("uploadFilePostRequest", (data) => {
      this.uploadFileInfo.isUploadContinuedArr[
        data.requestedObjParams.fileIndex
      ] = false;
      data.requestedObjParams.curThis.$refs[
        `uploadBtn_${data.requestedObjParams.fileIndex + 1}`
      ].disabled = data.situation === "success" ? true : false;
      data.requestedObjParams.curThis.$refs[
        `cancelBtn_${data.requestedObjParams.fileIndex + 1}`
      ].disabled = data.situation === "success" ? true : false;
    });

    this.emitter.on("uploadFileGetRequest", (data) => {
      console.log(data.responseData);
    });

    this.emitter.on("callResetForm", (refFunc) => {
      this.emitter.emit(refFunc, this.resetForm);
    });
  },
  unmounted() {
    this.emitter.emit("resetEmitter", [
      "uploadFilePostRequest",
      "uploadFileGetRequest",
      "callResetForm",
    ]);
  },
});
</script>

<style>
</style>