<template>
  <div class="card-columns">
    <div
      v-for="item in getImpressionSort()"
      :key="item._id"
      v-if="item.status == 'Published'"
      class="card"
    >
      <a href="javascript:void(0)" @click="$router.push(`/blog/${item._id}`)">
        <img :src="item.image_path" class="card-img-top" :alt="item.name" />
        <div class="card-body">
          <h6 class="card-title">{{ item.name }}</h6>
          <p class="card-text">
            {{ item.short_description + "..." }}
          </p>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    _blogs: {
      type: String
    },
  },
  methods: {
    getImpressionSort() {
      let array = JSON.parse(this._blogs).sort((x, y) => y.impression - x.impression);
      return array;
    },
  },
};
</script>

<style lang="scss">
.card-body p {
  font-size: 13px;
}
@media only screen and (max-width: 1200px) {
    .card-text{
        display: none;
    }
}
</style>