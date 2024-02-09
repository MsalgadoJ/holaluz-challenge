<template>
  <div class="card">
    <h3>{{ title }}</h3>
    <ul class="list">
      <li v-for="(value, key) in filteredInfo" :key="key">
        <template v-if="isObject(value)">
          <!-- objects -->
          <strong>{{ formatKey(key) }}:</strong>
          <ul class="sub-list">
            <li v-for="(subValue, subKey, index) in value" :key="subKey">
              {{ formatKey(subKey) }}: {{ subValue
              }}<span v-if="subKey.toLowerCase().includes('p')"> W</span>
              <span v-if="index < Object.keys(value).length - 1">,</span>
            </li>
          </ul>
        </template>
        <template v-else-if="isArray(value)">
          <!-- Arrays -->
          <strong>{{ formatKey(key) }}:</strong>
          <ul v-if="key === 'neighbors'">
            <li>
              {{ value.length }}
            </li>
          </ul>
          <ul v-else>
            <li v-for="(item, index) in value" :key="index">
              {{ item }}<span v-if="index < value.length - 1">, </span>
            </li>
          </ul>
        </template>
        <template v-else>
          <!-- primitives -->
          <strong>{{ formatKey(key) }}:</strong>
          <span v-if="key.indexOf('amount') !== -1">{{ value }} €</span>
          <span v-else>{{ value }}</span>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  props: {
    info: {
      type: Object,
      default: () => ({}),
    },
    title: String,
    avoidWords: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const filteredInfo = computed(() => {
      if (!props.avoidWords.length) {
        return props.info;
      }

      const result = {};
      Object.entries(props.info).forEach(([key, value]) => {
        if (props.avoidWords.indexOf(key) === -1) {
          result[key] = value;
        }
      });
      return result;
    });

    const formatKey = (key) => {
      return key.charAt(0).toUpperCase() + key.slice(1).replace("_", " ");
    };

    const isObject = (value) => {
      return value && typeof value === "object" && !Array.isArray(value);
    };

    const isArray = (value) => {
      return Array.isArray(value);
    };

    return { filteredInfo, formatKey, isObject, isArray };
  },
};
</script>

<style>
.card {
  width: 80%;
  max-width: 385px;
  border-radius: 10px;
  box-shadow: 18px 18px 7px -11px rgba(232, 232, 232, 1);
  padding: 20px;
  /* border-top: 1px solid #e5027e; */
  border-left: 1px solid #e5027e;
}

.card:last-child {
  margin-bottom: 30px;
}

.card h3 {
  margin-bottom: 10px;
  font-size: 1.2rem;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.list li {
  list-style: none;
  text-align: left;
  display: flex;
  gap: 5px;
  font-size: 15px;
}

@media (min-width: 500px) {
  .sub-list {
    display: flex;
    gap: 5px;
  }
}

@media (min-width: 900px) {
  .card {
    flex-grow: 1;
  }

  .card:last-child {
    margin-bottom: 0px;
  }

  @media (min-width: 1000px) {
    .card {
      max-width: 300px;
    }
  }
}
</style>
