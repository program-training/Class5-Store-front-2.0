import { ProductsCardInterface } from "../../features/products/interfaces/ProductCardInterface";
export type productInCart = {
  product: ProductsCardInterface;
  requiredQuantity: number;
  sumProductInCart: number;
};

export type PropProductInCart = {
  productCart: productInCart;
};

export type NotInStock = {
  product: ProductsCardInterface;
  requiredQuantity: number;
};
export type InStock = {
  productId: number;
  requiredQuantity: number;
};

export type NotInStockApterSub = {
  product: ProductsCardInterface;
  requiredQuantity: number;
  exist: number;
  missing: number;
};
