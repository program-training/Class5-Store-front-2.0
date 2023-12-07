import { useEffect, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { Box, CssBaseline, Typography } from "@mui/material";
import { ProductsCardInterface } from "../interfaces/ProductCardInterface";
import { useAppDispatch } from "../../../store/hooks";
import { setBySale } from "../productsSlice";
import SpinnerComponent from "../../form/components/WaitingComponent";
// import useFetch from "../../hooks/useFetch";
// import { useNavigate } from "react-router";
// import { BASE_URL } from "../../../App";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../../../services/apollo/queries";
import NotFoundPage from "../../layout/NotFoundPage/NotFoundPage";
// import useFetch from "../../hooks/useFetch";

const ProductsPage = () => {
  // const [pending, error, products] = useFetch<ProductsCardInterface[]>(
  //   `${BASE_URL}/products`
  // );
  const [products, setProducts] = useState<ProductsCardInterface[]>([]);
  const dispatch = useAppDispatch();

  const { loading, error, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (data) {
      setProducts(data.getProducts);
      console.log(data.getProducts);

      const sale = products
        .filter((item) => item.discountPercentage > 0)
        .map((item) => item.id);
      dispatch(setBySale(sale));
    }
  }, [data]);

  if (loading) return <SpinnerComponent />;
  if (error) return <NotFoundPage />;
  return (
    <>
      <CssBaseline />
      <Typography
        sx={{ textAlign: "center", marginBottom: "30px" }}
      ></Typography>
      <Box
        className="product-grid"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          maxWidth: "90%",
          justifyContent: "center",
        }}
      >
        {products.length &&
          products.map((product, i) => (
            <Box
              key={`${product.name}-${i}`}
              sx={{
                display: "flex",
                flexWrap: "wrap",
                maxWidth: "90%",
                justifyContent: "center",
              }}
            >
              <ProductCard product={product} />
            </Box>
          ))}
      </Box>
    </>
  );
};

export default ProductsPage;
