const app = Vue.createApp({
  data() {
    return {
      counter: 0,
      name: "",
      confirmedName: "",
    };
  },
  methods: {
    submitForm(event) {
      alert("Submitted");
    },
    confirmInput() {
      this.confirmedName = this.name;
    },
    setName(e, lastName) {
      this.name = e.target.value + " " + lastName;
    },
    add(number) {
      this.counter += number;
    },
  },
});

app.mount("#events");
