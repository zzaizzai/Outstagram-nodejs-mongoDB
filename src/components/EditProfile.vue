<template>
  <div>
    <div class="container">
      <div>_id: {{ $store.state.myUserData.uid }}</div>
      <div>ID: {{ $store.state.myUserData.userEmail }}</div>
      <div class="row justify-content-md-center my-3">
        <div class="col-1">Name</div>
        <input
          class="col-3 border"
          type="text"
          v-model="editProfile.profileName"
        />
      </div>
      <div class="row justify-content-md-center my-3">
        <div class="col-1">profileUrl</div>
        <input
          class="col-3 border"
          type="text"
          v-model="editProfile.profileProfileUrl"
        />
      </div>
      <div class="row justify-content-md-center my-3">
        <div class="col-1">content</div>
        <textarea
          class="col-3 edit-content border"
          type="text"
          v-model="editProfile.profileContent"
        />
      </div>
      <button @click="EditProfile">done</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editProfile: {
        displayName: "",
        profileEmail: "",
        profileUid: "",
        profileContent: "",
        profileProfileUrl: "",
      },
    };
  },
  mounted() {
    this.editProfile.profileName = this.$store.state.myUserData.userName;
    this.editProfile.profileEmail = this.$store.state.myUserData.userEmail;
    this.editProfile.profileUid = this.$store.state.myUserData.uid;
    this.editProfile.profileContent = this.$store.state.myUserData.userContent;
    this.editProfile.profileProfileUrl = this.$store.state.myUserData.userProfileurl;
  },
  methods: {
    EditProfile() {
      this.$store.dispatch("EditProfile", this.editProfile);
    },
  },
};
</script>

<style scoped>
.edit-content {
  height: 100px;
}
.border {
  border-radius: 5px;
}
</style>