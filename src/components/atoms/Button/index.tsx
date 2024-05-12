import { FC, ReactNode } from "react";
import classes from "./index.module.css";

type ButtonProps = {
  btnType: string;
  onClick?: () => void;
  children: ReactNode;
};

const Button: FC<ButtonProps> = ({ btnType, onClick = () => {}, children }) => (
  <button
    className={[classes.button, classes[btnType]].join(" ")}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
