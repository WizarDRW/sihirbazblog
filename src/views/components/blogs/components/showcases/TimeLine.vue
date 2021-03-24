<template>
  <div>
    <vue-timeline-update
      v-for="item in getDateSort()"
      :key="item._id"
      v-if="item.status === 'Published'"
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
</template>

<script>
export default {
  props: {
    _blogs: {
      type: String,
    },
  },
  data() {
    return {
      blogs: this._blogs,
    };
  },
  methods: {
    getCategories(categories) {
      var cat = "";
      categories.forEach((element, index, array) => {
        if (index === array.length - 1) {
          cat += element;
        } else cat += element + ", ";
      });
      return cat;
    },
    getDateSort() {
      let array = JSON.parse(this._blogs).sort(
        (x, y) => new Date(y.create_date) - new Date(x.create_date)
      );
      return array;
    },
  },
  computed: {},
};
</script>

<style lang="scss">
.gb-vue-timeline-update--dark .gb-vue-timeline-update__right .gb-vue-timeline-update__description{
    color: black !important;
}
.gb-vue-timeline-update--dark .gb-vue-timeline-update__left .gb-vue-timeline-update__ago, .gb-vue-timeline-update--dark .gb-vue-timeline-update__right .gb-vue-timeline-update__ago{
    color: black !important;
}
</style>