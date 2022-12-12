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
      //setIsLoading(true);
      const newsletters = await NewslettersAPI.newslettersPatch({
        id: newsletterId,
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
