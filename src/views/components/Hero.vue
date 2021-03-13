<template>
  <section class="section-hero section-shaped my-0">
    <div class="shape shape-style-1 shape-primary">
      <span class="span-150"></span>
      <span class="span-50"></span>
      <span class="span-50"></span>
      <span class="span-75"></span>
      <span class="span-100"></span>
      <span class="span-75"></span>
      <span class="span-50"></span>
      <span class="span-100"></span>
      <span class="span-50"></span>
      <span class="span-100"></span>
    </div>
    <div class="container shape-container d-flex align-items-center">
      <div class="col px-0">
        <div class="row justify-content-center align-items-center">
          <div class="col-lg-7 text-center pt-lg">
            <img
              :src="options.main_logo"
              style="width: 300px"
              class="img-fluid"
            />
            <p class="lead text-white mt-4 mb-5">{{ options.main_title }}</p>
          </div>
        </div>
        <div
          class="row align-items-center justify-content-around stars-and-coded"
        >
          <div class="col-sm-4 mt-4 mt-sm-0 text-center">
            <span class="text-white alpha-7">Kodlayan</span>
            <a
              href="https://softelon.com"
              target="_blank"
              title="Softelon"
            >
              <img :src="options.codedby" class="ml-3" style="height: 30px" />
            </a>
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
