<template>
  <div :class="fileGroupProps.encapsulationElem.class">
    <div class="card card-default">
      <div class="card-header">
        <h3 class="card-title">
          Dosya Ekle
          <small
            ><em>Yalnızca {{ fileGroupProps.file.type }} Dosya Türü</em>
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
              :accept="fileGroupProps.file.accepted"
              class="d-none"
            />
            <div class="btn-group w-100 overflow-auto">
              <button
                class="btn btn-secondary col"
                type="button"
                @click="$emit(fileGroupProps.file.clickEvent.selectFile, this)"
              >
                <i class="far fa-file mr-2"></i>
                <span>Dosya Seç</span>
              </button>
              <button
                class="btn btn-danger col"
                type="button"
                @click="$emit(fileGroupProps.file.clickEvent.resetForm, this)"
              >
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
                  type="button"
                  @click="uploadFile(index)"
                  :ref="`uploadBtn_${index + 1}`"
                >
                  <i class="fas fa-upload mr-2"></i>
                  <span>Yükle</span>
                </button>
                <button
                  class="btn btn-warning cancel"
                  type="button"
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
        index: null,
      },
      axiosRequest: {
        cancelTokenArr: [],
        response: null,
      },
    };
  },
  methods: {
    uploadFile(fileIndex) {
      if (this.fileGroupProps.axiosRequest.selectedGroup !== "") {
        this.$refs[`uploadBtn_${fileIndex + 1}`].disabled = true;
        this.$refs[`cancelBtn_${fileIndex + 1}`].disabled = false;
        this.uploadFileInfo.isUploadContinuedArr[fileIndex] = true;
        this.uploadFileInfo.index = fileIndex;

        console.log(this.fileGroupProps.axiosRequest.selectedGroup);

        const formData = new FormData();
        formData.append(
          "group_id",
          this.fileGroupProps.axiosRequest.selectedGroup
        );
        formData.append("fileAsBytes", this.files[fileIndex]);

        const axiosRequestParams = {
          name: this.$options.__file,
          data: formData,
          url: this.fileGroupProps.axiosRequest.url,
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

        this.$store.dispatch("makePostRequest", {
          axiosRequestParams,
        });
      } else {
        this.$store.dispatch("fireToast", {
          message: "Lütfen Bir Grup Seçiniz.",
          type: "warning",
          duration: 2000,
        });
      }
    },
    cancelUploadFile(fileIndex) {
      this.uploadFileInfo.isUploadCanceledArr[fileIndex] = true;
      this.$refs[`uploadBtn_${fileIndex + 1}`].disabled = false;
      this.$refs[`cancelBtn_${fileIndex + 1}`].disabled = true;
    },
    onChangeFileUpload() {
      this.uploadFileInfo.isUploadCanceledArr.push(false);
      this.uploadFileInfo.isUploadContinuedArr.push(false);
      this.axiosRequest.cancelTokenArr.push(this.axios.CancelToken.source());
      this.files.push(this.$refs.file.files[0]);
      this.$refs.file.disabled = true;
      this.$refs.file.value = "";
    },
  },
  computed: {
    response() {
      return this.$store.getters.axiosRequestResponse[this.$options.__file];
    },
  },
  watch: {
    response(val) {
      this.axiosRequest.response = val;
      this.uploadFileInfo.isUploadContinuedArr[
        this.uploadFileInfo.index
      ] = false;
      this.$refs[`uploadBtn_${this.uploadFileInfo.index + 1}`].disabled =
        this.axiosRequest.response.situation === "success" ? true : false;
      this.$refs[`cancelBtn_${this.uploadFileInfo.index + 1}`].disabled = true;
      //this.axiosRequest.response.situation === "success" ? true : false;
    },
  },
});
</script>

<style>
</style>