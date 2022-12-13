import AddCircleRounded from "@mui/icons-material/AddCircleRounded";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { TemplateApi } from "src/core/API";

function UpdateTemplateDialog({
  open,
  onClose,
  templateId,
  oldTemplateName,
  oldTemplateContent,
}) {
  const TemplatesAPI = new TemplateApi();
  const [templateName, setTemplateName] = useState(oldTemplateName);
  const [templateContent, setTemplateContent] = useState(oldTemplateContent);

  const updateTemplateName = async () => {
    try {
      if (templateName && templateContent) {
        const templates = await TemplatesAPI.templatesPatch({
          id: templateId,
          name: templateName,
          content: templateContent,
        });
        if (templates.status === 200) {
          toast("Template updated correctly");

          onClose();
        } else {
          console.log("error", templates.statusText);
          toast("An error in the server ocurred, try again later");
        }
      } else {
        toast("Name must not be empty");
      }
    } catch (error) {
      console.log("error", error);
      toast("An error happened while updating the name");
    } finally {
      setTemplateName("");
    }
  };

  useEffect(() => {
    setTemplateName(oldTemplateName);
    setTemplateContent(oldTemplateContent);
  }, [oldTemplateName, oldTemplateContent]);

  return (
    <Dialog
      onClose={() => {
        onClose();
      }}
      open={open}
    >
      <DialogTitle>Edit the name of a Template</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You can edit the name and content of your Template here
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
            await updateTemplateName();
          }}
        >
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UpdateTemplateDialog;
