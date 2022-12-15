import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import { NewsletterApi } from "src/core/API";

function CreateNewsletterDialog({ open, onClose }) {
  const NewslettersAPI = new NewsletterApi();
  const [newsletterName, setNewsletterName] = useState("");

  const createNewsletter = async () => {
    try {
      if (newsletterName) {
        const newsletters = await NewslettersAPI.newslettersPost({
          name: newsletterName,
        });
        if (newsletters.status === 200) {
          toast("Newsletter have been created successfully");
          onClose();
        } else {
          console.log("error", newsletters.statusText);
          toast(
            "There was server problem while updating your Newsletter's name"
          );
        }
      } else {
        toast("Name must not be empty");
      }
    } catch (error) {
      console.log("error", error);
      toast("An error happended while updating the Newsletter's name");
    } finally {
      setNewsletterName("");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setNewsletterName("");
        onClose();
      }}
    >
      <DialogTitle>Create a Newsletter</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To create Issues add a Newsletter.
        </DialogContentText>
        <TextField
          margin="dense"
          id="name"
          label="Your new Newsletter's name"
          type="text"
          fullWidth
          variant="standard"
          value={newsletterName}
          onChange={(event) => {
            setNewsletterName(event.target.value);
          }}
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
          onClick={async () => {
            await createNewsletter();
          }}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateNewsletterDialog;
