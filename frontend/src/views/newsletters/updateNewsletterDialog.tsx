import { Dialog } from "@mui/material";

function UpdateNewsletterDialog({ open, onClose }) {
  return (
    <Dialog
      onClose={() => {
        onClose();
      }}
      open={open}
    >
      x
    </Dialog>
  );
}

export default UpdateNewsletterDialog;
