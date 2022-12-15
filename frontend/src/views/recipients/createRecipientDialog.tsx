import AddCircleRounded from "@mui/icons-material/AddCircleRounded";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { useState, ChangeEvent } from "react";
import { toast } from "react-toastify";
import NewsletterSelect from "src/components/NewsletterSelect";
import { NewsletterApi, RecipientApi } from "src/core/API";

function CreateRecipientDialog({ open, onClose }) {
  const RecipientsAPI = new RecipientApi();
  const [recipientName, setRecipientName] = useState("");
  const [newsletterId, setNewsletterId] = useState(0);
  const [recipientContent, setRecipientContent] = useState("");

  const cleanElements = () => {
    setRecipientContent("");
    setRecipientName("");
  };

  const createRecipient = async () => {
    try {
      if (newsletterId && recipientContent) {
        const recipients = await RecipientsAPI.recipientsPost({
          emails: recipientContent.split(" ").map((emailElement) => {
            return emailElement;
          }),
          newsletterId: newsletterId.toString(),
        });
        if (recipients.status === 200) {
          toast("Recipient have been created successfully");
          onClose();
        } else {
          console.log("error", recipients.statusText);
          toast("There was server problem while creating your Recipient");
        }
      } else {
        toast("Emails and Target Newsletter must not be empty");
      }
    } catch (error) {
      console.log("error", error);
      toast("An error happended while creating the Recipient's name");
    } finally {
      cleanElements();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        cleanElements();
        onClose();
      }}
    >
      <DialogTitle>Create Recipients</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You can write here your new emails separated by a space or load a file
          with the emails separated by a new line.
        </DialogContentText>

        <div>
          <TextField
            margin="dense"
            id="content"
            label="Your new Recipients"
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) => {
              setRecipientContent(event.target.value);
            }}
            value={recipientContent}
            InputProps={{
              endAdornment: (
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <input
                    hidden
                    type="file"
                    onChange={(event) => {
                      event.preventDefault();
                      const reader = new FileReader();
                      reader.onload = async (e) => {
                        let text = e.target.result.toString();
                        setRecipientContent(
                          text
                            .slice(1, text.length - 1)
                            .split("\n")
                            .join(" ")
                        );
                      };
                      reader.readAsText(event.target.files[0]);
                    }}
                  />
                  <AddCircleRounded />
                </IconButton>
              ),
            }}
          />
        </div>
        <br />

        <NewsletterSelect
          onSelectNewsletter={async (value) => {
            console.log("when update", value);
            setNewsletterId(value);
            //await fetchRecipients();
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
            await createRecipient();
          }}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateRecipientDialog;
