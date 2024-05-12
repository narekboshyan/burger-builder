import { FC } from "react";
import classes from "./index.module.css";
import Logo from "../../atoms/Logo";
import DrawerToggle from "../../molecules/DrawerToggle";
import NavigationItems from "../../molecules/NavigationItems";

type HeaderProps = {
  drawerToggleClicked: () => void;
};

const Header: FC<HeaderProps> = ({ drawerToggleClicked }) => {
  return (
    <header className={classes.header}>
      <DrawerToggle onClick={drawerToggleClicked} />
      <div className={classes.logo}>
        <Logo height={40} />
      </div>
      <nav className={classes.desktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
};

export default Header;
