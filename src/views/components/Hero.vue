<template>
  <section class="section-shaped my-0">
    <div class="shape shape-style-1 shape-primary">
    </div>
    <div class="container shape-container d-flex align-items-center">
      <div class="col px-0">
        <div class="row justify-content-center align-items-center">
          <div class="col-lg-7 text-center">
            <img
              :src="options.main_logo"
              style="width: 300px"
              class="img-fluid"
            />
            <p class="lead text-white mt-4 mb-5">{{ options.main_title }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import ApiService from "@/core/services/api.service.js";
export default {
  data() {
    return {
      options: {},
    };
  },
  created() {
    this.options = JSON.parse(localStorage.getItem("option")).find(
      (x) => x.key == "hero"
    ).json;
  },
};
</script>
<style>
</style>
