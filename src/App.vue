<template>
  <UserBuildings />
</template>

<script>
import { provide } from "vue";
import UserBuildings from "./components/UserBuildings.vue";
import store from "./store";

export default {
  name: "App",
  components: {
    UserBuildings,
  },
  setup() {
    provide("store", store);
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.scrollbar {
  margin-bottom: 25px;
}

.scrollbar-accent::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;
  border-radius: 5px;
}

.scrollbar-accent::-webkit-scrollbar {
  width: 3px;
  background-color: #f5f5f5;
}

.scrollbar-accent::-webkit-scrollbar-thumb {
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: coral;
}
</style>
