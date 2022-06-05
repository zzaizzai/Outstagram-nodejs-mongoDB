<template>
  <div class="container-bg">
    <button @click="$store.dispatch('GetPostsAction')" class="btn">Update One</button>
    <Card />
  </div>
</template>

<script>
import Card from "./Card.vue";
// import axios from "axios"

export default {
  components: {
    Card,
  },
  props: {},
  methods: {
  },
};
</script>

<style>
.container-bg {
  background-color: #eee;
  width: 500px;
  padding: 20px;
  margin: auto;
}
</style>