<template>
  <div id="app">
    <Vocancies />
  </div>
</template>

<script>
import Vocancies from "./components/Vocancies";

export default {
  name: "App",
  components: {
    Vocancies,
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
