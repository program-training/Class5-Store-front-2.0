import { gql } from "@apollo/client";

export const QUERY_PRODUCTS = gql`
  query GetProducts {
    getProducts {
      id
      name
      salePrice
      quantity
      description
      category
      discountPercentage
      imageUrl
      imageAlt
    }
  }
`;
export const QUERY_PRODUCT = gql`
  query GetProduct($getProductId: ID) {
    getProduct(id: $getProductId) {
      id
      name
      salePrice
      quantity
      description
      category
      discountPercentage
      imageUrl
      imageAlt
    }
  }
`;
export const PRODUCT_TO_INPUT = gql`
  input ProductInput {
    id: ID
    name: String
    salePrice: String
    quantity: Int
    description: String
    category: String
    discountPercentage: Int
    imageUrl: String
    imageAlt: String
  }
`;
export const PRODUCT_TO_CHECK = gql`
  input ProductToCheck {
    product: ProductInput
    requiredQuantity: Int
    sumProductInCart: String
  }
`;

export const MUTATION_CANCEL = gql`
  mutation CancelProductsInStock($cart: [CheckQuantity!]) {
    cancelProductsInStock(cart: $cart)
  }
`;
export const MUTATION_CHECK_IN_STOCK = gql`
  mutation CheckProductsInStock($cart: [ProductToCheck!]) {
    checkProductsInStock(cart: $cart) {
      inStock {
        productId
        requiredQuantity
      }
      notInStock {
        product {
          id
          name
          salePrice
          quantity
          description
          category
          discountPercentage
          imageUrl
          imageAlt
        }
        requiredQuantity
      }
    }
  }
`;
