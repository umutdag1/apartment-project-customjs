<template>
  <div class="content-header">
    <div class="container-fluid">
      <content-header :headerObj="content.header"></content-header>
    </div>
  </div>

  <section class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header d-flex p-0">
              <tab-link-component
                :tabsLinkProps="tabs.tabLinks"
              ></tab-link-component>
            </div>
            <div class="card-body">
              <div class="tab-content">
                <tab-pane-component :tabPanesProp="tabs.tabPanes">
                  <template v-slot:addPersonWithFilePane>
                    <add-person-with-file-component></add-person-with-file-component>
                  </template>
                  <template v-slot:addPersonPane>
                    <add-person-component></add-person-component>
                  </template>
                </tab-pane-component>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
  <script>
import { defineComponent, ref } from "vue";
import ContentHeader from "@/components/content/header/header.vue";
import AddPersonComponent from "@/components/content/content/mixed/addPerson.vue";
import AddPersonWithFileComponent from "@/components/content/content/mixed/addPersonWithFile.vue";
import TabLinkComponent from "@/components/content/content/mixed/tab/tabLink.vue";
import TabPaneComponent from "@/components/content/content/mixed/tab/tabPane.vue";
export default defineComponent({
  components: {
    ContentHeader,
    AddPersonComponent,
    AddPersonWithFileComponent,
    TabLinkComponent,
    TabPaneComponent,
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
      tabPanes: {
        panes: [
          {
            name: "addPersonWithFilePane",
          },
          {
            name: "addPersonPane",
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
  