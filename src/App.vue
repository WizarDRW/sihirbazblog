<template>
  <div id="app">
    <div id="loading" v-if="loading">
      <div class="center">
        <grid-loader color="white" size="15px"></grid-loader>
      </div>
    </div>
    <div v-else>
      <router-view name="header"></router-view>
      <main>
        <fade-transition origin="center" mode="out-in" :duration="250">
          <router-view />
        </fade-transition>
      </main>
      <router-view name="footer"></router-view>
    </div>
  </div>
</template>
<script>
import { FadeTransition } from "vue2-transitions";
import ApiService from "@/core/services/api.service.js";
import GridLoader from "vue-spinner/src/GridLoader.vue";
export default {
  components: {
    FadeTransition,
    GridLoader,
  },
  data() {
    return {
      option: {},
      loading: true,
    };
  },
  beforeCreate() {
    ApiService.get("/options").then((x) => {
      localStorage.setItem("option", JSON.stringify(x.data));
      this.loading = false;
    });
  },
  metaInfo() {
    return {
      title: "Sihirbaz Blog",
      meta: [
        {
          name: "description",
          content: "Bilgi öğrenmek ücretsiz olmalıdır.",
        },
        {
          property: "og:title",
          content: "Sihirbaz Blog",
        },
        { property: "og:sihirbazblog.com", content: "Sihirbaz" },
        { property: "og:type", content: "website" },
        { name: "robots", content: "index,follow" },
      ],
    };
  },
};
</script>
<style lang="scss">
#app{
  background-color: #ECEDF8;
}
#timeline-section img {
  max-width: 90%;
}
#loading {
  width: 100%;
  text-align: center;
  background-color: #2A1685;
}
.center{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.gb-vue-timeline-update .gb-vue-timeline-update__right .gb-vue-timeline-update__information{
  display: block !important;
}
</style>