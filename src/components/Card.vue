<template>
  <div>
    <div v-for="item in this.$store.state.posts" :key="item">
      <div class="my-4">
        <div
          class="card mx-auto"
          style="width: 25rem; border-radius: 10px"
        >
        <p>{{item.authorName}}</p>
        <p>{{item.content}}</p>
        <p>{{item.date}}</p></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {},
  data() {
    return {};
  },
  props: {},
  watch: {},
  methods: {},

  beforeCreate() {},
};
</script>

<style>
</style>