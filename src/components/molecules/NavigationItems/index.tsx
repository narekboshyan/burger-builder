import classes from "./index.module.css";
import NavigationItem from "../../atoms/NatigationItem";

const NavigationItems = () => {
  return (
    <ul className={classes.navigationItems}>
      <NavigationItem link="/orders">All orders</NavigationItem>
      <NavigationItem link="/" active>
        Burger Builder
      </NavigationItem>
      <NavigationItem link="/">Checkout</NavigationItem>
    </ul>
  );
};

export default NavigationItems;
