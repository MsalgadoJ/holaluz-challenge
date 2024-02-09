import { mount } from "@vue/test-utils";
import SearchComponent from "../../src/components/SearchComponent.vue";

describe("SearchComponent", () => {
  test('emits "search" event with the input value when search button is clicked', async () => {
    const wrapper = mount(SearchComponent);
    const input = wrapper.find('input[type="number"]');
    const button = wrapper.find("button");

    await input.setValue("123456");
    await button.trigger("click");

    expect(wrapper.emitted()).toHaveProperty("search");
    expect(wrapper.emitted().search[0]).toEqual([123456]);
  });

  test("button should be disabled when input is empty", () => {
    const wrapper = mount(SearchComponent);
    const button = wrapper.find("button");

    expect(button.attributes("disabled")).toBe("");
  });

  test("button should not be disabled when input is not empty", async () => {
    const wrapper = mount(SearchComponent);
    const input = wrapper.find('input[type="number"]');
    const button = wrapper.find("button");

    await input.setValue("123456");

    expect(button.attributes("disabled")).toBeUndefined();
  });
});
