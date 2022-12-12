import {
  TableContainer,
  useTheme,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { useEffect, useState } from "react";
import PageTemplate from "src/components/PageTemplate";
import {
  NewsletterApi,
  NewslettersDelete200Response,
  NewslettersDelete200ResponseNewslettersInner,
} from "src/core/API";

function Newsletters() {
  const [newsletters, setNewsletters] = useState<
    NewslettersDelete200ResponseNewslettersInner[]
  >([{ createdAt: "", id: 1, name: "", updatedAt: "" }]);
  const theme = useTheme();
  const NewslettersAPI = new NewsletterApi();

  const fetchNewsletters = async () => {
    try {
      const newsletters = await NewslettersAPI.newslettersGet();
      console.log("le appi", newsletters);
      if (newsletters.status === 200) {
        setNewsletters(newsletters.data.newsletters);
      } else {
        // error message here
      }
    } catch (error) {
      console.log("error", error);
    }
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
            {newsletters.map((newsletter) => {
              return (
                <TableRow key={newsletter.id}>
                  <TableCell>{newsletter.name}</TableCell>
                  <TableCell align="center">0</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </PageTemplate>
  );
}

export default Newsletters;
