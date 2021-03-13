<template>
  <header class="header-global">
    <base-nav class="navbar-main" transparent type="" effect="light" expand>
      <router-link slot="brand" class="navbar-brand mr-lg-5" to="/">
        <img :src="logo" alt="logo" />
      </router-link>

      <div class="row" slot="content-header" slot-scope="{ closeMenu }">
        <div class="col-6 collapse-brand">
          <a
            href="https://softelon.com/"
          >
            <img src="https://softelon.com/wp-content/uploads/2021/01/logo.png" />
          </a>
        </div>
        <div class="col-6 collapse-close">
          <close-button @click="closeMenu"></close-button>
        </div>
      </div>

      <ul class="navbar-nav navbar-nav-hover align-items-lg-center">
        <base-dropdown
          v-for="item in categories"
          :key="item._id"
          :class="item.children.length > 0 ? 'nav-item' : ''"
          menu-classes="dropdown-menu-xl"
          v-if="item.status"
        >
          <router-link
            slot="title"
            :to="item.path"
            class="nav-link"
            data-toggle="dropdown"
            role="button"
          >
            <i class="ni ni-ui-04 d-lg-none"></i>
            <span class="nav-link-inner--text">{{ item.name }}</span>
          </router-link>
          <div v-if="item.children.length > 0">
            <div class="dropdown-menu-inner">
              <router-link
                v-for="child in item.children"
                :key="child.name"
                :to="child.path"
                class="media d-flex align-items-center"
              >
                <div
                  class="icon icon-shape bg-gradient-primary rounded-circle text-white"
                >
                  <i class="ni ni-spaceship"></i>
                </div>
                <div class="media-body ml-3">
                  <h6 class="heading text-primary mb-md-1">{{ child.name }}</h6>
                  <p class="description d-none d-md-inline-block mb-0">
                    {{ child.description }}
                  </p>
                </div>
              </router-link>
            </div>
          </div>
        </base-dropdown>
      </ul>
      <ul class="navbar-nav align-items-lg-center ml-lg-auto">
        <li class="nav-item">
          <input
            v-model="find"
            type="text"
            placeholder="Ara..."
            @keypress.enter="search()"
            class="form-control"
          />
        </li>
        <li v-for="item in socials" :key="item.key" class="nav-item">
          <a
            class="nav-link nav-link-icon"
            :href="item.path"
            target="_blank"
            rel="noopener"
            data-toggle="tooltip"
            title="Follow us on Instagram"
          >
            <i :class="item.icon"></i>
            <span class="nav-link-inner--text d-lg-none">{{ item.key }}</span>
          </a>
        </li>
        <!--  <li class="nav-item d-none d-lg-block ml-lg-4">
          <div v-if="isLogin()">
            <ul class="navbar-nav navbar-nav-hover align-items-lg-center">
              <base-dropdown tag="li" class="nav-item">
                <a
                  slot="title"
                  href="#"
                  class="nav-link"
                  data-toggle="dropdown"
                  role="button"
                >
                  <i class="ni ni-collection d-lg-none"></i>
                  <span class="nav-link-inner--text">{{
                    JSON.parse(user).first_name +
                    " " +
                    JSON.parse(user).last_name
                  }}</span>
                </a>
                <router-link to="/landing" class="dropdown-item"
                  >Yazılarım</router-link
                >
                <router-link to="/profile" class="dropdown-item"
                  >Profilim</router-link
                >
                <router-link to="/login" class="dropdown-item"
                  >Şifre Değiştir</router-link
                ><a
                  @click="logout()"
                  href="javascript:void(0)"
                  class="dropdown-item"
                  aria-current="page"
                  >Çıkış</a
                >
              </base-dropdown>
            </ul>
          </div>
          <div v-else>
            <router-link
              to="/login"
              rel="noopener"
              class="btn btn-neutral btn-icon"
            >
              <span class="nav-link-inner--text">Giriş</span>
            </router-link>
          </div>
        </li> -->
      </ul>
    </base-nav>
  </header>
</template>
<script>
import BaseNav from "@/components/BaseNav";
import BaseDropdown from "@/components/BaseDropdown";
import CloseButton from "@/components/CloseButton";
import ApiService from "@/core/services/api.service.js";

export default {
  components: {
    BaseNav,
    CloseButton,
    BaseDropdown,
  },
  data() {
    return {
      logo: "",
      categories: [],
      socials: [],
      user: null,
      find: "",
    };
  },
  created() {
    ApiService.get("/menus/").then((x) => {
      this.categories = x.data.sort((a, b) => a.sort - b.sort);
    });
    var result = JSON.parse(localStorage.getItem("option"));
    var json = result.find((x) => x.key == "header").json;
    this.logo = json.header_logo;
    this.socials = json.json_social;
    document.title = json.title;
  },
  methods: {
    isLogin() {
      var u = localStorage.getItem("USER_INFO");
      if (u) {
        this.user = u;
        return true;
      } else return false;
    },
    logout() {
      localStorage.removeItem("USER_INFO");
      this.$router.push({ name: "Home" });
    },
    search() {
      if (this.find != "") this.$router.push("/find/" + this.find);
    },
  },
};
</script>
<style scoped>
.form-control {
  padding: 5px 10px 5px 10px;
  height: 100%;
  font-size: 12px;
}
</style>
