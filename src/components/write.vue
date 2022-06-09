<template>
  <div>
    <div class="container write-bg center-block">
      <textarea
        class="write-text"
        v-model="newContent"
        name=""
        id=""
        cols="30"
        rows="10"
        placeholder="share your think"
      ></textarea>
    </div>
    <button class="btn btn-secondary" @click="UploadNewPost">upload</button>
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
        authorEmail: this.$store.state.myUserData.userEmail,
        likes: 0,
        date: new Date(),
        uploadImageUrl: "https://placeimg.com/640/480/animals",
      };
      console.log("uploadnewpost");
      this.$store.dispatch("UploadNewPostAction", uploadData).then(() => {
        this.$store.commit("UploadPost", uploadData);
        this.$router.push("/");
      });
    },
  },
};
</script>

<style>
.write-bg {
  background-color: beige;
  width: 500px;
  padding: 20px;
  border-radius: 20px;
  margin-top: 50px;
}
.write-text {
  padding: 10px;
  border-radius: 10px;
}
</style>