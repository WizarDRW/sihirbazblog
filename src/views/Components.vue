<template>
    <div>
        <hero></hero>
        <Showcase />
    </div>
</template>
<script>
import Hero from "./components/Hero";
import Showcase from './components/blogs/components/Showcase'
export default {
  name: "components",
  components: {
    Hero,
    Showcase
  }
};
</script>
