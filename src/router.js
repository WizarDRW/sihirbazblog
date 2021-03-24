import Vue from "vue";
import Router from "vue-router";
import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter";
import Components from "./views/Components.vue";
import Blog from "./views/components/blogs/Blog.vue";
import About from "./views/components/about/About.vue";

Vue.use(Router);
var currentRouteName = "Home";
export default new Router({
  mode: "history",
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "Home",
      beforeEnter: (to, from, next) => {
        currentRouteName = "Home";
        next();
      },
      components: {
        header: AppHeader,
        default: Components,
        footer: AppFooter
      }
    },
    {
      path: "/blog",
      redirect: "/blog/showcase",
      name: "blog",
      beforeEnter: (to, from, next) => {
        currentRouteName = "blog";
        next();
      },
      components: {
        header: AppHeader,
        default: Blog,
        footer: AppFooter
      },
      children:[
        {
          path: "/blog/showcase",
          name: "showcase",
          component: () => import("./views/components/blogs/components/Showcase.vue")
        },
        {
          path: "/blog/category",
          name: "category",
          component: () => import("./views/components/blogs/components/Category.vue")
        },
        {
          path: "/blog/newpost",
          name: "newpost",
          component: () => import("./views/components/blogs/components/NewPost.vue")
        }
      ]
    },
    {
      path: "/blog/:id",
      name: "blogcontent",
      beforeEnter: (to, from, next) => {
        currentRouteName = "blogcontent";
        next();
      },
      components: {
        header: AppHeader,
        default: () => import("./views/components/blogs/components/Content.vue"),
        footer: AppFooter
      }
    },
    {
      path: "/find/:text",
      name: "find",
      beforeEnter: (to, from, next) => {
        currentRouteName = "find";
        next();
      },
      components: {
        header: AppHeader,
        default: () => import("./views/components/blogs/components/Find.vue"),
        footer: AppFooter
      }
    },
    {
      path: "/about",
      name: "about",
      beforeEnter: (to, from, next) => {
        currentRouteName = "about";
        next();
      },
      components: {
        header: AppHeader,
        default: About,
        footer: AppFooter
      },
      children: [{
        path: "/about/ourhistory",
        name: "ourhistory",
        beforeEnter: (to, from, next) => {
          currentRouteName = "ourhistory";
          next();
        },
        component: () => import("./views/components/about/components/OurHistory.vue")
      }]
    },
    {
      path: '/*',
      redirect: { name: currentRouteName }
    }
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});
