const app = Vue.createApp({
  data() {
    return {
      courseGoalA: "Finish",
      courseGoalB: "Master",
      vueLink: "https://vuejs.org/",
    };
  },
  methods: {
    outputGoal() {
      const randomNumber = Math.random();
      if (randomNumber < 0.5) {
        return this.courseGoalA;
      }
      return this.courseGoalB;
    },
  },
});

app.mount("#user-goal");
