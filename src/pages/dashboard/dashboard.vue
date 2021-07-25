<template>
  <!-- Content Header (Page header) -->
  <div class="content-header">
    <div class="container-fluid">
      <content-header :headerObj="content.header"></content-header>
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
              <tab-link-component
                :tabsLinkProps="tabs.tabLinks"
              ></tab-link-component>
            </div>
            <!-- /.card-header -->
            <div class="card-body">
              <div class="tab-content">
                <div class="tab-pane active" id="tab_1">
                  <div class="row">
                    <add-person-with-file-component
                    ></add-person-with-file-component>
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
import AddPersonComponent from "@/components/content/content/mixed/addPerson.vue";
import AddPersonWithFileComponent from "@/components/content/content/mixed/addPersonWithFile.vue";
import TabLinkComponent from "@/components/content/content/mixed/tab/tabLink.vue";
export default defineComponent({
  components: {
    ContentHeader,
    AddPersonComponent,
    AddPersonWithFileComponent,
    TabLinkComponent,
  },
  setup() {
    const tabs = ref({
      tabLinks: {
        links: [
          {
            linkContent: "Dosya Ekle",
            linkSubject: "Excel Dosya Ekleme",
          },
          {
            linkContent: "Kişi Ekle",
            linkSubject: "Kişi Ekleme",
          },
        ],
      },
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
      },
    };
  },
});
</script>
      
  <style>
</style>
  