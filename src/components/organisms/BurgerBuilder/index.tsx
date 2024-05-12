import { useCallback, useEffect, useMemo, useState } from "react";
import {
  IngredientKeyEnum,
  IngredientsType,
  StateType,
} from "../../../types/ingredient";
import { $apiClient } from "../../../api/axios";
import Burger from "../../molecules/Burger";
import BurgerBuilderControllers from "../../molecules/BurgerBuilderControllers";
import Modal from "../../molecules/Modal";
import OrderSummary from "../../molecules/OrderSummary";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const BurgerBuilder = () => {
  const [purchasing, setPurchasing] = useState<boolean>(false);
  const navigate = useNavigate();
  const [state, setState] = useState<StateType>({
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 0,
    purchasable: false,
  });

  const { data, refetch }: { data: StateType; refetch: () => void } = useQuery({
    queryKey: ["ingredients"],
    queryFn: () => $apiClient.get("/data.json"),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      setState(data);
    }
  }, [data]);

  const updatedIngredientsHandler = useCallback(
    (state: StateType) => {
      $apiClient.put("/data.json", state).then(() => {
        refetch();
      });
    },
    [refetch]
  );

  const addIngredientHandler = useCallback(
    (type: IngredientKeyEnum) => {
      console.log({ type });
      const oldCount = state.ingredients[type];

      console.log({ oldCount });

      const updatedCount = oldCount + 1;
      const updatedIngredients: IngredientsType = {
        ...state.ingredients,
      };

      console.log({ updatedIngredients });

      updatedIngredients[type] = updatedCount;
      const priceAddition = INGREDIENT_PRICES[type];
      const oldPrice = state.totalPrice;
      const newPrice = oldPrice + priceAddition;

      const sum = Object.keys(updatedIngredients)
        .map((igKey: string) => updatedIngredients[igKey as IngredientKeyEnum])
        .reduce((sum, el) => sum + el, 0);

      const newState = {
        ...state,
        totalPrice: newPrice,
        ingredients: updatedIngredients,
        purchasable: sum > 0,
      };

      updatedIngredientsHandler(newState);
    },
    [state, updatedIngredientsHandler]
  );

  const removeIngredientHandler = useCallback(
    (type: IngredientKeyEnum) => {
      const oldCount = state.ingredients[type];
      if (oldCount <= 0) {
        return;
      }
      const updatedCount = oldCount - 1;
      const updatedIngredients: IngredientsType = {
        ...state.ingredients,
      };
      updatedIngredients[type] = updatedCount;
      const priceDeduction = INGREDIENT_PRICES[type];
      const oldPrice = state.totalPrice;
      const newPrice = oldPrice - priceDeduction;

      const sum = Object.keys(updatedIngredients)
        .map((igKey: string) => updatedIngredients[igKey as IngredientKeyEnum])
        .reduce((sum, el) => sum + el, 0);

      const newState = {
        ...state,
        totalPrice: newPrice,
        ingredients: updatedIngredients,
        purchasable: sum > 0,
      };

      updatedIngredientsHandler(newState);
    },
    [state, updatedIngredientsHandler]
  );

  const disabledInfo = useMemo(() => {
    const data: IngredientsType = {
      ...state.ingredients,
    };

    Object.keys(data).forEach((key: string) => {
      data[key as IngredientKeyEnum] = data[key as IngredientKeyEnum];
    });

    return !!data;
  }, [state.ingredients]);

  const purchaseHandler = useCallback(() => {
    setPurchasing(true);
  }, []);

  const purchaseCancelHandler = useCallback(() => {
    setPurchasing(false);
  }, []);

  const purchaseContinueHandler = useCallback(() => {
    navigate(`/checkout`);
  }, [navigate]);

  return (
    <>
      {state.ingredients && (
        <>
          <Burger ingredients={state.ingredients} />
          <BurgerBuilderControllers
            ingredientAdded={addIngredientHandler}
            ingredientRemoved={removeIngredientHandler}
            disabled={!!disabledInfo}
            purchasable={state.purchasable}
            price={state.totalPrice}
            orderHandler={purchaseHandler}
          />
          <Modal isOpen={purchasing} onClose={purchaseCancelHandler}>
            <OrderSummary
              ingredients={state.ingredients}
              price={state.totalPrice}
              purchaseCancelled={purchaseCancelHandler}
              purchaseContinued={purchaseContinueHandler}
            />
          </Modal>
        </>
      )}
    </>
  );
};

export default BurgerBuilder;
