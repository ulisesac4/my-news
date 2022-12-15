import { Helmet } from "react-helmet-async";

import PageTitleWrapper from "src/components/PageTitleWrapper";
import { Container, Grid } from "@mui/material";
import Footer from "src/components/Footer";
import PageHeader from "./PageHeader";
import Summary from "./summary";

function DashboardCrypto() {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12}>
            <Summary />
          </Grid>
          <Grid item lg={8} xs={12}></Grid>
          <Grid item lg={4} xs={12}></Grid>
          <Grid item xs={12}></Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default DashboardCrypto;
