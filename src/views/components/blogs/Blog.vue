<template>
  <div>
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
                  href="javascript:void(0)"
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
    <router-view></router-view>
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
            pattern="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
            class="form-control"
          />
          <br />
          <input
            v-model="contact.phone"
            placeholder="Telefon Numaranız"
            type="text"
            v-mask="'#(###) ### ## ##'"
            class="form-control"
          />
          <br />
          <textarea
            v-model="contact.text"
            placeholder="Mesajınız..."
            name="text"
            cols="30"
            rows="10"
            class="form-control"
          ></textarea>
        </div>
        <template slot="footer">
          <base-button type="secondary" @click="modal = false"
            >İptal</base-button
          >
          <base-button type="primary" @click="sendMail()" :disabled="disabled">
          <loader v-if="disabled" color="white" height="10px" width="10px"></loader>
          <span v-else>Gönder</span>
          </base-button>
        </template>
      </modal>
      <base-alert type="success" dismissible :visible="alert">
        <span class="alert-inner--icon"><i class="ni ni-like-2"></i></span>
        <span class="alert-inner--text"
          ><strong>Başarılı!</strong> Bildiriminiz tarafımıza başarıyla
          ulaşmıştır. En kısa zamanda sizinle iletişime geçeceğiz.</span
        >
        <button
          type="button"
          class="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </base-alert>
    </section>
  </div>
</template>

<script>
import Modal from "@/components/Modal.vue";
export default {  
  components: {
    Modal,
  },
  data() {
    return {
      modal: false,
      contact: {
        email: "",
        phone: "",
        text: "",
      },
      alert: false,
      disabled: false
    };
  },
  methods: {
    sendMail() {
      this.disabled = true;
      ApiService.post("/mail/sendmail", this.contact).then((x) => {
        if (x.status == 200) {
          this.modal = false;
          this.contact = {}
          this.alert = true;
          this.disabled = false;
          setTimeout(() => {
            this.alert = false;
          }, 6000);
        }
      }).catch(err => this.disabled = false);
    },
    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  },
}
</script>