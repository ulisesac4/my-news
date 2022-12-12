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
import { NewsletterApi } from "src/core/API";

function CreateNewsletterDialog({ open, onClose }) {
  const NewslettersAPI = new NewsletterApi();
  const [newsletterName, setNewsletterName] = useState("");

  const createNewsletter = async () => {
    try {
      //setIsLoading(true);
      const newsletters = await NewslettersAPI.newslettersPost({
        name: newsletterName,
      });
      if (newsletters.status === 200) {
        //setNewsletters(newsletters.data.newsletters);

        onClose();
      } else {
        // error message here
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setNewsletterName("");
      //setIsLoading(false);
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
          autoFocus
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
