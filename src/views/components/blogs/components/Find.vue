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
    <section class="section section-lg pt-lg-0" id="blogs">
      <div class="container">
        <div class="row">
          <div class="col-10">
            <div id="timeline-section">
              <vue-timeline-update
                v-for="item in blogs"
                :key="item.id"
                :date="new Date(item.create_date)"
                :title="item.name"
                locale="tr_TR"
                :description="item.short_description"
                :thumbnail="item.image_path"
                :category="getCategories(item.categories)"
                icon="code"
                color="blue"
                @click="$router.push(`/blog/${item._id}`)"
              />
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
import { Carousel, Slide } from "vue-carousel";
import Modal from "@/components/Modal.vue";
export default {
  components: {
    Carousel,
    Slide,
    Modal,
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
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      ApiService.get(`/blogs/find/${this.$route.params.text}`).then((x) => {
        this.blogs = x.data.sort(
          (x, y) => new Date(y.create_date) - new Date(x.create_date)
        );
      });
    },
    getCategories(categories) {
      var cat = "";
      categories.forEach((element, index, array) => {
        if (index === array.length - 1) {
          cat += element;
        } else cat += element + ", ";
      });
      return cat;
    },
  },
  watch: {
    "$route.params.text": function () {
      this.getData();
    },
  },
};
</script>

<style lang="scss" scoped>
#blogs {
  margin-top: 30px;
}
</style>