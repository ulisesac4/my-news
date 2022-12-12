import { Dialog } from "@mui/material";

function CreateNewsletterDialog({ open, onClose }) {
  return (
    <Dialog
      open={open}
      onClose={() => {
        onClose();
      }}
    >
      x
    </Dialog>
  );
}

export default CreateNewsletterDialog;
