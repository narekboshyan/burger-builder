import { FC } from "react";
import classes from "./index.module.css";

const Loading: FC = () => (
  <div className={classes.loadingContainer}>
    <div className={classes.backdrop} />
    <div className={classes.loading}>Loading...</div>
  </div>
);

export default Loading;
