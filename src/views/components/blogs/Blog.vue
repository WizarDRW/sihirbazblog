<template>
  <div>
    <component :is="componentId" v-on:change="change" :_blog="blog"></component>
  </div>
</template>

<script>
export default {
  components: {
    List: () => import("./components/List"),
    Content: () => import("./components/Content")
  },
  data() {
    return {
      componentId: "List",
      blog: 0,
    };
  },
  methods: {
    change(value) {
      this.componentId = value.directory;
      this.blog = value.blog;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>