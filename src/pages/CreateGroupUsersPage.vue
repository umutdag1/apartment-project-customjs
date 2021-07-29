<template>
  <div class="content-header">
    <div class="container-fluid">
      <app-header-component :headerObj="content.header"></app-header-component>
    </div>
  </div>

  <section class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <app-tab-component>
            <template v-slot:tabLink>
              <app-tab-link-component
                :tabLinksProps="tabs.tabLinks"
              ></app-tab-link-component>
            </template>
            <template v-slot:tabContent>
              <app-tab-pane-component :tabPanesProps="tabs.tabPanes">
                <template v-slot:addUserWithFilePane>
                  <add-user-with-file-component></add-user-with-file-component>
                </template>
                <template v-slot:addUserWithHandPane>
                  <add-user-with-hand-component></add-user-with-hand-component>
                </template>
              </app-tab-pane-component>
            </template>
          </app-tab-component>
        </div>

        <app-button-component
          :buttonProps="content.buttonGroupForAddNewGroup"
          @goBackPage="$store.dispatch('changePage',null)"
          @goNextPage="$store.dispatch('changePage','editGroupUsers')"
        ></app-button-component>
      </div>
    </div>
  </section>
</template>
  <script>
import { defineComponent, ref } from "vue";
import AppHeaderComponent from "@/components/Header/AppHeader.vue";
import AddUserWithHandComponent from "@/components/Content/Mixed/AddUser/AddUserWithHand.vue";
import AddUserWithFileComponent from "@/components/Content/Mixed/AddUser/AddUserWithFile.vue";
import AppTabComponent from "@/components/Content/UI/Tab/AppTab.vue";
import AppTabLinkComponent from "@/components/Content/UI/Tab/AppTabLink.vue";
import AppTabPaneComponent from "@/components/Content/UI/Tab/AppTabPane.vue";
import AppButtonComponent from "@/components/Content/UI/AppButton.vue";
export default defineComponent({
  components: {
    AppHeaderComponent,
    AddUserWithHandComponent,
    AddUserWithFileComponent,
    AppTabComponent,
    AppTabLinkComponent,
    AppTabPaneComponent,
    AppButtonComponent,
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
            name: "addUserWithFilePane",
          },
          {
            name: "addUserWithHandPane",
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
          name: "Grup Kişileri Ekle",
        },
        buttonGroupForAddNewGroup: {
          buttons: [
            {
              class: "btn btn-block btn-secondary my-2 mr-3",
              clickEvent: "goBackPage",
              innerHtml: "Geri Dön",
            },
            {
              class: "btn btn-block btn-primary my-2",
              clickEvent: "goNextPage",
              innerHtml: "Devam Et",
            },
          ],
          encapsulationElem: {
            class:
              "col-12 d-flex align-items-center justify-content-center overflow-auto",
          },
        },
      },
    };
  },
});
</script>
      
  <style>
</style>
  