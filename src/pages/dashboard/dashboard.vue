<template>
  <div class="content-header">
    <div class="container-fluid">
      <content-header-component
        :headerObj="content.header"
      ></content-header-component>
    </div>
  </div>

  <section class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <tab-component>
            <template v-slot:tabLink>
              <tab-link-component
                :tabLinksProps="tabs.tabLinks"
              ></tab-link-component>
            </template>
            <template v-slot:tabContent>
              <tab-pane-component :tabPanesProps="tabs.tabPanes">
                <template v-slot:addPersonWithFilePane>
                  <add-person-with-file-component></add-person-with-file-component>
                </template>
                <template v-slot:addPersonPane>
                  <add-person-component></add-person-component>
                </template>
              </tab-pane-component>
            </template>
          </tab-component>
        </div>
        <button-group-component
          :buttonProps="content.buttonGroupForAddNewGroup"
          @nextPage="nextPage"
        ></button-group-component>
      </div>
    </div>
  </section>
</template>
  <script>
import { defineComponent, ref } from "vue";
import ContentHeaderComponent from "@/components/content/header/header.vue";
import AddPersonComponent from "@/components/content/content/mixed/addPerson/addPerson.vue";
import AddPersonWithFileComponent from "@/components/content/content/mixed/addPerson/addPersonWithFile.vue";
import TabComponent from "@/components/content/content/mixed/custom/tab/tab.vue";
import TabLinkComponent from "@/components/content/content/mixed/custom/tab/tabLink.vue";
import TabPaneComponent from "@/components/content/content/mixed/custom/tab/tabPane.vue";
import ButtonGroupComponent from "@/components/content/content/mixed/custom/group/buttonGroup.vue";
export default defineComponent({
  components: {
    ContentHeaderComponent,
    AddPersonComponent,
    AddPersonWithFileComponent,
    TabComponent,
    TabLinkComponent,
    TabPaneComponent,
    ButtonGroupComponent,
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
        buttonGroupForAddNewGroup: {
          buttons: [
            {
              class: "btn btn-block btn-primary my-2",
              clickEvent: "nextPage",
              innerHtml: "Devam Et",
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
    nextPage() {
      this.$router.push("editorTemplate");
    },
  },
});
</script>
      
  <style>
</style>
  