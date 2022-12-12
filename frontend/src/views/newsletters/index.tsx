import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import {
  CircularProgress,
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
import PageTemplate from "src/components/PageTemplate";
import {
  NewsletterApi,
  NewslettersDelete200ResponseNewslettersInner,
} from "src/core/API";

function Newsletters() {
  const [newsletters, setNewsletters] = useState<
    NewslettersDelete200ResponseNewslettersInner[]
  >([{ createdAt: "", id: 1, name: "", updatedAt: "" }]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const NewslettersAPI = new NewsletterApi();

  const fetchNewsletters = async () => {
    try {
      setIsLoading(true);
      const newsletters = await NewslettersAPI.newslettersGet();
      if (newsletters.status === 200) {
        setNewsletters(newsletters.data.newsletters);
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
    fetchNewsletters()
      .then((success) => {})
      .catch((err) => {});
  };

  const openUpdateDialog = async () => {
    setIsUpdateOpen(true);
  };

  const closeUpdateDialog = async () => {
    setIsUpdateOpen(false);
    fetchNewsletters()
      .then((success) => {})
      .catch((err) => {});
  };

  useEffect(() => {
    fetchNewsletters();
  }, []);
  return (
    <PageTemplate
      headerActionName={"Create Newsletter"}
      headerDescription={
        "This where you check the names of the newsletters you have"
      }
      headerTitle={"Newsletters"}
      pageTitle={"Newsletters"}
      headerAction={() => {
        openCreateDialog();
      }}
    >
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
              newsletters.map((newsletter) => {
                return (
                  <TableRow key={newsletter.id}>
                    <TableCell>{newsletter.name}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Edit Newsletter's Name" arrow>
                        <IconButton size="small">
                          <EditTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Newsletter" arrow>
                        <IconButton size="small">
                          <DeleteTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <CircularProgress />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </PageTemplate>
  );
}

export default Newsletters;
