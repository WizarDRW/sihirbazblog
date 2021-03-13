<template>
  <div id="app">
    <router-view name="header"></router-view>
    <main>
      <fade-transition origin="center" mode="out-in" :duration="250">
        <router-view />
      </fade-transition>
    </main>
    <router-view name="footer"></router-view>
  </div>
</template>
<script>
import { FadeTransition } from "vue2-transitions";
import ApiService from "@/core/services/api.service.js";

export default {
  components: {
    FadeTransition,
  },
  data() {
    return {
      option: {},
    };
  },
  created() {
    ApiService.get("/options").then((x) => {
      localStorage.setItem("option", JSON.stringify(x.data));
    });
  },
  metaInfo() {
    return {
      title: "Sihirbaz Blog",
      meta: [
        {
          name: "description",
          content:
            "Bilgi öğrenmek ücretsiz olmalıdır.",
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
#timeline-section img {
  max-width: 90%;
}
</style>