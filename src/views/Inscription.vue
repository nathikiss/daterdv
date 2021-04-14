<template>
  <br /><br />
  <div class="">
    <h1>Inscription</h1>
  </div>
  <br />
  <div class="row">
    <div class="col-md-3"></div>
    <div class="col-md-6">
      <div>
        <div class="mb-3">
          <input
            type="text"
            class="form-control"
            id="login"
            placeholder="Login"
            v-model="login"
          />
        </div>
        <div class="mb-3">
          <input
            type="email"
            class="form-control"
            id="email"
            placeholder="Email"
            v-model="email"
          />
        </div>
        <div class="mb-3">
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Mot de passe"
            v-model="password"
          />
        </div>
        <div class="d-grid gap-2 col-6 mx-auto">
          <button
            type="submit"
            class="btn btn-primary btn-lg"
            @click="addUserAPI"
          >
            S'inscrire
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-3"></div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "inscription",
  data() {
    return {
      User: { login: "", password: "", email: "" },
    };
  },
  methods: {
     addUserAPI() {
      const data = {
        login: this.login,
        password: this.password,
        email: this.email
      }
      axios
        .post("http://localhost:5000/users", data)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>