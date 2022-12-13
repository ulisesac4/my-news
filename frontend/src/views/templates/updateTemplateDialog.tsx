import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { NewsletterApi } from "src/core/API";

function UpdateNewsletterDialog({
  open,
  onClose,
  newsletterId,
  oldNewsletterName,
}) {
  const NewslettersAPI = new NewsletterApi();
  const [newsletterName, setNewsletterName] = useState(oldNewsletterName);

  const updateNewsletterName = async () => {
    try {
      if (newsletterName) {
        const newsletters = await NewslettersAPI.newslettersPatch({
          id: newsletterId,
          name: newsletterName,
        });
        if (newsletters.status === 200) {
          toast("Newsletter updated correctly");

          onClose();
        } else {
          console.log("error", newsletters.statusText);
          toast("An error in the server ocurred, try again later");
        }
      } else {
        toast("Name must not be empty");
      }
    } catch (error) {
      console.log("error", error);
      toast("An error happened while updating the name");
    } finally {
      setNewsletterName("");
    }
  };

  useEffect(() => {
    setNewsletterName(oldNewsletterName);
  }, [oldNewsletterName]);

  return (
    <Dialog
      onClose={() => {
        onClose();
      }}
      open={open}
    >
      <DialogTitle>Edit the name of a Newsletter</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You can edit the name of your Newsletter here
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
            await updateNewsletterName();
          }}
        >
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UpdateNewsletterDialog;
