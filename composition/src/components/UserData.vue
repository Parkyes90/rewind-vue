<template>
  <h2>{{ username }}</h2>
  <h3>{{ age }}</h3>
</template>

<script>
import { computed } from 'vue';

export default {
  props: ['firstName', 'lastName', 'age'],
  setup(props) {
    const username = computed(() => {
      return `${props.firstName} ${props.lastName}`;
    });
    return { username };
  },
};
</script>
