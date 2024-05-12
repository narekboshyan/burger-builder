import { FormEvent, useCallback, useState } from "react";

import classes from "./index.module.css";
import Button from "../../components/atoms/Button";
import { IngredientsType, StateType } from "../../types/ingredient";
import { $apiClient } from "../../api/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { initData } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

type OrderType = {
  name: string;
  email: string;
  deliveryMethod: string;
  address: {
    street: string;
    zipCode: string;
    country: string;
  };
};

interface OrderData {
  ingredients: IngredientsType;
  price: number;
  customer: {
    order: OrderType;
  };
}

const ContactData = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderType>({
    name: "",
    email: "",
    deliveryMethod: "",
    address: {
      street: "",
      zipCode: "",
      country: "",
    },
  });

  const { data: ingredientsData }: { data: StateType; refetch: () => void } =
    useQuery({
      queryKey: ["ingredients"],
      queryFn: () => $apiClient.get("/data.json"),
      refetchOnWindowFocus: false,
    });

  const { mutate: clearIngredientsData } = useMutation({
    mutationFn: () => $apiClient.put("/data.json", initData),
    onSuccess() {
      navigate("/");
    },
  });

  const { mutate } = useMutation({
    mutationFn: (data: OrderData) => $apiClient.post("/orders.json", data),
    onSuccess() {
      clearIngredientsData();
    },
  });

  const formSubmitHandler = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data: OrderData = {
        ingredients: ingredientsData.ingredients,
        price: ingredientsData.totalPrice,
        customer: {
          order,
        },
      };

      mutate(data);
    },
    [ingredientsData.ingredients, ingredientsData.totalPrice, mutate, order]
  );

  return (
    <div className={classes.contactData}>
      <h2>Enter your Contact Data</h2>
      <form onSubmit={formSubmitHandler}>
        <input
          className={classes.input}
          type="text"
          name="name"
          onChange={(e) => {
            setOrder((prevState: OrderType) => ({
              ...prevState,
              name: e.target.value,
            }));
          }}
          placeholder="Your Name"
        />
        <input
          className={classes.input}
          onChange={(e) => {
            setOrder((prevState: OrderType) => ({
              ...prevState,
              email: e.target.value,
            }));
          }}
          type="email"
          name="email"
          placeholder="Your Mail"
        />
        <input
          className={classes.input}
          type="text"
          name="street"
          placeholder="Street"
          onChange={(e) => {
            setOrder((prevState: OrderType) => ({
              ...prevState,
              address: { ...prevState.address, street: e.target.value },
            }));
          }}
        />
        <input
          className={classes.input}
          type="text"
          name="postal"
          placeholder="Postal Code"
          onChange={(e) => {
            setOrder((prevState: OrderType) => ({
              ...prevState,
              address: { ...prevState.address, zipCode: e.target.value },
            }));
          }}
        />
        <Button btnType="success">ORDER</Button>
      </form>
    </div>
  );
};

export default ContactData;
