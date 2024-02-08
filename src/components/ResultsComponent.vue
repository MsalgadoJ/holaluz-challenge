<template>
  <div>
    <div v-if="showInformation" class="cards-layout">
      <CardInfo title="Client" :info="client" />
      <CardInfo title="Supply Point" :info="supplyPoint" />
    </div>

    <div v-if="showMessage">
      You are eligible for our special rooftop revolution program!
    </div>
    <div v-if="showMessage">{{ showDiscount }}</div>
  </div>
</template>

<script>
import { watch, computed } from "vue";

import CardInfo from "./CardInfo.vue";

export default {
  components: {
    CardInfo,
  },
  props: ["client", "supplyPoint", "basicDiscount", "specialDiscount"],
  setup(props) {
    watch(
      () => props.client,
      (newVal) => {
        console.log("Nuevo valor de client:", newVal);
      }
    );

    watch(
      () => props.supplyPoint,
      (newVal) => {
        console.log("Nuevo valor de supplyPoint:", newVal);
      }
    );

    const showInformation = computed(() => {
      // Asegurarse de que el client y sus propiedades necesarias existan
      if (props.client && props.supplyPoint.neighbors) {
        return true;
      }
      return false;
    });
    // Crear una computed property para determinar si mostrar el mensaje
    const showMessage = computed(() => {
      // Asegurarse de que el client y sus propiedades necesarias existan
      if (
        props.client &&
        props.client.building_type === "house" &&
        props.supplyPoint.neighbors &&
        props.supplyPoint.neighbors.length >= 1
      ) {
        return true;
      }
      return false;
    });

    const showDiscount = computed(() => {
      // Asume que props.basicDiscount y props.specialDiscount son booleanos
      if (props.basicDiscount && props.specialDiscount) {
        return ""; // check if there's another discount available
      } else if (props.basicDiscount) {
        return "Join us with a 5% basic discount!";
      } else if (props.specialDiscount) {
        return "Join us with a special 12% discount!";
      }
      return "";
    });

    console.log("showDiscount", showDiscount);

    // Retornar la computed property para que esté disponible en el template
    return {
      showMessage,
      showInformation,
      showDiscount,
    };
  },
};
</script>

<style>
.cards-layout {
  display: flex;
}
</style>
