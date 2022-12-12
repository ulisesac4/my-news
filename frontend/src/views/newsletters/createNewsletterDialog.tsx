import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

function CreateNewsletterDialog({ open, onClose }) {
  return (
    <Dialog
      open={open}
      onClose={() => {
        onClose();
      }}
    >
      <DialogTitle>Create a Newsletter</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To create Issues add a Newsletter.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Your new Newsletter's name"
          type="text"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onClose();
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            onClose();
          }}
        >
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateNewsletterDialog;
