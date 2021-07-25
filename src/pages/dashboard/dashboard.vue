<template>
  <!-- Content Header (Page header) -->
  <div class="content-header">
    <div class="container-fluid">
      <content-header :headerObj="content.header"></content-header>
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
                      <p class="h3">Gruba Liste Oluştur</p>
                    </div>
                    <content-form-group
                      :formGroupProps="content.formGroupForSelectGroup"
                    >
                    </content-form-group>
                    <content-file-group
                      :fileGroupProps="content.fileGroupForAddFile"
                      ref="fileGroupElem"
                    ></content-file-group>
                  </div>
                </div>
                <!-- /.tab-pane -->
                <div class="tab-pane" id="tab_2">
                  <div class="row">
                    <add-person-component></add-person-component>
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
import ContentHeader from "@/components/content/header/header.vue";
import ContentFileGroup from "@/components/content/content/fileGroup.vue";
import ContentFormGroup from "@/components/content/content/formGroup.vue";
import AddPersonComponent from "@/components/content/content/addPerson.vue";
export default defineComponent({
  components: {
    ContentHeader,
    ContentFileGroup,
    ContentFormGroup,
    AddPersonComponent
  },
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
      content: {
        header: {
          name: "Toplantı Oluştur",
        },
        fileGroupForAddFile: {
          fileType: "Excel",
          encapsulationElem: {
            class: "col-12",
          },
        },
        formGroupForSelectGroup: {
          labelName: "Grup Seç",
          options: [
            {
              name: "Group1",
              class: "",
            },
            {
              name: "Group2",
              class: "",
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
        this.$refs.fileGroupElem.resetForm();
      }
    },
  },
});
</script>
      
  <style>
</style>
  