import { shallowMount } from "@vue/test-utils";
import Card from "../../src/components/CardInfo.vue";

describe("Card.vue", () => {
  it("renders the title", () => {
    const title = "Test Title";
    const wrapper = shallowMount(Card, {
      props: { title },
    });
    expect(wrapper.text()).toMatch(title);
  });

  it("formats amount values with € symbol", async () => {
    const info = {
      total_amount: "100",
    };
    const wrapper = shallowMount(Card, {
      props: { info, title: "Test", avoidWords: [] },
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toContain("100 €");
  });

  it("formats power values with W", async () => {
    const info = {
      power: {
        P1: "4500",
        P2: "5000",
      },
    };
    const wrapper = shallowMount(Card, {
      props: { info, title: "Test", avoidWords: [] },
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toContain(
      "<li>P1: 4500<span> W</span><span>,</span></li>"
    );
  });

  it("Avoids certain props", async () => {
    const info = {
      role: "customer",
      full_name: "Mengano Sultano",
      cups: "165468486",
      power: {
        P1: "4500",
        P2: "5000",
      },
    };
    const wrapper = shallowMount(Card, {
      props: { info, title: "Test", avoidWords: ["role"] },
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.html()).not.toContain("Role");
    expect(wrapper.html()).toContain("Mengano");
  });
});
