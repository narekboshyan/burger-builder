import { FC } from "react";
import classes from "./index.module.css";
import { IngredientKeyEnum } from "../../../types/ingredient";
import BuildController from "../../atoms/BuildController";

type ControlType = {
  label: string;
  type: IngredientKeyEnum;
};

const controls: ControlType[] = [
  { label: "Salad", type: IngredientKeyEnum.salad },
  { label: "Bacon", type: IngredientKeyEnum.bacon },
  { label: "Cheese", type: IngredientKeyEnum.cheese },
  { label: "Meat", type: IngredientKeyEnum.meat },
];

type BurgerBuilderControllersProps = {
  price: number;
  purchasable: boolean;
  ingredientAdded: (param: IngredientKeyEnum) => void;
  ingredientRemoved: (param: IngredientKeyEnum) => void;
  disabled: boolean;
  orderHandler: () => void;
};

const BurgerBuilderControllers: FC<BurgerBuilderControllersProps> = ({
  price,
  purchasable,
  ingredientAdded,
  ingredientRemoved,
  disabled,
  orderHandler,
}) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price: <strong>{price.toFixed(2)}</strong>
      </p>
      {controls.map((ctrl) => (
        <BuildController
          key={ctrl.label}
          label={ctrl.label}
          added={() => ingredientAdded(ctrl.type)}
          removed={() => ingredientRemoved(ctrl.type)}
          disabled={disabled?.[ctrl.type]}
        />
      ))}
      <button
        className={classes.OrderButton}
        disabled={!purchasable}
        onClick={orderHandler}
      >
        ORDER NOW
      </button>
    </div>
  );
};

export default BurgerBuilderControllers;
