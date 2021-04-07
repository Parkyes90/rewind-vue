<template>
  <button @click="increment({ value: 10 })">Add 2</button>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  methods: {
    ...mapActions(['increment']),
  },
};
</script>
