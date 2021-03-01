<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
  components: {},
  created() {},
  mounted() {
    this.$router.push({
      path: "/mainIndex",
      query: {
        t: +new Date(),
      },
    });
  },
};
</script>

<style>
body {
  padding: 0px;
  margin: 0px;
}

body {
  width: 100%;
  height: 100%;
  min-width: 440px;
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
