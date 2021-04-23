<template>
  <section class="container">
    <user-data
      :first-name="firstName"
      :last-name="lastName"
      :age="user.age"
    ></user-data>
    <button @click="setNewAge">Set Age</button>
    <div>
      <input type="text" v-model="lastName" ref="lastNameInput" />
      <input type="text" v-model="firstName" />
      <button @click="setLastName">SetLastName</button>
    </div>
    <div>name: {{ name }}</div>
  </section>
</template>

<script>
import { ref, reactive, computed, watch, provide } from 'vue';
import UserData from '@/components/UserData';
export default {
  components: { UserData },
  setup() {
    const user = reactive({
      name: 'parkyes90',
      age: 31,
    });
    const firstName = ref('');
    const lastName = ref('');
    const lastNameInput = ref(null);
    watch([firstName, lastName], (oldVals, newVals) => {
      console.log('changed', oldVals, newVals);
    });
    const setNewAge = () => {
      user.age = 32;
    };

    const name = computed(() => {
      return `${firstName.value} ${lastName.value}`;
    });

    const setLastName = () => {
      lastName.value = lastNameInput.value.value;
    };

    provide('userAge', user.age);

    return {
      user,
      setNewAge,
      firstName,
      lastName,
      name,
      lastNameInput,
      setLastName,
    };
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
