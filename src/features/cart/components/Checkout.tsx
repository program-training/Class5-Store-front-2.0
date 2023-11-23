import { Button } from "@mui/material";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useState } from "react";
import DeliveryFrom from "../../Deliveryform/components/DeliveryFrom";
import { useAppSelector } from "../../../store/hooks";

const Checkout = () => {
  const cart = useAppSelector((store) => store.cart.cart);
  const [openMissing, setOpenMissing] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const handleClickOpen = () => {};

  const handleClose = () => {};

  return (
    <>
      <Button
        fullWidth
        variant="contained"
        sx={{ mb: 1 }}
        onClick={handleClickOpen}
      >
        <ShoppingCartCheckoutIcon sx={{ mr: 1 }} /> Checkout
      </Button>
      <DeliveryFrom open={openForm} onClose={handleClose} />
    </>
  );
};
export default Checkout;