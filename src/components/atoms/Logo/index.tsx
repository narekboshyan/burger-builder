import { FC } from "react";
import classes from "./index.module.css";

type LogoProps = {
  height: number;
};

const Logo: FC<LogoProps> = ({ height }) => (
  <div className={classes.logo} style={{ height }}>
    <img src="/src/assets/burger-img.jpg" height={40} width={40} alt="logo" />
  </div>
);

export default Logo;
