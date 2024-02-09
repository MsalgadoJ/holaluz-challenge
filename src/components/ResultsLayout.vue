<template>
  <div class="results-container">
    <transition>
      <div>
        <div v-if="showError" class="error" v-html="errorMessage"></div>
        <div class="message">
          <div v-html="showMessage" class="elegible"></div>
          <div v-html="showDiscount" class="discount"></div>
        </div>
        <div v-if="showInformation" class="cards-layout">
          <CardInfo
            title="Client"
            :info="client"
            :avoidWords="[`role`, `cups`]"
          />
          <CardInfo title="Supply Point" :info="supplyPoint" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { computed } from "vue";

import CardInfo from "./CardInfo.vue";

export default {
  components: {
    CardInfo,
  },
  props: [
    "client",
    "supplyPoint",
    "hasSearched",
    "discounts",
    "isElegible",
    "errorMessage",
  ],
  setup(props) {
    const showInformation = computed(() => {
      if (props.client && props.supplyPoint.neighbors) {
        return true;
      }
      return false;
    });

    const showMessage = computed(() => {
      if (props.isElegible && props.hasSearched) {
        return "<span>You are <strong>eligible</strong> for our rooftop revolution program! 🥳</span>";
      }
      if (!props.isElegible && props.hasSearched && props.client) {
        return "<span>We are sorry, you are not elegible for the program 😥";
      }
      return "";
    });

    const showDiscount = computed(() => {
      if (props.discounts.basic && props.discounts.special) {
        return `<span>Join us with a <strong>special ${props.discounts.special}% discount</strong>!</span>`;
      } else if (props.discounts.basic) {
        return `<span>Join us with a <strong>${props.discounts.basic}% basic discount</strong>!</span>`;
      } else if (props.discounts.special) {
        return `<span>Join us with a <strong>special ${props.discounts.special}% discount</strong>!</span>`;
      }
      return "";
    });

    const showError = computed(() => {
      return !props.client && !props.supplyPoint && props.hasSearched;
    });

    return {
      showMessage,
      showInformation,
      showDiscount,
      showError,
    };
  },
};
</script>

<style>
.results-container {
  width: 100%;
}

.results-container .message {
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.error {
  width: 100%;
  display: flex;
  justify-content: center;
}

.error strong {
  color: #e5027e;
  text-decoration: underline;
  margin: 0 4px;
}

.elegible strong {
  color: #e5027e;
}

.discount strong {
  color: #e5027e;
}
.cards-layout {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

.v-enter-active {
  transition: opacity 0.5s ease;
}

.v-enter-from {
  opacity: 0;
}

@media (min-width: 1000px) {
  .cards-layout {
    flex-direction: row;
    justify-content: space-between;
    gap: unset;
    align-items: stretch;
  }
}
</style>
