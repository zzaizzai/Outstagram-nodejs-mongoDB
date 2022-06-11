<template>
  <div>
    <div v-for="item in this.$store.state.posts" :key="item">
      <div class="my-4">
        <div class="card mx-auto" style="width: 25rem; border-radius: 10px">
          <div class="row">
            <div class="card-profile row">
              <div class="col-3">
                <div class="profile-item profile-item-image">profileurl</div>
              </div>
              <p class="profile-item profile-item-username col-6">
                {{item.authorName}} ({{ item.authorEmail }})
              </p>
            </div>
            <div>
              <div class="content">{{ item.content }}</div>
            </div>
            <div class="d-flex d-inline-flex">
              <img
                src="./../assets/images/heart.svg"
                class="card-button mx-1"
              />
              <img src="./../assets/images/mail.svg" class="card-button mx-1" @click="$store.dispatch('CheckChatRoomAndCreateChatRoom', item)" />
            </div>
            <p class="content-date">{{ item.date }}</p>
          </div>
        </div>
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
.card {
  padding: 5px;
  margin: 0px;
}
.card-profile {
  margin: 10px;
}
.profile-item {
  margin-left: 10px;
  margin-right: 10px;
}

.profile-item-image {
  background-color: gray;
  border-radius: 50px;
  width: 50px;
  height: 50px;
}
.profile-item-username {
  padding: 10px;
  margin: 5px;
  text-align: left;
  font-weight: 600;
}

.content-date {
  font-size: 12px;
  color: gray;
}

.content{
  margin: 5px;
}
.card-button {
  height: 25px;
  width: 25px;
}
.card-button:hover{
  filter: brightness(0.2);
  cursor: pointer;
}
</style>