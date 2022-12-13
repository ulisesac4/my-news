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
import { TemplateApi } from "src/core/API";

function CreateTemplateDialog({ open, onClose }) {
  const TemplatesAPI = new TemplateApi();
  const [templateName, setTemplateName] = useState("");
  const [templateContent, setTemplateContent] = useState("");

  const cleanElements = () => {
    setTemplateContent("");
    setTemplateName("");
  };

  const createTemplate = async () => {
    try {
      if (templateName && templateContent) {
        const templates = await TemplatesAPI.templatesPost({
          name: templateName,
          content: templateContent,
        });
        if (templates.status === 200) {
          toast("Template have been created successfully");
          onClose();
        } else {
          console.log("error", templates.statusText);
          toast("There was server problem while creating your Template");
        }
      } else {
        toast("Name and Content must not be empty");
      }
    } catch (error) {
      console.log("error", error);
      toast("An error happended while creating the Template's name");
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
      <DialogTitle>Create a Template</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Add a template that will be usable to any Newsletter Issue.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Your new Template's name"
          type="text"
          fullWidth
          variant="standard"
          value={templateName}
          onChange={(event) => {
            setTemplateName(event.target.value);
          }}
        />
        <div>
          <TextField
            autoFocus
            margin="dense"
            id="content"
            label="Your new Template's content"
            type="text"
            fullWidth
            variant="standard"
            disabled
            value={templateContent}
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
                        setTemplateContent(text.slice(1, text.length - 1));
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
            await createTemplate();
          }}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateTemplateDialog;
