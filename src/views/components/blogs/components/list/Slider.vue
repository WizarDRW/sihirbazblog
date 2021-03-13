<template>
  <carousel :per-page="1" :mouse-drag="true" autoplay>
    <slide
      v-for="item in get()"
      :key="item._id"
      :data-name="item.name"
      v-if="item.showcases.includes('Carousel')"
      @slide-click="$router.push(`/blog/${item._id}`)"
    >
      <img :src="item.image_path" class="card-img-top" :alt="item.name" />
      <h4>{{ item.name }}</h4>
    </slide>
  </carousel>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
export default {
  components: {
    Carousel,
    Slide,
  },
  props: {
    _blogs: {
      type: String,
      default: null,
    },
  },
  methods: {
      get() {
         return JSON.parse(this._blogs); 
      }
  },
};
</script>

<style lang="scss" scoped>
</style>