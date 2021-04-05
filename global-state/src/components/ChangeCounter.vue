<template>
  <button @click="addOne">Add 2</button>
</template>

<script>
export default {
  methods: {
    addOne() {
      this.$store.commit({
        type: 'increment',
        value: 10,
      });
    },
  },
};
</script>
