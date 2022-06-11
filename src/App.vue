<template>
  <div>
    <div>
      <ul class="nav justify-content-center">
        <li class="nav-item" style="flex-grow: 1"></li>
        <li class="nav-item">
          <a class="nav-link active"
            ><router-link to="/">Oustagram</router-link></a
          >
        </li>
        <li class="nav-item" style="flex-grow: 1"></li>
        <li class="nav-item">
          <a class="nav-link"
            ><router-link to="/">
              <img
                class="nav-image"
                src="./assets/images/home.svg"
                alt=""
              /> </router-link
          ></a>
        </li>
        <li class="nav-item">
          <a class="nav-link"
            ><router-link to="/write">
              <img
                class="nav-image"
                src="./assets/images/write.svg"
                alt=""
              /> </router-link
          ></a>
        </li>
        <li class="nav-item">
          <a class="nav-link"
            ><router-link to="/chat">
              <img
                class="nav-image"
                src="./assets/images/mail.svg"
                alt=""
              /> </router-link
          ></a>
        </li>
        <li class="nav-item">
          <a class="nav-link"
            ><router-link to="/profile">
              <img
                class="nav-image"
                src="./assets/images/profile.svg"
                alt="" /></router-link
          ></a>
        </li>
        <li class="nav-item">
          <a class="nav-link"><router-link to="/login">Login</router-link></a>
        </li>
        <li class="nav-item" style="flex-grow: 1"></li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  created() {
    var userInfo = JSON.parse(sessionStorage.getItem("user"));
    if (userInfo) {
      console.log(userInfo);
      this.$store.commit("LoginTrue");
      this.$store.commit("GetUserDataFromSessionStorage", userInfo);
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.nav {
  background-color: gainsboro;
  padding: 10px;
}
.nav a {
  color: black;
  text-decoration-line: none;
}
.nav-link {
  font-size: 20px;
}

.nav-image {
  width: 30px;
  image-rendering: -webkit-optimize-contrast;
}
</style>
