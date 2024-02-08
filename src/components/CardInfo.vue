<template>
  <div class="card">
    <h3>{{ title }}</h3>
    <ul>
      <li v-for="(value, key) in info" :key="key">
        {{ formatKey(key) }}: {{ value }}
      </li>
    </ul>
  </div>
</template>

const translationMapper = { }

<script>
export default {
  props: {
    info: {
      type: Object,
      default: () => null,
    },
    title: String,
  },
  methods: {
    formatKey(key) {
      return key.charAt(0).toUpperCase() + key.slice(1).replace("_", " ");
    },
  },
};
</script>
