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
  Divider,
  Card,
  CardHeader,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PageTemplate from "src/components/PageTemplate";
import {
  TemplatesDelete200ResponseTemplatesInner,
  TemplateApi,
} from "src/core/API";
import CreateTemplateDialog from "./createTemplateDialog";
import UpdateTemplateDialog from "./updateTemplateDialog";

function Templates() {
  const [templates, setTemplates] = useState<
    TemplatesDelete200ResponseTemplatesInner[]
  >([{ createdAt: "", id: 1, name: "", updatedAt: "", content: "" }]);
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplatesDelete200ResponseTemplatesInner>({});
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const TemplatesAPI = new TemplateApi();

  const fetchTemplates = async () => {
    try {
      setIsLoading(true);
      const templates = await TemplatesAPI.templatesGet();
      if (templates.status === 200) {
        setTemplates(templates.data.templates);
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
    fetchTemplates()
      .then((success) => {})
      .catch((err) => {});
  };

  const openUpdateDialog = async () => {
    setIsUpdateOpen(true);
  };

  const closeUpdateDialog = async () => {
    setSelectedTemplate({});
    setIsUpdateOpen(false);
    fetchTemplates()
      .then((success) => {})
      .catch((err) => {});
  };

  const destroyTemplate = async (id) => {
    try {
      setIsLoading(true);
      const templates = await TemplatesAPI.templatesDelete({ id });
      if (templates.status === 200) {
      } else {
        toast("Your Template have been deleted successfully");
      }
      fetchTemplates()
        .then((success) => {})
        .catch((err) => {});
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);
  return (
    <PageTemplate
      headerActionName={"Create Template"}
      headerDescription={"This where you check your templates"}
      headerTitle={"Templates"}
      pageTitle={"Templates"}
      headerAction={() => {
        openCreateDialog();
      }}
    >
      <Card>
        <CardHeader title="Your Templates" />

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
                templates.map((newsletter) => {
                  return (
                    <TableRow key={newsletter.id}>
                      <TableCell>{newsletter.name}</TableCell>
                      <TableCell align="center">
                        <Tooltip title="Edit Template's Name" arrow>
                          <IconButton
                            size="small"
                            onClick={async () => {
                              setSelectedTemplate(newsletter);
                              openUpdateDialog();
                            }}
                          >
                            <EditTwoToneIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Template" arrow>
                          <IconButton
                            size="small"
                            onClick={async () => {
                              await destroyTemplate(newsletter.id);
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
                <CircularProgress />
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <CreateTemplateDialog
        open={isCreateOpen}
        onClose={() => {
          closeCreateDialog();
        }}
      />
      <UpdateTemplateDialog
        open={isUpdateOpen}
        onClose={() => {
          closeUpdateDialog();
        }}
        templateId={selectedTemplate.id}
        oldTemplateName={selectedTemplate.name}
        oldTemplateContent={selectedTemplate.content}
      />
    </PageTemplate>
  );
}

export default Templates;
