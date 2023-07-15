import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Button3D from "../Button3D";
const Popup = ({ open, onClose, onClick, title, content, sx }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        // backgroundColor: "pink",
        margin: 0,
        padding: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "& .MuiPaper-root": {
          minWidth: "500px",
        },
        ...sx,
      }}
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
        <Button3D onClick={onClose}>Cancel</Button3D>
        <Button3D onClick={onClose} autoFocus>
          Confirm
        </Button3D>
      </DialogActions>
    </Dialog>
  );
};
export default Popup;
