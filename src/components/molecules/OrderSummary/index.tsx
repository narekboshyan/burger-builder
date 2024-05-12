import { FC } from "react";
import { IngredientKeyEnum, IngredientsType } from "../../../types/ingredient";
import Button from "../../atoms/Button";

type OrderSummaryProps = {
  ingredients: IngredientsType;
  price: number;
  purchaseCancelled: () => void;
  purchaseContinued: () => void;
};

const OrderSummary: FC<OrderSummaryProps> = ({
  ingredients,
  price,
  purchaseCancelled,
  purchaseContinued,
}) => {
  const ingredientSummary = Object.keys(ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
        {ingredients[igKey as IngredientKeyEnum]}
      </li>
    );
  });
  return (
    <div>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total Price: {price.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button btnType="danger" onClick={purchaseCancelled}>
        CANCEL
      </Button>
      <Button btnType="success" onClick={purchaseContinued}>
        CONTINUE
      </Button>
    </div>
  );
};

export default OrderSummary;
