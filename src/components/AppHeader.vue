<template>
  <div class="header">
    <picture> <img :src="logo" alt="holaluz logo" /> </picture>
    <h1>{{ main }}</h1>
    <p>{{ subtitle }}</p>
  </div>
</template>

<script>
export default {
  props: ["main", "subtitle", "logo"],
};
</script>

<style>
.header {
  margin-bottom: 20px;
}
h1 {
  margin-bottom: 5px;
}
</style>
