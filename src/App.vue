<template>
  <StarsBg />
</template>

<script>
// import MainIndex from "./pages/MainIndex.vue";
import StarsBg from "./components/StarsBg.vue";

export default {
  name: "App",
  components: { StarsBg },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}
body {
  margin: 0px;
  padding: 0px;
}
</style>
