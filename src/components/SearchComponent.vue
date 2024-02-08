<template>
  <div>
    <label for="search-input"></label>
    <input type="number" v-model="cups" />
    <button @click="handleSearch">search CUPS</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cups: "",
    };
  },
  async mounted() {},
  methods: {
    handleSearch() {
      this.$emit("search", this.cups);
    },
  },
};
</script>

<!-- <div v-for="client in clients" :key="client.cups">
    </div> -->
<!-- We need a landing page that given a CUPS search we display both its client and supply point information, plus if the client can become part of the rooftop revolution including the type of offer they would get. -->
