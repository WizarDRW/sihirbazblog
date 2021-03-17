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
        <card shadow class="card-profile mt--300" no-body>
          <div class="px-4">
            <div class="row justify-content-center">
              <div class="col-lg-3 order-lg-2">
                <div class="card-profile-image">
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
              <div
                class="col-lg-4 order-lg-3 text-lg-right align-self-lg-center"
              >
                <div class="card-profile-actions py-4 mt-lg-0">
                  <!-- <base-button type="info" size="sm" class="mr-4"
                    >Takip Et</base-button
                  > -->
                  <base-button type="default" size="sm" class="float-right"
                    >Mesaj Gönder</base-button
                  >
                </div>
              </div>
              <div class="col-lg-4 order-lg-1">
                <div class="card-profile-stats d-flex justify-content-center">
                  <div>
                    <span class="heading">{{ blog.impression }}</span>
                    <span class="description">Görüntüleme</span>
                  </div>
                  <!--  <div>
                    <span class="heading">8/10</span>
                    <span class="description">Değer</span>
                    <star-rating :star-size="10" v-bind:max-rating="10" />
                  </div>
                  <div>
                    <span class="heading">89</span>
                    <span class="description">Yorum</span>
                  </div> -->
                </div>
              </div>
            </div>
            <div class="text-center mt-5">
              <h3>
                {{ blog.name }}
              </h3>
              <div class="h6 font-weight-300">
                <i class="ni location_pin mr-2"></i
                >{{ `${user.first_name}  ${user.last_name}` }}
              </div>
              <div class="h6 mt-4">
                <i class="ni business_briefcase-24 mr-2"></i>{{ user.title }}
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
                  <div id="content" v-html="blog.description"></div>
                </div>
              </div>
            </div>
          </div>
        </card>
        <br />
        <!-- <comment /> -->
      </div>
    </section>
  </div>
</template>
<script>
import ApiService from "@/core/services/api.service.js";
import StarRating from "vue-star-rating";
import Loader from "vue-spinner/src/RiseLoader.vue";
export default {
  props: {
    _blog: {
      type: Object,
    },
  },
  components: {
    StarRating,
    Comment: () => import("./Comment"),
    Loader
  },
  data() {
    return {
      user: {},
      blog: {},
      loading: true
    };
  },
  mounted() {
    ApiService.get(`/blogs/id/${this.$route.params.id}`).then((x) => {
      this.blog = x.data;
      ApiService.get(`/users/id/${x.data.user_id}`).then((u) => {
        this.user = u.data;
        this.loading = false
      });
    });
  },
};
</script>
<style>
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
pre{
  background-color: rgb(22, 22, 22);
  color: white;
  padding: 5px 10px 5px 10px;
  border-radius: 5px;
}
#content img{
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
</style>
