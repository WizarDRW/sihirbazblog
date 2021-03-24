<template>
  <div>
    <section v-if="loading" id="loading-list">
      <div class="center-list">
        <loader color="#6570E2"></loader>
      </div>
    </section>
    <section id="menu">
      <div class="row">
        <div class="col-lg-3">
          <div class="sticky">
            <input
              v-model="search"
              type="text"
              name="search"
              id="search"
              class="form-control"
              placeholder="Arama yapın..."
            />
            <br />
            <treeselect
              :multiple="true"
              :options="blogcategories"
              :value-consists-of="valueConsistsOf"
              v-model="categories"
              placeholder="Kategori veya kategorileri seçiniz..."
              :joinValues="true"
              noResultsText="İstediğiniz kategori bulunmamaktadır!"
              value="id[]"
            />
            <br />
            <flat-picker
              :config="{ allowInput: true, mode: 'range' }"
              class="form-control datepicker"
              v-model="dates.range"
            >
            </flat-picker>
          </div>
        </div>
        <div class="col-lg-9">
          <div class="card-columns">
            <div
              v-for="item in filterBlogList"
              :key="item._id"
              v-if="item.status == 'Published'"
              class="card"
            >
              <a
                href="javascript:void(0)"
                @click="$router.push(`/blog/${item._id}`)"
              >
                <img
                  :src="item.image_path"
                  class="card-img-top"
                  :alt="item.name"
                />
                <div class="card-body">
                  <h5 class="card-title">{{ item.name }}</h5>
                  <p class="card-text">
                    {{ item.short_description + "..." }}
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import ApiService from "@/core/services/api.service.js";
import Loader from "vue-spinner/src/ScaleLoader.vue";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import flatpickr from "flatpickr";
import { Turkish } from "flatpickr/dist/l10n/tr.js";
import "flatpickr/dist/flatpickr.css";
import moment from "moment";

import flatPicker from "vue-flatpickr-component";

flatpickr.localize(Turkish);
export default {
  components: {
    Loader,
    Treeselect,
    flatPicker,
  },
  data() {
    return {
      blogs: [],
      filterblogs: [],
      blogcategories: [],
      loading: true,
      valueConsistsOf: "ALL",
      search: "",
      categories: [],
      dates: {
        range: `${moment("2021-01-01").format(
          "YYYY-MM-DD"
        )} - ${moment().format("YYYY-MM-DD")}`,
      },
    };
  },
  mounted() {
    ApiService.get("/blogcategories").then((x) => {
      this.blogcategories = x.data.map((x) => {
        return {
          id: x.id,
          label: x.label,
          children: x.children,
        };
      });
      ApiService.get("/blogs").then((x) => {
        this.blogs = x.data;
        this.filterBlogList = this.blogs;
      });
      this.loading = false;
    });
  },
  computed: {
    filterBlogList: {
      get() {
        return this.filterblogs;
      },
      set(value) {
        this.filterblogs = value;
      },
    },
  },
  methods: {
    filter() {
      var range = this.dates.range.split(" - ");
      this.filterBlogList = this.blogs.filter((x) => {
        return (
          new Date(x.create_date) >= new Date(range[0]) &&
          new Date(x.create_date) <= new Date(range[1]) &&
          x.name.toLowerCase().includes(this.search.toLowerCase()) &&
          this.filter_category(x)
        );
      });
    },
    filter_category(x) {
      var data = true;
      if (this.categories.length > 0) {
        this.categories.some(function (element) {
          if (x.categories.includes(element)) return data = true;
          else {
            return data = false;
          }
        });
      }
      return data;
    },
  },
  watch: {
    dates: {
      deep: true,
      handler() {
        this.filter();
      },
    },
    search() {
      this.filter();
    },
    categories() {
      this.filter();
    },
  },
};
</script>


<style lang="scss" scoped>
.row {
  padding: 30px;
  height: 100vh;
}
.col-lg-3 {
  display: initial;
  justify-content: space-around;
  align-items: flex-start;
}
div.sticky {
  position: sticky;
}
</style>