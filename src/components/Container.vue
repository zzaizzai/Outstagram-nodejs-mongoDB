<template>
  <div class="container-bg">
    <button @click="$store.dispatch('FetchLiked')">test</button>
    <Card />
    <div>{{$store.state.postCount}}</div>
    <button @click="$store.dispatch('GetPostsAction')" class="btn">
      Show More
    </button>
  </div>
</template>

<script>
import Card from "./Card.vue";
// import axios from "axios"

export default {
  data() {
    return {};
  },
  components: {
    Card,
  },
  props: {},
  methods: {},
  updated() {
        this.$store.dispatch('FetchLiked')
  },
  mounted() {
    if (this.$store.state.postCount == 0) {
      this.$store.dispatch("GetPostsAction");
    }
    // this.$store.dispatch('FetchLiked')


    
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