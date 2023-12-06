import useForm from "../hooks/useForm";
import { FieldValues } from "react-hook-form";
import deliveryValidation from "../models/deliveryValidation";
import DisplayFormContext from "../components/DisplayForm";
import { Box, Button, CssBaseline, Modal, Typography } from "@mui/material";
import { formStyle } from "../styles/formStyle";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import CheckExist from "../../cart/components/CheckModal";
import { styleModalCheck } from "../../layout/war/styleModal";
import { NotInStockApterSub } from "../../../order/types/types";
import useGraphql from "../../hooks/useGraphql";

const DeliveryForm = () => {
  // const dispatch = useAppDispatch();
  const { onSubmitHelper } = useGraphql();
  const { state } = useLocation();
  const [openMissing, setOpenMissing] = useState(false);
  const [listMissing, setListMissing] = useState<NotInStockApterSub[]>([]);

  const onSubmit = async (values: FieldValues) => {
    try {
      const result = await onSubmitHelper(values, state);
      if (result instanceof Array) {
        setListMissing(result);
        setOpenMissing(true);
      } else if (result instanceof Object) {
        console.log("success");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm(deliveryValidation, onSubmit);
  const formValues = ["address", "contactNumber", "email", "note"];
  return (
    <Box sx={formStyle}>
      <CssBaseline />{" "}
      <Box>
        <Modal open={openMissing}>
          <Box sx={styleModalCheck}>
            <CheckExist products={listMissing} setModal={setOpenMissing} />
          </Box>
        </Modal>
      </Box>
      <Typography>Your details</Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ width: "100%", mt: "2rem" }}
      >
        <DisplayFormContext
          control={control}
          errors={errors}
          formValues={formValues}
        />
        <Button
          disabled={!isValid || !isDirty}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Buy
        </Button>
      </Box>
    </Box>
  );
};

export default DeliveryForm;
