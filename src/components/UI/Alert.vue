<template>
  <div class="alert-warning">{{ title }}</div>
</template>

<script>
export default {
  props: ["title"],
};
</script>

<style scoped>
.alert-warning {
  margin-top: 60px;
  background-color: salmon;
  padding: 20px;
  text-align: center;
  color: #555;
  font-weight: 600;
  font-size: 18px;
  max-width: 50%;
  margin-inline: auto;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
