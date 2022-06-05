<template>
  <div class="main-bg">
    <Container />
  </div>
</template>

<script>
import Container from "./Container.vue";

export default {
  mounted() {
    this.$store.dispatch('GetPosts')
  },
  components: {
    Container,
  },
};
</script>

<style>
.main-bg {
  position: relative;
  top: 30px;
}
</style>