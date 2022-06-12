<template>
  <div>
    <div class="container">
      <div>_id: {{ $store.state.myUserData.uid }}</div>
      <div>ID: {{ $store.state.myUserData.userEmail }}</div>
      <div class="row justify-content-md-center my-3">
        <div class="col-1">Name</div>
        <input class="col-3 border" type="text" v-model="profileName" />
      </div>
      <div class="row justify-content-md-center my-3">
        <div class="col-1">profileUrl</div>
        <input class="col-3 border" type="text" v-model="profileProfileUrl" />
      </div>
      <div class="row justify-content-md-center my-3">
        <div class="col-1">content</div>
        <textarea class="col-3 edit-content border" type="text" v-model="profileContent" />
      </div>
      <button @click="EditProfile">done</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      profileName: this.$store.state.myUserData.userName,
      profileEmail: this.$store.state.myUserData.userEmail,
      profileUid: this.$store.state.myUserData.uid,
      profileContent: this.$store.state.myUserData.userContent,
      profileProfileUrl: this.$store.state.myUserData.userProfileurl,
    };
  },
  methods: {
    EditProfile(){
        console.log("done")
    }
  },
};
</script>

<style scoped>
.edit-content{
    height: 100px;
}
.border {
    border-radius: 5px;
}
</style>