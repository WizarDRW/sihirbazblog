<template>
  <div>
    <ul>
      <li v-for="item in datas" :key="item.id">
        <check-box>{{ item.label }}</check-box>
        <ul v-if="item.children">
          <li v-for="child in item.children" :key="child.id">
            <check-box>{{ child.label }}</check-box>
            <ul v-if="child.children">
              <li v-for="childy in child.children" :key="childy.id">
                <check-box>{{ childy.label }}</check-box>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import CheckBox from "@/components/BaseCheckbox.vue";
export default {
  components: {
    CheckBox,
  },
  props: {
    value: {
      type: Array
    },
    datas: {
      type: Array
    },
  },
  computed: {
    model: {
      get() {
        return value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  methods: {
      checkbox(value) {
          console.log(value);
      }
  },
};
</script>

<style lang="scss" scoped>
</style>