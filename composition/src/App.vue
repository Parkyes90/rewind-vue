<template>
  <section class="container">
    <h2>{{ user.name }}</h2>
    <h2>{{ user.age }}</h2>
    <button @click="setNewAge">Set Age</button>
    <div>
      <input type="text" @input="setFirstName" />
      <input type="text" @input="setLastName" />
    </div>
    <div>name: {{ name }}</div>
  </section>
</template>

<script>
import { ref, reactive, computed } from 'vue';

export default {
  setup() {
    const user = reactive({
      name: 'parkyes90',
      age: 31,
    });
    const firstName = ref('');
    const lastName = ref('');

    const setNewAge = () => {
      user.age = 32;
    };

    const name = computed(() => {
      return `${firstName.value} ${lastName.value}`;
    });

    const setFirstName = (event) => {
      firstName.value = event.target.value;
    };

    const setLastName = (event) => {
      lastName.value = event.target.value;
    };

    return { user, setNewAge, setFirstName, setLastName, name };
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
}

.container {
  margin: 3rem auto;
  max-width: 30rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  text-align: center;
}
</style>
