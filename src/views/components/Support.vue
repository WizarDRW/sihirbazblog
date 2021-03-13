<template>
  <section class="section section-lg">
    <div class="container">
      <div class="row row-grid justify-content-center">
        <div class="col-lg-8 text-center">
          <h2 class="display-3">
            {{ option.h2 }}
            <span class="text-success">{{ option.span }}</span>
          </h2>
          <p class="lead">{{ option.p }}</p>
          <div class="btn-wrapper">
            <a
              :href="option.button.href"
              class="btn btn-primary mb-3 mb-sm-0"
              >{{ option.button.name }}</a
            >
          </div>
          <div class="text-center">
            <h4 class="display-4 mb-5 mt-5">{{ option.h4 }}</h4>
            <div class="row justify-content-center">
              <div
                v-for="item in option.supports"
                :key="item"
                class="col-lg-2 col-4"
              >
                <a
                  :href="item.href"
                  target="_blank"
                  data-toggle="tooltip"
                  :data-original-title="item.title"
                >
                  <img v-lazy="item.logo" class="img-fluid" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      option: {},
    };
  },
  created() {
    var parse = JSON.parse(this.$store.getters["getOption"]).find(
      (x) => x.key == "support"
    );
    this.option = JSON.parse(parse.json);
    console.log(this.option);
  },
};
</script>
<style>
</style>
