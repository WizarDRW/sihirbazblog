<template>
  <div class="position-relative">
    <section class="section-shaped my-0">
      <div class="shape shape-style-1 shape-default"></div>
      <div class="container shape-container d-flex">
        <div class="col px-0">
          <div class="row">
            <div class="col-lg-6">
              <h1 class="display-3 text-white">
                Kısa ve Öz
                <span>yeni başlayanlar için değil</span>
              </h1>
              <p class="lead text-white">
                Baştan anlatmıyoruz. Burada zor durumda kalan orta seviye veya
                profesyoneller için rehber hazırlıyoruz. Aynı zamanda bilgisini
                burada paylaşabilecek yeni yazarlar kazanmaya çalışıyoruz.
              </p>
              <div class="btn-wrapper">
                <base-button
                  tag="a"
                  href="#"
                  class="mb-3 mb-sm-0"
                  type="info"
                  icon="fa fa-code"
                  @click="modal = true"
                >
                  Başvur Hemen Yaz!
                </base-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
    </section>
    <section v-if="loading" id="loading-list">
      <div class="center-list">
        <loader color="#6570E2"></loader>
      </div>
    </section>
    <section v-else id="blogs">
      <div class="cont">
        <div class="row">
          <div class="col-md-6">
            <div id="carousel-blogs">
              <Carousel :_blogs="JSON.stringify(blogs)"></Carousel>
            </div>
            <br />
            <br />
            <div id="timeline-section">
              <time-line :_blogs="JSON.stringify(blogs)" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="card-columns">
              <impression :_blogs="JSON.stringify(blogs)" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="dialog-contact">
      <modal :show.sync="modal">
        <template slot="header">
          <h5 class="modal-title" id="exampleModalLabel">
            Bizimle İletişim Kurun
          </h5>
        </template>
        <div>
          <input
            v-model="contact.email"
            placeholder="Mail Adresiniz"
            type="email"
            class="form-control"
          />
          <br />
          <input
            v-model="contact.phone"
            placeholder="Telefon Numaranız"
            type="email"
            class="form-control"
          />
          <br />
          <textarea
            v-model="contact.text"
            placeholder="Mesajınız..."
            name="text"
            id=""
            cols="30"
            rows="10"
            class="form-control"
          ></textarea>
        </div>
        <template slot="footer">
          <base-button type="secondary" @click="modal = false"
            >İptal</base-button
          >
          <base-button type="primary">Gönder</base-button>
        </template>
      </modal>
    </section>
  </div>
</template>

<script>
import ApiService from "@/core/services/api.service.js";
import Modal from "@/components/Modal.vue";
import Loader from "vue-spinner/src/ScaleLoader.vue";
export default {
  components: {
    Carousel: () => import("./list/Slider"),
    TimeLine: () => import("./list/TimeLine"),
    Impression: () => import("./list/Impression"),
    Modal,
    Loader,
  },
  data() {
    return {
      blogs: [],
      modal: false,
      contact: {
        email: "",
        phone: "",
        text: "",
      },
      loading: true
    };
  },
  mounted() {
    ApiService.get("/blogs").then((x) => {
      this.blogs = x.data;
      this.loading = false;
    });
  },
  methods: {
    dialog() {},
  },
};
</script>

<style lang="scss" scoped>
.cont {
  width: 100%;
  padding-right: 55px;
  padding-left: 55px;
  margin-right: auto;
  margin-left: auto;
}
#blogs {
  margin-top: 30px;
}
#loading-list {
  width: 100%;
  text-align: center;
}
.center-list {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}
</style>