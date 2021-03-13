<template>
  <div class="container">
    <card shadow>
      <form>
        <div v-if="isLogin()">
          <p>{{ JSON.parse(user).email }}</p>
        </div>
        <div v-else>
          <base-input
            v-model="comment.email"
            alternative
            placeholder="Mail adresiniz"
          ></base-input>
        </div>
        <textarea
          v-model="comment.comment"
          class="form-control form-control-alternative"
          id="exampleFormControlTextarea1"
          rows="3"
          placeholder="Mesajınız ..."
        ></textarea>
        <br />
        <base-button type="primary">Gönder</base-button>
      </form>
    </card>
  </div>
</template>

<script>
import ApiService from "@/core/services/api.service.js";
export default {
  props: {
    _id: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      comment: {
        user_id: null,
        blog_id: null,
        comment: null,
        email: null,
      },
      user: null
    };
  },
  methods: {
    save() {
      this.comment.blog_id = this._id;
      if (localStorage.getItem("auth")) {
        this.comment.user_id = localStorage.getItem("auth").id;
      }
      ApiService.post("/comments/", this.comment).then((x) => {
        console.log(x);
      });
    },
    isLogin() {
      var u = localStorage.getItem("USER_INFO");
      if (u) {
        this.user = u;
        return true;
      } else return false;
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  width: 100%;
}
</style>