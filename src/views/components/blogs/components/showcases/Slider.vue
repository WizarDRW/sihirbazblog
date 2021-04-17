<template>
  <div>
    <carousel
      :per-page="1"
      :mouse-drag="true"
      autoplay
      autoplayHoverPause
      :speed="2000"
      :autoplayTimeout="7000"
      :loop="true"
    >
      <slide
        v-for="item in get()"
        :key="item._id"
        :data-name="item.name"
        v-if="item.showcases.includes('Carousel')"
        @slide-click="$router.push(`/blog/${item._id}`)"
      >
        <img :src="item.image_path" class="card-img-top" :alt="item.name" />
        <h4>{{ item.name }}</h4>
        <p>{{ item.short_description }}</p>
      </slide>
    </carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel/src/index";
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
    },
  },
};
</script>

<style lang="scss" scoped>
.VueCarousel-slide {
  cursor: pointer;
}
</style>