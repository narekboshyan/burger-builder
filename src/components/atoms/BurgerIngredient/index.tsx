import { FC } from "react";
import classes from "./index.module.css";

type BurgerIngredientProps = {
  type: string;
};

const BurgerIngredient: FC<BurgerIngredientProps> = ({ type }) => {
  switch (type) {
    case "bread-bottom":
      return <div className={classes.breadBottom}></div>;
    case "bread-top":
      return (
        <div className={classes.breadTop}>
          <div className={classes.seeds1}></div>
          <div className={classes.seeds2}></div>
        </div>
      );
    case "meat":
      return <div className={classes.meat}></div>;
    case "cheese":
      return <div className={classes.cheese}></div>;
    case "bacon":
      return <div className={classes.bacon}></div>;
    case "salad":
      return <div className={classes.salad}></div>;
    default:
      return null;
  }
};

export default BurgerIngredient;
