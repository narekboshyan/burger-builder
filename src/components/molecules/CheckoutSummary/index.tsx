import { FC } from "react";
import Burger from "../Burger";
import classes from "./index.module.css";
import { IngredientsType } from "../../../types/ingredient";
import Button from "../../atoms/Button";

type CheckoutSummaryProps = {
  ingredients: Partial<IngredientsType>;
  checkoutCancelled: () => void;
  checkoutContinued: () => void;
};

const CheckoutSummary: FC<CheckoutSummaryProps> = ({
  ingredients,
  checkoutCancelled,
  checkoutContinued,
}) => {
  return (
    <div className={classes.checkoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={ingredients as IngredientsType} />
      </div>
      <Button btnType="danger" onClick={checkoutCancelled}>
        CANCEL
      </Button>
      <Button btnType="success" onClick={checkoutContinued}>
        CONTINUE
      </Button>
    </div>
  );
};

export default CheckoutSummary;
