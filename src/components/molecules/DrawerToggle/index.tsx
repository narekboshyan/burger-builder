import { FC } from "react";
import classes from "./index.module.css";

type DrawerToggleProps = {
  onClick: () => void;
};

const DrawerToggle: FC<DrawerToggleProps> = ({ onClick }) => {
  return (
    <div className={classes.drawerToggle} onClick={onClick}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default DrawerToggle;
