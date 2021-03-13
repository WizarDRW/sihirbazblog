<template>
  <section class="section section-lg section-shaped overflow-hidden my-0">
    <div class="shape shape-style-1 shape-default shape-skew">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="container shape-container py-0 pb-5">
      <div class="row row-grid justify-content-between align-items-center">
        <div class="col-lg-6">
          <h3 class="display-3 text-white">
            {{ option.h3 }}
            <span class="text-white">{{ option.span }}</span>
          </h3>
          <p class="lead text-white">{{ option.p }}</p>
          <div class="btn-wrapper">
            <router-link to="/login" class="btn btn-success">
              {{ option.button1 }}
            </router-link>
            <router-link to="/register" class="btn btn-success">
              {{ option.button2 }}
            </router-link>
          </div>
        </div>
        <div class="col-lg-5 mb-lg-auto">
          <div class="transform-perspective-right">
            <card
              class="border-0"
              type="secondary"
              shadow
              body-classes="px-lg-5 py-lg-5"
              header-classes="pb-5 bg-white"
            >
              <template slot="header">
                <div class="text-muted text-center mb-3">
                  <small>Bunlarla bağlan</small>
                </div>
                <div class="btn-wrapper text-center">
                  <base-button type="neutral">
                    <img slot="icon" src="img/icons/common/github.svg" />
                    Github
                  </base-button>

                  <base-button type="neutral">
                    <img slot="icon" src="img/icons/common/google.svg" />
                    Google
                  </base-button>
                </div>
              </template>
              <template>
                <div class="text-center text-muted mb-4">
                  <small>Yada doğrulama ile giriş yap</small>
                </div>
                <form role="form">
                  <base-input
                    alternative
                    placeholder="Email"
                    addon-left-icon="ni ni-email-83"
                  >
                  </base-input>
                  <base-input
                    alternative
                    type="password"
                    placeholder="Şifre"
                    addon-left-icon="ni ni-lock-circle-open"
                  >
                  </base-input>
                  <base-checkbox> Beni hatırla </base-checkbox>
                  <div class="text-center">
                    <base-button type="primary" class="my-4"
                      >Giriş Yap</base-button
                    >
                  </div>
                </form>
              </template>
            </card>
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
      (x) => x.key == "secondhero"
    ).json;
    console.log(parse);
    var option = JSON.parse(parse);
    this.option = option;
  },
};
</script>
<style>
</style>
