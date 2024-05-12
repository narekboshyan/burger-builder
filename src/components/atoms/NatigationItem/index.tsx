import { FC, PropsWithChildren } from "react";
import classes from "./index.module.css";
import { Link } from "react-router-dom";

type NavigationItemProps = {
  link: string;
  active?: boolean;
};

const NavigationItem: FC<PropsWithChildren<NavigationItemProps>> = ({
  link,
  active,
  children,
}) => {
  return (
    <li className={classes.navigationItem}>
      <Link to={link} className={active ? classes.active : ""}>
        {children}
      </Link>
    </li>
  );
};

export default NavigationItem;
