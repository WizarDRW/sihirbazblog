<template>
  <footer class="footer has-cards">
    <div class="container">
      <div class="row row-grid align-items-center my-md">
        <div class="col-lg-6">
          <h3 class="text-primary font-weight-light mb-2">{{ option.h3 }}</h3>
          <h4 class="mb-0 font-weight-light">{{ option.h4 }}</h4>
        </div>
        <div class="col-lg-6 text-lg-center btn-wrapper">
          <a
            v-for="item in option.socials"
            :key="item"
            target="_blank"
            rel="noopener"
            :href="item.href"
            :class="`btn btn-neutral btn-icon-only btn-${item.name} btn-round btn-lg`"
            data-toggle="tooltip"
            :data-original-title="item.name"
          >
            <i :class="item.icon"></i>
          </a>
        </div>
      </div>
      <div class="row row-grid align-items-center my-md">
        <div class="col-lg-3">
          <img
            src="https://www.cloudflare.com/img/logo-cloudflare-dark.svg"
            width="100%"
          />
        </div>
        <div class="col-lg-3">
          <img
            src="https://www.litespeedtech.com/images/logos/litespeed/litespeed-logo.svg"
            width="100%"
          />
        </div>
        <div class="col-lg-3">
          <img
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Logo.png"
            width="100%"
          />
        </div>
        <div class="col-lg-3">
          <img
            src="https://logos-download.com/wp-content/uploads/2016/09/Heroku_logo.png"
            width="100%"
          />
        </div>
      </div>
      <div class="row row-grid align-items-center my-md">
        <div class="col-lg-3">
          <img
            src="https://logos-download.com/wp-content/uploads/2016/09/MongoDB_logo_Mongo_DB.png"
            width="100%"
          />
        </div>
        <div class="col-lg-3">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1280px-Node.js_logo.svg.png"
            width="100%"
          />
        </div>
        <div class="col-lg-3">
          <img
            src="https://demos.creative-tim.com/argon-design-system/assets/img/brand/blue.png"
            width="100%"
          />
        </div>
        <div class="col-lg-3">
          <img
            src="https://pngimg.com/uploads/mysql/mysql_PNG6.png"
            width="100%"
          />
        </div>
      </div>
      <hr />
      <div class="row align-items-center justify-content-md-between">
        <div class="col-md-6">
          <div class="copyright">
            &copy; {{ year }}
            <a :href="option.a1.href" target="_blank" rel="noopener">{{
              option.a1.name
            }}</a>
            &amp;
            <a :href="option.a2.href" target="_blank" rel="noopener">{{
              option.a2.name
            }}</a>
          </div>
        </div>
        <div class="col-md-6">
          <ul class="nav nav-footer justify-content-end">
            <li v-for="item in option.categories" :key="item" class="nav-item">
              <a
                :href="item.href"
                class="nav-link"
                target="_blank"
                rel="noopener"
                >{{ item.name }}</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  name: "app-footer",
  data() {
    return {
      year: new Date().getFullYear(),
      option: {},
    };
  },
  beforeMount() {
    var parse = JSON.parse(this.$store.getters["getOption"]).find(
      (x) => x.key == "footer"
    );
    this.option = parse.json;
  },
};
</script>
<style>
.footer{
  background-color: blanchedalmond;
}
</style>
