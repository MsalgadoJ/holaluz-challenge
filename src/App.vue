<template>
  <div class="container">
    <Header :main="main" />
    <SearchComponent @search="handleSearchEvent" />
    <div>
      <ResultsComponent
        :client="client"
        :supplyPoint="supplyPoint"
        :basicDiscount="basicDiscount"
        :specialDiscount="specialDiscount"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";

import Header from "./components/Header.vue";
import SearchComponent from "./components/SearchComponent.vue";
import ResultsComponent from "./components/ResultsComponent.vue";
import InformationComponent from "./components/InformationComponent.vue";

interface Client {
  full_name: string;
  address: string;
  cups: string;
  role: string;
  building_type: string;
}

interface SupplyPoint {
  cups: string;
  tariff: string;
  invoiced_amount: string;
  power: {
    p1: string;
    p2: string;
  };
  neighbors: string[];
}

export default defineComponent({
  name: "App",
  components: {
    Header,
    SearchComponent,
    ResultsComponent,
    InformationComponent,
  },
  setup() {
    // Utiliza `ref` para crear una referencia reactiva
    const clients = ref<Client[]>([]);
    const supplyPoints = ref<SupplyPoint[]>([]);
    const client = ref<Client | null>(null);
    const supplyPoint = ref<SupplyPoint | null>(null);
    const basicDiscount = ref(false);
    const specialDiscount = ref(false);

    // Función asíncrona para cargar datos
    const loadData = async () => {
      try {
        const resClients = await fetch("http://localhost:3000/data");
        const dataClients = await resClients.json();
        clients.value = dataClients; // Asigna los datos a la referencia `clients`

        const resSupply = await fetch("http://localhost:4000/data");
        const dataSupply = await resSupply.json();
        supplyPoints.value = dataSupply; // Asigna los datos a la referencia `supplyPoints`
      } catch (err) {
        console.log(err);
      }
    };

    // Llama a `loadData` para cargar los datos al inicializar el componente
    loadData();

    const handleSearchEvent = (cups: number) => {
      const getClient = clients.value.filter((client) => {
        return client.cups === cups.toString();
      });
      client.value = getClient[0];
      const getSupplyPoint = supplyPoints.value.filter((supply) => {
        return supply.cups === cups.toString();
      });
      supplyPoint.value = getSupplyPoint[0];
    };

    // 2. **Basic discount**: 5% discount. Conditions: its neighbors should have `p1` and `p2` powers lower than the current client's supply point.

    watchEffect(() => {
      // Restablece los descuentos
      console.log("hace el efecto");
      basicDiscount.value = false;
      specialDiscount.value = false;

      if (!supplyPoint.value || !supplyPoint.value.neighbors) return;

      // Basic discount
      supplyPoint.value?.neighbors?.forEach((neighbor) => {
        const foundNeighbor = supplyPoints.value.find(
          (point) => point.cups === neighbor
        );
        if (foundNeighbor && supplyPoint.value) {
          basicDiscount.value =
            Number(foundNeighbor.power.p1) <
              Number(supplyPoint.value.power.p1) &&
            Number(foundNeighbor.power.p2) < Number(supplyPoint.value.power.p2);
        }
      });

      // Special discount
      let totalInvoicedAmount = 0;
      if (supplyPoint.value && supplyPoints.value) {
        totalInvoicedAmount = supplyPoint.value.neighbors.reduce(
          (total, neighbor) => {
            return (
              total +
              parseFloat(
                supplyPoints.value.find((point) => point.cups === neighbor)!
                  .invoiced_amount
              )
            );
          },
          0
        );
      }
      specialDiscount.value = totalInvoicedAmount > 100;
      console.log("basicDiscount", basicDiscount.value);

      console.log("specialDiscount", specialDiscount.value);
    });

    return {
      clients,
      supplyPoints,
      handleSearchEvent,
      client,
      supplyPoint,
      basicDiscount,
      specialDiscount,
    };
  },
  data() {
    return {
      main: "Se pasó bien?",
      message: "These are your results",
      text: "Results 📝 cambiados",
    };
  },
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Gilroy,sans-serif */

#app {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "DM Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f9f8f3;
  height: 100vh;
}

.container {
  background-color: white;
  min-height: 50vh;
  min-width: 50%;
  border-radius: 10px;
  box-shadow: 18px 18px 7px -11px rgba(232, 232, 232, 1);
  padding: 10px;
}
</style>

<!-- 
  9:04 set up org
  https://www.youtube.com/watch?v=V-kxBWcPJfo&list=PL4cUxeGkcC9hYYGbV60Vq3IXYNfDk8At1&index=10 -->

function watchEffec(arg0: () => void) { throw new Error("Function not
implemented."); }
