import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";

const NotInStock = () => {
  const [open, setOpen] = React.useState(false);
  // const [renderComponent, setRenderComponent] = useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleToPayment = () => {
    setOpen(false);
    navigate("/payment");
  };
  const handleBackToHome = () => {
    setOpen(false);
    navigate("/home");
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Not Found</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The item your searching for is not in stock.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleBackToHome}>Back to store</Button>
          <Button onClick={handleToPayment} autoFocus>
            continue to payment
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default NotInStock;
