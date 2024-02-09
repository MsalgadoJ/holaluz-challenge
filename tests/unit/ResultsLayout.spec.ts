import { shallowMount } from "@vue/test-utils";
import ResultsLayout from "../../src/components/ResultsLayout.vue";
import CardInfo from "../../src/components/CardInfo.vue";

describe("ResultsLayout", () => {
  it("shows error message when no client or supply point is provided and a search has been made", async () => {
    const wrapper = shallowMount(ResultsLayout, {
      props: {
        hasSearched: true,
        client: null,
        supplyPoint: null,
        errorMessage:
          "This CUPS doesn't exist. Please, try again with another number",
        discounts: {
          basic: 0,
          special: 0,
        },
      },
    });

    expect(wrapper.find(".error").exists()).toBe(true);
    expect(wrapper.find(".error").text()).toContain(
      "This CUPS doesn't exist. Please, try again with another number"
    );
  });

  it("shows eligibility and discount messages based on props", async () => {
    const wrapper = shallowMount(ResultsLayout, {
      props: {
        hasSearched: true,
        isElegible: true,
        discounts: {
          basic: 5,
          special: 0,
        },
      },
    });

    expect(wrapper.find(".elegible").html()).toContain(
      '<div class="elegible"><span>You are <strong>eligible</strong> for our rooftop revolution program! 🥳</span></div>'
    );
    expect(wrapper.find(".discount").html()).toContain("5% basic discount");
  });

  it("shows CardInfo components when showInformation is true", async () => {
    const clientInfo = { name: "John Doe", power: "4500" };
    const supplyPointInfo = {
      location: "Location",
      power: "5000",
      neighbors: ["454654", "4654684"],
    };

    const wrapper = shallowMount(ResultsLayout, {
      props: {
        hasSearched: true,
        client: clientInfo,
        supplyPoint: supplyPointInfo,
        isElegible: true,
        discounts: {
          basic: 0,
          special: 0,
        },
      },
      global: {
        stubs: {
          CardInfo: {
            template: "<div />",
            props: ["info", "title", "avoidWords"],
          },
        },
      },
    });
    expect(wrapper.findAllComponents(CardInfo).length).toBe(2);
  });
});
