import { Helmet } from "react-helmet-async";
import PageHeader from "./PageHeader";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { Grid, Container } from "@mui/material";
import Footer from "src/components/Footer";

function PageTemplate({
  children,
  headerActionName,
  headerAction,
  headerDescription,
  headerTitle,
  pageTitle,
}) {
  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader
          headerActionName={headerActionName}
          headerDescription={headerDescription}
          headerTitle={headerTitle}
          headerAction={headerAction}
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            {children}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default PageTemplate;
