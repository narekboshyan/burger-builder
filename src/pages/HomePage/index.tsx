import BurgerBuilder from "../../components/organisms/BurgerBuilder";
import classes from "./index.module.css";

const HomePage = () => (
  <div>
    <main className={classes.content}>
      <BurgerBuilder />
    </main>
  </div>
);

export default HomePage;
