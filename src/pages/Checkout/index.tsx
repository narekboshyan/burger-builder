import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutSummary from "../../components/molecules/CheckoutSummary";
import { $apiClient } from "../../api/axios";
import { StateType } from "../../types/ingredient";
import { useQuery } from "@tanstack/react-query";

const Checkout = () => {
  const navigate = useNavigate();

  const { data }: { data: StateType } = useQuery({
    queryKey: ["ingredients"],
    queryFn: () => $apiClient.get("/data.json"),
    refetchOnWindowFocus: false,
  });

  // const price = useMemo(() => params.get("price"), [params]);

  const checkoutCancelledHandler = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const checkoutContinuedHandler = useCallback(() => {
    navigate("/checkout/contact-data");
  }, [navigate]);

  return (
    <div>
      {data && (
        <CheckoutSummary
          ingredients={data.ingredients}
          checkoutCancelled={checkoutCancelledHandler}
          checkoutContinued={checkoutContinuedHandler}
        />
      )}
    </div>
  );
};

export default Checkout;
