<template>
  <div>
    <p>{{joke}}</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      joke: "",
    };
  },
  created() {
    this.getJoke();
  },
  mounted() {},
  methods: {
    getJoke() {
      axios
        .get("https://icanhazdadjoke.com/", {
          headers: { Accept: "application/json" },
        })
        .then((res) => {
          this.joke = res.data.joke;
          this.likeButtonDisabled = false;
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  font-size: 20px;
}
</style>
