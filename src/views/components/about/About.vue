<template>
  <div class="position-relative">
    <section class="section-shaped my-0">
      <div class="shape shape-style-1 shape-default"></div>
      <div class="container shape-container d-flex">
        <div class="col px-0">
          <div class="row">
            <div class="col-lg-6">
              <h1 class="display-3 text-white">Hakkımızdakiler</h1>
              <div class="btn-wrapper"></div>
            </div>
          </div>
        </div>
      </div>
      <br />
    </section>

    <section class="section section-lg">
      <div class="container">
        <div class="row row-grid align-items-center">
          <div class="col-md-3 order-md-2">
            <img src="img/theme/promo-1.png" class="img-fluid floating" />
          </div>
          <div class="col-md-9 order-md-1">
            <div class="pr-md-5">
                <router-view></router-view>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ApiService from "@/core/services/api.service.js";
export default {
  components: {},
  data() {
    return {};
  },
  created() {},
};
</script>

<style lang="scss" scoped>
</style>