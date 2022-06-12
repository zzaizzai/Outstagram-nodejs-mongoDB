<template>
  <div>
    <div>
      <div class="profile-container center-block">
        <div>_id: {{ profileUid }}</div>
        <div>name: {{ profileName }}</div>
        <div>ID: {{ profileEmail }}</div>
        <div>content: {{ profileContent }}</div>
        <div>profileUrl: {{ profileProfileUrl }}</div>
        <div>{{ profileName }}</div>
        <div><button @click="EditProfile" v-if="isProfileOwner == true">edit</button></div>
        <div><button @click="$store.dispatch('CheckChatRoomAndCreateChatRoom', profileDataForChat)">chat</button></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  methods:{
    EditProfile() {
      console.log("edit profile")
      this.$router.push("/edit/profile");
    }
  },
  data() {
    return {
      profileName: "",
      profileEmail: "",
      profileUid: "",
      profileContent: "",
      profileProfileUrl: "none",
      isProfileOwner: false,
      profileDataForChat: [
        {
          authorEmail: "",
          authorName: "",
          authorUid: "",
        },
      ],
    };
  },
  created() {
    this.profileEmail = this.$route.params.id;
    axios
      .post("http://localhost:3000/getprofile", {
        profileEmail: this.profileEmail,
      })
      .then((result) => {
        console.log(result.data.profile);
        this.profileName = result.data.profile.displayName;
        this.profileEmail = result.data.profile.id;
        this.profileUid = result.data.profile._id;
        this.profileContent = result.data.profile.content;
        this.profileProfileUrl = result.data.profile.profileUrl;

        this.profileDataForChat.authorName = result.data.profile.displayName;
        this.profileDataForChat.authorUid = result.data.profile._id;
        this.profileDataForChat.authorEmail = result.data.profile.id

        if (this.profileUid == this.$store.state.myUserData.uid) {
          this.isProfileOwner = true;
        } else {
          this.isProfileOwner = false;
        }
      });
  },
};
</script>

<style>
.profile-container {
  background-color: gainsboro;
  width: 30%;
  margin: auto;
  margin-top: 20px;
  padding: 20px;
  border-radius: 20px;
}
</style>