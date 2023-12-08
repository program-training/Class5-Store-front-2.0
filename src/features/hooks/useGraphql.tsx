import { jwtDecode } from "jwt-decode";
import { ResultCalculation } from "../form/utils/ResultCalculation";
import {
  convertToCartItem,
  convertToCartItemShipping,
} from "../form/utils/convertToCartItem";
import { useMutation } from "@apollo/client";
import { MUTATION_CHECK_IN_STOCK } from "../../services/apollo/queries";
import axios from "axios";
import { BASE_URL } from "../../App";
import { TokenType } from "../layout/types/token";
import { useAppSelector } from "../../store/hooks";
import { FieldValues } from "react-hook-form";

const useGraphql = () => {
  const [checkInStock] = useMutation(MUTATION_CHECK_IN_STOCK);
  const cartList = useAppSelector((store) => store.cart.cart);
  const onSubmitHelper = async (values: FieldValues, sum: number) => {
    try {
      const { email } = values;
      const { data } = await axios.post(`${BASE_URL}/users/user`, {
        email,
      });
      localStorage.setItem("token", data);
      const decodedToken = jwtDecode(data) as TokenType;
      console.log(decodedToken);

      const newCart = cartList.map((item) => {
        return {
          productId: item.product.id,
          requiredQuantity: item.requiredQuantity,
        };
      });

      const checkCartRes = await checkInStock({
        variables: {
          cart: newCart,
        },
      });

      if (checkCartRes.data.checkProductsInStock.notInStock.length) {
        const updatedNotInStock = ResultCalculation(
          checkCartRes.data.notInStock
        );
        return updatedNotInStock;
      }
      const converted = convertToCartItem(cartList);
      const deliveryFormToSend = convertToCartItemShipping(
        converted,
        values,
        sum,
        decodedToken._id
      );
      console.log(deliveryFormToSend);

      const order = await axios.post(`${BASE_URL}/orders`, deliveryFormToSend);
      return order.data;
    } catch (error) {
      console.log(error);
    }
  };
  return { onSubmitHelper };
};
export default useGraphql;
