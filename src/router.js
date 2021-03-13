import Vue from "vue";
import Router from "vue-router";
import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter";
import Components from "./views/Components.vue";
import Landing from "./views/Landing.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Profile from "./views/Profile.vue";
import Blog from "./views/components/blogs/Blog.vue";
import About from "./views/components/about/About.vue";

Vue.use(Router);

export default new Router({
  mode: "hash",
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "Home",
      components: {
        header: AppHeader,
        default: Components,
        footer: AppFooter
      }
    },
    {
      path: "/blog",
      name: "blog",
      components: {
        header: AppHeader,
        default: Blog,
        footer: AppFooter
      }
    },
    {
      path: "/blog/:id",
      name: "blog",
      components: {
        header: AppHeader,
        default: () => import("./views/components/blogs/components/Content.vue"),
        footer: AppFooter
      }
    },
    {
      path: "/find/:text",
      name: "find",
      components: {
        header: AppHeader,
        default: () => import("./views/components/blogs/components/Find.vue"),
        footer: AppFooter
      }
    },
    {
      path: "/about",
      name: "about",
      components: {
        header: AppHeader,
        default: About,
        footer: AppFooter
      },
      children: [{
        path: "/about/ourhistory",
        name: "ourhistory",
        component: () => import("./views/components/about/components/OurHistory.vue")
      }]
    },
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});
