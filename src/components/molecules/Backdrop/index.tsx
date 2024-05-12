import React, { FC } from "react";
import classes from "./index.module.css";

type BackdropProps = {
  onClick: () => void;
};

const Backdrop: FC<BackdropProps> = ({ onClick }) => (
  <div className={classes.backdrop} onClick={onClick} />
);

export default Backdrop;
