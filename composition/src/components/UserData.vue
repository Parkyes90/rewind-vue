<template>
  <div>
    <h2>{{ username }}</h2>
    <h3>{{ age }}</h3>
  </div>
</template>

<script>
import { computed, inject } from 'vue';

export default {
  props: ['firstName', 'lastName'],
  setup(props) {
    const username = computed(() => {
      return `${props.firstName} ${props.lastName}`;
    });
    const age = inject('userAge');
    console.log(age);
    return { username, age };
  },
};
</script>
