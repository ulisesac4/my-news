import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import {
  CircularProgress,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Card,
  CardHeader,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import NewsletterSelect from "src/components/NewsletterSelect";
import PageTemplate from "src/components/PageTemplate";
import {
  RecipientsDelete200ResponseRecipients,
  RecipientApi,
} from "src/core/API";
import CreateRecipientDialog from "./createRecipientDialog";

function Recipients() {
  const [recipients, setRecipients] = useState<
    RecipientsDelete200ResponseRecipients[]
  >([{ createdAt: "", id: 1, email: "", updatedAt: "" }]);
  const [newsletterId, setNewsletterId] = useState(0);

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const RecipientsAPI = new RecipientApi();

  const fetchRecipients = async () => {
    try {
      setIsLoading(true);
      const recipients = await RecipientsAPI.recipientsIdGet(newsletterId);
      if (recipients.status === 200) {
        setRecipients(recipients.data.recipients);
      } else {
        // error message here
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openCreateDialog = async () => {
    setIsCreateOpen(true);
  };

  const closeCreateDialog = async () => {
    setIsCreateOpen(false);
    fetchRecipients()
      .then((success) => {})
      .catch((err) => {});
  };

  const destroyRecipient = async (id) => {
    try {
      setIsLoading(true);
      const recipients = await RecipientsAPI.recipientsDelete({ id });
      if (recipients.status === 200) {
      } else {
        toast("Your Recipient have been deleted successfully");
      }
      fetchRecipients()
        .then((success) => {})
        .catch((err) => {});
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipients();
  }, [newsletterId]);
  return (
    <PageTemplate
      headerActionName={"Create Recipient"}
      headerDescription={
        "This where you check the names of the recipients you have"
      }
      headerTitle={"Recipients"}
      pageTitle={"Recipients"}
      headerAction={() => {
        openCreateDialog();
      }}
    >
      <Card>
        <CardHeader
          action={
            <Box width={150}>
              <NewsletterSelect
                onSelectNewsletter={async (value) => {
                  console.log("when update", value);
                  setNewsletterId(value);
                  await fetchRecipients();
                }}
              ></NewsletterSelect>
            </Box>
          }
          title="Recent Orders"
        />

        <Divider />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!isLoading ? (
                recipients.length ? (
                  recipients.map((recipient) => {
                    return (
                      <TableRow key={recipient.id}>
                        <TableCell>{recipient.email}</TableCell>
                        <TableCell align="center">
                          <Tooltip title="Delete Recipient" arrow>
                            <IconButton
                              size="small"
                              onClick={async () => {
                                await destroyRecipient(recipient.id);
                              }}
                            >
                              <DeleteTwoToneIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={6}>no records found</TableCell>{" "}
                  </TableRow>
                )
              ) : (
                <CircularProgress />
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <CreateRecipientDialog
        open={isCreateOpen}
        onClose={() => {
          closeCreateDialog();
        }}
      />
    </PageTemplate>
  );
}

export default Recipients;
