<template>
  <div class="container">
    <AppHeader :main="main" :subtitle="subtitle" :logo="logo" />
    <SearchComponent @search="handleSearchEvent" />
    <ResultsComponent
      :client="client"
      :supplyPoint="supplyPoint"
      :hasSearched="hasSearched"
      :discounts="discounts"
      :isElegible="isElegible"
      errorMessage="This CUPS <strong>doesn't exist</strong>. </br>Please, try again with
            another number"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";

import AppHeader from "./components/AppHeader.vue";
import SearchComponent from "./components/SearchComponent.vue";
import ResultsComponent from "./components/ResultsLayout.vue";

import { getObject, getBasicDis } from "./helpers/helpers";
import { Client, SupplyPoint } from "./types/Types";

export default defineComponent({
  name: "App",
  components: {
    AppHeader,
    SearchComponent,
    ResultsComponent,
  },
  setup() {
    const clients = ref<Client[]>([]);
    const supplyPoints = ref<SupplyPoint[]>([]);
    const client = ref<Client | undefined>(undefined);
    const supplyPoint = ref<SupplyPoint | null>(null);
    const discounts = ref({
      basic: 0,
      special: 0,
    });
    const hasSearched = ref(false);

    const loadData = async () => {
      try {
        const resClients = await fetch("http://localhost:3000/data");
        const dataClients = await resClients.json();
        clients.value = dataClients;

        const resSupply = await fetch("http://localhost:4000/data");
        const dataSupply = await resSupply.json();
        supplyPoints.value = dataSupply;
      } catch (err) {
        console.log(err);
      }
    };
    loadData();

    const handleSearchEvent = (cups: number) => {
      hasSearched.value = true;
      client.value = getObject(clients.value, cups)[0] as Client;
      supplyPoint.value = getObject(supplyPoints.value, cups)[0] as SupplyPoint;
    };

    const isElegible = computed(() => {
      if (!client.value && !supplyPoint.value) {
        return false;
      }
      if (client.value && supplyPoint.value)
        return (
          client.value.building_type === "house" &&
          supplyPoint.value?.neighbors?.length >= 1
        );
      return false;
    });

    watch(
      [supplyPoint, isElegible],
      ([newSupplyPoint, newIsElegible], [oldSupplyPoint, oldIsElegible]) => {
        discounts.value.basic = 0;
        discounts.value.special = 0;
        if (!newSupplyPoint || !newSupplyPoint.neighbors) return;

        if (newIsElegible) {
          // Basic discount
          supplyPoint.value?.neighbors?.forEach((neighbor) => {
            const foundNeighbor = supplyPoints.value.find(
              (point) => point.cups === neighbor
            );
            if (foundNeighbor && supplyPoint.value) {
              discounts.value.basic = getBasicDis(
                foundNeighbor,
                supplyPoint.value
              )
                ? 5
                : 0;
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
          discounts.value.special = totalInvoicedAmount > 100 ? 12 : 0;
        }
      },
      {
        deep: true,
      }
    );

    return {
      clients,
      supplyPoints,
      handleSearchEvent,
      client,
      supplyPoint,
      discounts,
      hasSearched,
      isElegible,
    };
  },
  data() {
    return {
      main: "Join the Rooftop Revolution",
      subtitle: "Discover Your Personalized Solar Offer",
      logo: "/holaluz-logo.png",
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
  min-height: 100vh;
  padding: 20px;
}

.container {
  background-color: white;
  min-height: 90vh;
  width: 95%;
  border-radius: 10px;
  box-shadow: 18px 18px 7px -11px rgba(232, 232, 232, 1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (min-width: 1000px) {
  .container {
    max-width: 700px;
    padding: 20px 32px;
  }
}
</style>
