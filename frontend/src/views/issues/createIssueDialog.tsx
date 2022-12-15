import AddCircleRounded from "@mui/icons-material/AddCircleRounded";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  IconButton,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useState } from "react";
import { toast } from "react-toastify";
import NewsletterSelect from "src/components/NewsletterSelect";
import TemplateSelect from "src/components/TemplateSelect";
import { IssueApi } from "src/core/API";

function CreateIssueDialog({ open, onClose }) {
  const IssuesAPI = new IssueApi();
  const [fileName, setFileName] = useState("");
  const [issueAttachment, setissueAttachment] = useState("");
  const [issueContent, setIssueContent] = useState("");
  const [publishDate, setPublishDate] = useState(new Date());
  const [newsletterId, setNewsletterId] = useState(0);
  const [templateId, setTemplateId] = useState("");
  const [issueName, setIssueName] = useState("");

  const handleChange = (newValue) => {
    setPublishDate(newValue);
  };
  const cleanElements = () => {
    setFileName("");
    setissueAttachment("");
    setIssueName("");
    setIssueContent("");
    setPublishDate(new Date());
  };

  const createIssue = async () => {
    try {
      if (newsletterId && issueName) {
        const recipients = await IssuesAPI.issuesPost({
          name: issueName,
          attachments: issueAttachment.replace("attch", fileName),
          content: issueContent,
          isSent: "false",
          newsletterId: newsletterId.toString(),
          publishDate: publishDate.toISOString(),
          templateId: templateId,
        });
        if (recipients.status === 200) {
          toast("Issue have been created successfully");
          cleanElements();
          onClose();
        } else {
          console.log("error", recipients.statusText);
          toast("There was server problem while creating your Issue");
        }
      } else {
        toast("Emails and Target Newsletter must not be empty");
      }
    } catch (error) {
      console.log("error", error);
      toast("An error happended while creating the Issue's name");
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
      <DialogTitle>Create Issues</DialogTitle>
      <DialogContent>
        <DialogContentText>You can write here your Issue</DialogContentText>

        <div>
          <TextField
            margin="dense"
            id="content"
            label="Name of the Issue"
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) => {
              setIssueName(event.target.value);
            }}
            value={issueName}
          />
        </div>
        <br />
        <div>
          <DateTimePicker
            label="Publish Date"
            inputFormat="MM/dd/yyyy HH:mm"
            value={publishDate}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </div>

        <div>
          <TextField
            autoFocus
            margin="dense"
            id="content"
            label="Your attachment"
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) => {
              setissueAttachment(event.target.value);
            }}
            value={fileName}
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
                        let text = e.target.result;
                        setissueAttachment(
                          JSON.stringify([
                            {
                              filename: "attch",
                              content: e.target.result,
                              encoding: "base64",
                            },
                          ])
                        );
                      };
                      reader.readAsDataURL(event.target.files[0]);
                      setFileName(event.target.files[0].name);
                    }}
                  />
                  <AddCircleRounded />
                </IconButton>
              ),
            }}
          />
        </div>
        <div>
          <TextField
            multiline
            rows={10}
            margin="dense"
            id="content"
            label="Content in HTML"
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) => {
              setIssueContent(event.target.value);
            }}
            value={issueContent}
          />
        </div>
        <br />
        <div>
          <NewsletterSelect
            onSelectNewsletter={async (value) => {
              console.log("when update", value);
              setNewsletterId(value);
              //await fetchIssues();
            }}
          />
        </div>
        <br />
        <div>
          <TemplateSelect
            onSelectTemplate={async (value) => {
              console.log("when update", value);
              setTemplateId(value);
              //await fetchIssues();
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
            await createIssue();
          }}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateIssueDialog;
