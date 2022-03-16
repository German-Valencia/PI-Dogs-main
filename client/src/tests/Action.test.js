import { filterCreated, filterTemperament, orderName, orderWeight } from "../actions/index";

describe("Actions", () => {
  it('Debería retornar una action con las propiedades type "FILTER_TEMPERAMENT" y payload, su valor lo recibe por argumento:', () => {
    expect(filterTemperament("Playful")).toEqual({
      type: "FILTER_TEMPERAMENT",
      payload: "Playful",
    });
  });
  it('Debería retornar una action con las propiedades type "filterCreated" y payload, su valor lo recibe por argumento:', () => {
    expect(filterCreated("94a588eb-e98a-43c1-b54a-b5e889660a92")).toEqual({
      type: "FILTER_CREATED",
      payload: "94a588eb-e98a-43c1-b54a-b5e889660a92",
    });
  });
  it('Debería retornar una action con la propiedad type "orderName" y el payload, su valor lo recibe por argumento:', () => {
    expect(orderName("Terrier")).toEqual({
      type: "ORDER_NAME",
      payload: "Terrier",
    });
  }); 
  it('Debería retornar una action con la propiedad type "orderWeight" y el payload, su valor lo recibe por argumento:', () => {
    expect(orderWeight("asc")).toEqual({
      type: "ORDER_WEIGHT",
      payload: "asc",
    });
  });
});