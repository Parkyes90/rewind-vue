<template>
  <button @click="login">Login</button>
  <button @click="logout">Logout</button>
  <p>{{ isTestAuth }}</p>
</template>

<script>
export default {
  methods: {
    login() {
      this.$store.dispatch('login');
    },
    logout() {
      this.$store.dispatch('logout');
    },
  },
  computed: {
    isAuth() {
      return this.$store.getters.userIsAuthenticated;
    },
    isTestAuth() {
      return this.$store.getters['numbers/testAuth'];
    },
  },
};
</script>
