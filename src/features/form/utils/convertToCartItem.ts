import { FieldValues } from "react-hook-form";
import { CartItemFromClientInterface } from "../../../order/interfaces/CartItemsInterfaces";
import { productInCart } from "../../../order/types/types";

export const convertToCartItem = (
  cart: productInCart[]
): CartItemFromClientInterface[] => {
  return cart.map((item) => {
    return {
      productId: item.product.id,
      description: item.product.description,
      name: item.product.name,
      salePrice: item.product.salePrice.toString(),
      quantity: item.requiredQuantity,
    };
  });
};

export const convertToCartItemShipping = (
  cart: CartItemFromClientInterface[],
  details: FieldValues,
  sum: number,
  userId: string
) => {
  const shippingDetails = {
    address: details.address,
    contactNumber: details.contactNumber,
    userId: userId,
    orderType: "standard",
  };
  const orderFromClint = {
    cartItems: cart,
    email: details.email,
    price: sum,
    shippingDetails: shippingDetails,
  };

  return orderFromClint;
};
