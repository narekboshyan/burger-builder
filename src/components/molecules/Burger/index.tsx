import { FC } from "react";
import classes from "./index.module.css";
import BurgerIngredient from "../../atoms/BurgerIngredient";
import { IngredientsType } from "../../../types/ingredient";

type BurgerProps = {
  ingredients: IngredientsType;
};

const Burger: FC<BurgerProps> = ({ ingredients }) => {
  const transformedIngredients: string[] = Object.keys(ingredients);

  const ingredientComponents = transformedIngredients.flatMap((igKey) => {
    const numberOfIngredients = ingredients[igKey];
    return Array.from({ length: numberOfIngredients }, (_, i) => (
      <BurgerIngredient key={`${igKey}-${i}`} type={igKey} />
    ));
  });

  const ingredientDisplay =
    ingredientComponents.length > 0 ? (
      ingredientComponents
    ) : (
      <p>Please start adding ingredients!</p>
    );

  return (
    <div className={classes.burger}>
      <BurgerIngredient type="bread-top" />
      {ingredientDisplay}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
