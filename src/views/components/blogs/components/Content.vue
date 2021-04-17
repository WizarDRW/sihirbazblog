<template>
  <div class="profile-page">
    <section class="section-profile-cover section-shaped my-0">
      <div class="shape shape-style-1 shape-primary shape-skew alpha-4">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </section>
    <section v-if="loading" id="loading-content">
      <div class="center-content">
        <loader color="#6570E2"></loader>
      </div>
    </section>
    <section v-else class="section section-skew">
      <div class="container">
        <card shadow class="card-profile mt--400" no-body>
          <div class="px-4">
            <!-- <div class="row justify-content-center">
              <div
                class="col-lg-4 order-lg-3 text-lg-right align-self-lg-center"
              >
                <div class="card-profile-actions py-4 mt-lg-0">
                  <base-button type="info" size="sm" class="mr-4"
                    >Takip Et</base-button
                  >
                  <base-button type="default" size="sm" class="float-right"
                    >Mesaj Gönder</base-button
                  >
                </div>
              </div>
              <div class="col-lg-4 order-lg-1">
                <div class="card-profile-stats d-flex justify-content-center">
                  <div>
                    <span class="heading">{{ blog.impressions.length }}</span>
                    <span class="description">Görüntüleme</span>
                  </div>
                  <div>
                    <span class="heading">8/10</span>
                    <span class="description">Değer</span>
                    <star-rating :star-size="10" v-bind:max-rating="10" />
                  </div>
                  <div>
                    <span class="heading">89</span>
                    <span class="description">Yorum</span>
                  </div>
                </div>
              </div>
            </div> -->
            <div class="text-center mt-5">
              <h3>
                {{ blog.name }}
              </h3>
              <div class="h6 mt-1">
                {{ blog.short_description }}
              </div>
              <div>
                <i class="ni education_hat mr-2"></i>
              </div>
            </div>
            <div class="mt-5 py-5 border-top text-center">
              <img :src="blog.image_path" width="100%" alt="" />
              <br />
              <br />
              <div class="row justify-content-center">
                <div class="col-lg-9 text-left">
                  <div v-highlight id="content" v-html="blog.description"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="order-lg-2">
            <div class="user-img card-profile-image">
              <a href="#">
                <img
                  v-if="user.image_path"
                  v-lazy="user.image_path"
                  class="rounded-circle"
                />
                <img
                  v-else
                  src="@/assets/vendor/img/null_profile.png"
                  class="rounded-circle"
                />
              </a>
            </div>
          </div>
          <div class="user-info">
            <div class="h6 font-weight-300">
              <i class="ni location_pin"></i
              >{{ `${user.first_name}  ${user.last_name}` }}
            </div>
            <div class="h6 mt-1">
              <i class="ni business_briefcase-24"></i>{{ user.title }}
            </div>
          </div>
        </card>
        <br />
      </div>
    </section>
  </div>
</template>
<script>
import ApiService from "@/core/services/api.service.js";
import StarRating from "vue-star-rating";
import Loader from "vue-spinner/src/RiseLoader.vue";
import CodeHighlight from "vue-code-highlight/src/CodeHighlight.vue";
import "vue-code-highlight/themes/duotone-sea.css";
import "vue-code-highlight/themes/window.css";
export default {
  props: {
    _blog: {
      type: Object,
    },
  },
  components: {
    StarRating,
    Comment: () => import("./Comment"),
    Loader,
    CodeHighlight,
  },
  data() {
    return {
      user: {},
      blog: {},
      loading: true,
    };
  },
  mounted() {
    ApiService.get(`/blogs/id/${this.$route.params.id}`).then((x) => {
      this.blog = x.data;
      ApiService.get(`/users/id/${x.data.user_id}`).then((u) => {
        this.user = u.data;
        this.loading = false;
      });
      fetch("https://api.ipify.org?format=json")
        .then((response) => response.json())
        .then((response) => {
          ApiService.put("/blogs/updateImpression/id/" + x.data._id, {
            ip_address: response.ip,
            blog_id: this.blog._id,
          });
        });
    });
  },
};
</script>

<style>
.card-profile{
  z-index: 999;
}
.vue-star-rating span {
  display: none;
}
.back {
  position: absolute;
  top: 20px;
  font-size: 35px;
  cursor: pointer;
}

.back i:hover {
  color: black;
}
#content img {
  width: 100%;
  height: 100%;
}
#loading-content {
  width: 100%;
  text-align: center;
}
.center-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}
.user-info {
  text-align: center;
  position: absolute;
  bottom: -90px;
  right: -170px;
  width: 100%;
}
@media only screen and (max-width: 600px) {
  .user-info {
    right: -10px;
  }
  .profile-page .card-profile .card-profile-image img {
    left: 85px !important;
  }
}
@media only screen and (max-width: 510px) {
  .user-info {
    text-align: right;
    right: 5px;
  }
  .profile-page .card-profile .card-profile-image img {
    left: 85px !important;
  }
}

@media only screen and (max-width: 1700px) {
  .iframe-g {
    width: 260px;
    position: absolute;
    padding: 0 0 0 0;
  }
}
.section-shaped .shape-style-1.shape-primary{
  z-index: 0;
}
</style>
