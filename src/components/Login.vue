<template>
  <div class="mt-5 p-5 w-25 mx-auto">
    <div class="container mt-3">
      <div class="mb-3">
        <input
          type="email"
          class="form-control"
          placeholder="email"
          id="email"
          value="test"
          @change="inputEmail = $event.target.value"
        />
      </div>
      <div class="mb-3">
        <input
          type="password"
          class="form-control"
          placeholder="pw"
          id="pw"
          value="password"
          @change="inputPassword = $event.target.value"
        />
      </div>
      <div class="p-3">
        <button
          type="submit"
          class="btn btn-primary m-3"
          id="login"
          @click="Login"
        >
          log In
        </button>
        <button
          type="submit"
          class="btn btn-danger m-3"
          id="logout"
          @click="Logout"
        >
          log Out
        </button>
      </div>

      <div type="text" class="flex-grow-1">
        <p class="error-message text-danger" id="error-message">
          {{ errorMessage }}
        </p>
        <p class="text-primary" id="success-message">{{ successMessage }}</p>
        <!-- <p><router-link to="/signup">be our friend</router-link></p> -->
      </div>
      <router-link to="/register"> <div>be our friend</div></router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      inputEmail: "test",
      inputPassword: "password",
      errorMessage: "",
      successMessage: "",
    };
  },
  methods: {
    Login() {
      var id = this.inputEmail;
      var pw = this.inputPassword;
      console.log("LogIn");
      axios
        .post("http://localhost:3000/login", { id, pw })
        .then((result) => {
          console.log("good");
          sessionStorage.setItem("user", JSON.stringify(result.data));
          this.$store.commit("GetUserDataFromSessionStorage", result.data);
          this.$store.commit("LoginTrue");
          this.$router.push("/");
        })
        .catch((error) => {
          this.errorMessage = error;
          console.log("error");
        });
    },
    Logout() {
      sessionStorage.removeItem("user");
      this.$store.commit('LoginFalse')
      this.successMessage = "logged out"

      //you have  to edit this codes in backend
      axios
        .get("http://localhost:3000/logout")
        .then(() => {
          console.log("logged out");
        })
        .catch((error) => {
          console.log(error);
          // this.errorMessage = error
        });
    },
  },
};
</script>

<style></style>
