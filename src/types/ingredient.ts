export type IngredientsType = {
  salad: number;
  bacon: number;
  cheese: number;
  meat: number;
};

export type StateType = {
  ingredients: IngredientsType;
  totalPrice: number;
  purchasable: boolean;
};

export enum IngredientKeyEnum {
  salad = "salad",
  bacon = "bacon",
  cheese = "cheese",
  meat = "meat",
}
