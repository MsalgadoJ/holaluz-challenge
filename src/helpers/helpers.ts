import { Client, SupplyPoint } from "../types/Types";

function isClient(object: any): object is Client {
  return "cups" in object && typeof object.cups === "string";
}

function isSupplyPoint(object: any): object is SupplyPoint {
  return "cups" in object && typeof object.cups === "string";
}

export const getObject = (array: (Client | SupplyPoint)[], cups: number) => {
  return array.filter((el) => {
    if (isClient(el) || isSupplyPoint(el)) {
      return el.cups === cups.toString();
    }
    return false;
  });
};

export const getBasicDis = (neighbor: SupplyPoint, current: SupplyPoint) =>
  Number(neighbor.power.p1) < Number(current.power.p1) &&
  Number(neighbor.power.p2) < Number(current.power.p2);
