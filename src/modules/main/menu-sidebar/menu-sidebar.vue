<template>
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <router-link to="/" class="brand-link">
    <div class="brand-image img-circle elevation-3 mt-1">
      <i class="fas fa-bullhorn" style="opacity: 0.8"></i>
    </div>
      <span class="brand-text font-weight-light">Yasal Çağrı</span>
    </router-link>

    <div class="sidebar">
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img
            src="assets/img/default-profile.png"
            class="img-circle elevation-2"
            alt="User Image"
          />
        </div>

        <div class="info">
          <router-link to="/profile" class="d-block"
            >Alexander Pierce</router-link
          >
        </div>
      </div>

      <nav class="mt-2">
        <ul
          class="nav nav-pills nav-sidebar flex-column"
          data-widget="treeview"
          role="menu"
          data-accordion="false"
        >
          <li class="nav-item">
            <router-link
              to="/createMeeting"
              class="nav-link"
              exact
              exact-active-class="active"
            >
              <i class="nav-icon fas fa-calendar-alt"></i>
              <p>Toplantı Oluştur</p>
            </router-link>
          </li>

          <li class="nav-item menu-open">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-users"></i>
              <p>
                Grup
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link
                  to="/createGroup"
                  class="nav-link"
                  exact
                  exact-active-class="active"
                >
                  <i class="nav-icon far fa-circle nav-icon"></i>
                  <p>Grup Oluştur</p>
                </router-link>
              </li>

              <li class="nav-item">
                <router-link
                  to="/createGroupUsers"
                  class="nav-link"
                  active-class="active"
                >
                  <i class="nav-icon far fa-circle nav-icon"></i>
                  <p>Grup Kişileri Ekle</p>
                </router-link>
              </li>

              <li class="nav-item">
                <router-link
                  to="/showGroupUsers"
                  class="nav-link"
                  active-class="active"
                >
                  <i class="nav-icon far fa-circle nav-icon"></i>
                  <p>Grup Kişileri Görüntüle</p>
                </router-link>
              </li>

              <!--<li class="nav-item">
                <router-link
                  to="/editGroupUser/1"
                  class="nav-link"
                  active-class="active"
                >
                  <i class="nav-icon far fa-circle nav-icon"></i>
                  <p>Grup Kişileri Düzenle</p>
                </router-link>
              </li>-->
            </ul>
          </li>

          <li class="nav-item menu-open">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-file-signature"></i>
              <p>
                Şablon
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link
                  to="/createMeetingTemplate"
                  class="nav-link"
                  active-class="active"
                >
                  <i class="nav-icon far fa-circle"></i>
                  <p>Şablon Oluştur</p>
                </router-link>
              </li>

              <li class="nav-item">
                <router-link
                  to="/editMeetingTemplate"
                  class="nav-link"
                  active-class="active"
                >
                  <i class="nav-icon far fa-circle"></i>
                  <p>Şablon Düzenle</p>
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({});
</script>
<style></style>
