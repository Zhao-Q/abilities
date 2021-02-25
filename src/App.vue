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
body {
  padding: 0px;
  margin: 0px;
}

body {
  height: 100%;
  min-width: 1440px;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, Arial, sans-serif;
}
#app {
  height: 100%;
}
</style>
