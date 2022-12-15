import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import {
  Box,
  Card,
  CardHeader,
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
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Label from "src/components/Label";
import NewsletterSelect from "src/components/NewsletterSelect";
import PageTemplate from "src/components/PageTemplate";
import {
  IssueApi,
  IssuesNewsletterIdGet200ResponseIssuesInner,
} from "src/core/API";
import CreateIssueDialog from "./createIssueDialog";

function Issues() {
  const [issues, setIssues] = useState<
    IssuesNewsletterIdGet200ResponseIssuesInner[]
  >([{ id: 1, createdAt: "", updatedAt: "" }]);
  const [newsletterId, setNewsletterId] = useState(0);

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const IssuesAPI = new IssueApi();

  const fetchIssues = async () => {
    try {
      setIsLoading(true);
      const issues = await IssuesAPI.issuesNewsletterIdGet(newsletterId);
      if (issues.status === 200) {
        setIssues(issues.data.issues);
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
    fetchIssues()
      .then((success) => {})
      .catch((err) => {});
  };

  const destroyIssue = async (id) => {
    try {
      setIsLoading(true);
      const issues = await IssuesAPI.issuesDelete({
        id,
      });
      if (issues.status === 200) {
      } else {
        toast("Your Issue have been deleted successfully");
      }
      fetchIssues()
        .then((success) => {})
        .catch((err) => {});
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, [newsletterId]);
  return (
    <PageTemplate
      headerActionName={"Create Issue"}
      headerDescription={
        "This where you check the issues you have per newsletter"
      }
      headerTitle={"Issues"}
      pageTitle={"Issues"}
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
                  await fetchIssues();
                }}
              ></NewsletterSelect>
            </Box>
          }
          title="Your Issues"
        />

        <Divider />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!isLoading ? (
                issues.length ? (
                  issues.map((issue) => {
                    return (
                      <TableRow key={issue.id}>
                        <TableCell>{issue.name}</TableCell>
                        <TableCell align="center">
                          <Label color={issue.isSent ? "success" : "error"}>
                            {issue.isSent ? "Sent" : "Not Yet Sent"}
                          </Label>
                        </TableCell>
                        <TableCell align="center">
                          <Tooltip title="Delete Issue" arrow>
                            <IconButton
                              size="small"
                              onClick={async () => {
                                await destroyIssue(issue.id);
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
      <CreateIssueDialog
        open={isCreateOpen}
        onClose={() => {
          closeCreateDialog();
        }}
      />
    </PageTemplate>
  );
}

export default Issues;
