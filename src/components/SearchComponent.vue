<template>
  <div class="search-component">
    <input
      type="number"
      v-model="cups"
      placeholder="Enter CUPS number"
      @keyup.enter="handleSearch"
    />
    <button :disabled="!cups" @click="handleSearch">Search</button>
  </div>
</template>

<script setup>
import { ref } from "vue";

// eslint-disable-next-line no-undef
const emit = defineEmits(["search"]);
const cups = ref("");

function handleSearch() {
  emit("search", cups.value);
  cups.value = "";
}
</script>

<style>
.search-component {
  max-width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.search-component input {
  border: 1px solid #d7d9de;
  border-radius: 5px;
  padding: 5px 8px;
  font-family: inherit;
  transition: border-color 0.3s ease;
  min-height: 37px;
}

/* Input */
.search-component input::placeholder {
  font-family: inherit;
  color: #d7d9de;
}

.search-component input:focus {
  outline: none;
  border-color: #e5027e;
}

.search-component input:hover {
  border-color: #e5027e;
  outline: none;
}

.search-component input::-webkit-outer-spin-button,
.search-component input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.search-component input[type="number"] {
  -moz-appearance: textfield;
}

.search-component button {
  width: 100%;
  color: white;
  background-color: #e5027e;
  font-family: inherit;
  outline: none;
  border: none;
  padding: 8px;
  border-radius: 50px;
  font-weight: bold;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.search-component button:not([disabled]):hover {
  background-color: #9f0057;
}

.search-component button:not([disabled]):active {
  background-color: #ffc9e7;
  color: #9f0057;
  border: 2px solid #9f0057;
}

.search-component button:disabled {
  opacity: 50%;
}

@media (min-width: 600px) {
  .search-component {
    flex-direction: row;
    min-width: 385px;
  }
}
</style>
