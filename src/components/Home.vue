<template>
  <div>
    <p>home</p>
    <button @click="more">more</button>
    <input type="text" />
    <button>send</button>
  </div>
</template>

<script>
import axios from "axios";
axios.post();

export default {
  data() {
    return {
      post: [],
    };
  },
  methods: {
    more() {
      axios
        .get("http://localhost:3000/postdata", { name: "data" })
        .then((result) => {
          console.log(result.data);
          // result.data.posts.forEach((element) => {
          //   this.post.push(element);
          // });
        });
    },
  },
};
</script>

<style>
</style>