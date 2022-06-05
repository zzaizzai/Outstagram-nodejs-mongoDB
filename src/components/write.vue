<template>
  <div>
    <div>
      <div>
        <textarea
          v-model="newContent"
          name=""
          id=""
          cols="30"
          rows="10"
        ></textarea>
      </div>
      <button @click="UploadNewPost">upload</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newContent: "",
    };
  },
  methods: {
    UploadNewPost() {
      var uploadData = {
        content: this.newContent,
        authorProfileUrl: this.$store.state.myUserData.userProfileurl,
        authorUid: this.$store.state.myUserData.uid,
        authorName: this.$store.state.myUserData.userName,
        likes: 0,
        date: new Date(),
        uploadImageUrl: "https://placeimg.com/640/480/animals",
      };
      console.log("uploadnewpost");
      this.$store.dispatch("UploadNewPostAction", uploadData).then(() => {
        this.$router.push("/");
      });
    },
  },
};
</script>

<style>
</style>