import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import {
  Box,
  Card,
  CircularProgress,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import Logo from "src/components/LogoSign";
import {
  RecipientApi,
  RecipientsSubscriptionsEmailGet200ResponseSubscriptionsInner,
} from "src/core/API";
import Hero from "./Hero";

const OverviewWrapper = styled(Box)(
  () => `
    overflow: auto;
    flex: 1;
    overflow-x: hidden;
    align-items: center;
`
);

function Overview(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [recipients, setRecipients] = useState<
    RecipientsSubscriptionsEmailGet200ResponseSubscriptionsInner[]
  >([{ name: "0", newsletterId: 0, recipientId: 0 }]);
  const { email } = useParams();

  const RecipientsAPI = new RecipientApi();

  const fetchSubscriptions = async () => {
    try {
      setIsLoading(true);
      const recipients = await RecipientsAPI.recipientsSubscriptionsEmailGet(
        email
      );
      if (recipients.status === 200) {
        setRecipients(recipients.data.subscriptions);
      } else {
        // error message here
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const destroyRecipient = async (id, newsletterId) => {
    try {
      setIsLoading(true);
      const recipients = await RecipientsAPI.recipientsDelete({
        id,
        newsletterId,
      });
      if (recipients.status === 200) {
      } else {
        toast("Your Recipient have been deleted successfully");
      }
      fetchSubscriptions()
        .then((success) => {})
        .catch((err) => {});
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, [email]);
  return (
    <OverviewWrapper>
      <Helmet>
        <title>Unsubscribe from your Newsletters</title>
      </Helmet>
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="center" py={5} alignItems="center">
          <Logo />
        </Box>
        <Card sx={{ p: 10, mb: 10, borderRadius: 12 }}>
          <Hero />
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
                        <TableRow key={recipient.newsletterId}>
                          <TableCell>{recipient.name}</TableCell>
                          <TableCell align="center">
                            <Tooltip title="Delete Recipient" arrow>
                              <IconButton
                                size="small"
                                onClick={async () => {
                                  await destroyRecipient(
                                    recipient.recipientId,
                                    recipient.newsletterId
                                  );
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
      </Container>
    </OverviewWrapper>
  );
}

export default Overview;
