<template>
  <div class="position-relative">
    <section v-if="loading" id="loading-list">
      <div class="center-list">
        <loader color="#6570E2"></loader>
      </div>
    </section>
    <section v-else id="blogs">
      <div class="news">
        <div class="row">
          <div class="col-lg-6">
            <div id="carousel-blogs">
              <Carousel :_blogs="JSON.stringify(blogs)"></Carousel>
            </div>
          </div>
        </div>
      </div>
      <div class="cont">
        <div class="row">
          <div class="col-lg-6"></div>
          <div class="col-lg-6">
            <div class="card">
              <div class="card-header"></div>
              <div class="card-body">
                <impression :_blogs="JSON.stringify(blogs)" />
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div id="timeline-section" class="card">
              <div class="card-header"></div>
              <time-line :_blogs="JSON.stringify(blogs)" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ApiService from "@/core/services/api.service.js";
import Modal from "@/components/Modal.vue";
import Loader from "vue-spinner/src/ScaleLoader.vue";
export default {
  components: {
    Carousel: () => import("./showcases/Slider"),
    TimeLine: () => import("./showcases/TimeLine"),
    Impression: () => import("./showcases/Impression"),
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
      loading: true,
      alert: false,
      disabled: false,
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
    sendMail() {
      this.disabled = true;
      ApiService.post("/mail/sendmail", this.contact)
        .then((x) => {
          if (x.status == 200) {
            this.modal = false;
            this.contact = {};
            this.alert = true;
            this.disabled = false;
            setTimeout(() => {
              this.alert = false;
            }, 6000);
          }
        })
        .catch((err) => (this.disabled = false));
    },
    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
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
.alert {
  width: 30%;
  opacity: 90%;
  color: #fff;
  background-color: rgb(0, 165, 0);
  position: fixed;
  z-index: 9999;
  bottom: 10px;
  right: 10px;
}
.card {
  margin: 10px 0 10px 0;
}
.card-header {
  padding: 0.7rem 1.5rem;
  background: #cdcae0;
  color: rgb(54, 54, 54);
}
@media only screen and(max-width: 650px) {
  .cont {
    padding: 0;
    margin: 0;
  }
  .card-body {
    padding: 0.5rem;
  }
}
</style>