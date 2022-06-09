<template>
  <div class="mt-5 p-5 w-25 mx-auto">
    <div class="container mt-3">
      <div class="mb-3">
        <input
          type="email"
          class="form-control"
          placeholder="email"
          value="test"
          @change="inputEmail = $event.target.value"
        />
      </div>
      <div class="mb-3">
        <input
          type="email"
          class="form-control"
          placeholder="displayName"
          v-model="inputDisplayName"
        />
      </div>
      <div class="mb-3">
        <input
          class="form-control"
          placeholder="pw"
          value="password"
          @change="inputPassword = $event.target.value"
        />
      </div>
      <div class="p-3">
        <button
          type="submit"
          class="btn btn-primary m-3"
          @click="CreateAccount"
        >
          Create Account
        </button>
      </div>

      <div type="text" class="flex-grow-1">
        <p class="error-message text-danger" id="error-message">
          {{ errorMessage }}
        </p>
        <p class="text-primary" id="success-message">{{ successMessage }}</p>
        <!-- <p><router-link to="/signup">be our friend</router-link></p> -->
      </div>
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
      inputPasswordCheck: "password",
      inputDisplayName: "",
      errorMessage: "",
      successMessage: "",
    };
  },
  methods: {
    CreateAccount() {
      var id = this.inputEmail;
      var pw = this.inputPassword;
      var displayName = this.inputDisplayName;
      console.log("LogIn");
      axios
        .post("http://localhost:3000/register", { id, pw, displayName })
        .then((result) => {
          console.log(result);
          this.errorMessage = result.data.error
          this.successMessage = result.data.success
        })
        .catch((error) => {
          this.errorMessage = error;
        });
    },
  },
};
</script>

<style></style>
