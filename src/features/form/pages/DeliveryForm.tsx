import useForm from "../hooks/useForm";
import { FieldValues } from "react-hook-form";
import deliveryValidation from "../models/deliveryValidation";
import DisplayFormContext from "../components/DisplayForm";
import { Box, Button, CssBaseline, Typography } from "@mui/material";
import { formStyle } from "../styles/formStyle";
import { useAppSelector } from "../../../store/hooks";
import { useEffect, useState } from "react";
import { checkCart } from "../../../order/utils/utils";

const DeliveryForm = () => {
  const onSubmit = (values: FieldValues) => {
    console.log(JSON.stringify(values));
  };
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm(deliveryValidation, onSubmit);
  const formValues = ["address", "contactNumber", "email", "note"];
  return (
    <Box sx={formStyle}>
      <CssBaseline />
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
