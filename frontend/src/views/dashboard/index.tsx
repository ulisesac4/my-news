import { Helmet } from "react-helmet-async";

import PageTitleWrapper from "src/components/PageTitleWrapper";
import { Container, Grid } from "@mui/material";
import Footer from "src/components/Footer";
import PageHeader from "./PageHeader";
import Summary from "./summary";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import TendencyNewSubscribers from "./TendencyNewSubscribers";
import { useEffect, useState } from "react";
import { StatisticApi, StatisticsGet200ResponseData } from "src/core/API";

function DashboardCrypto() {
  const [data, setData] = useState<StatisticsGet200ResponseData>({});
  const [isLoading, setIsLoading] = useState(false);

  const StatisticsAPI = new StatisticApi();

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const data = await StatisticsAPI.statisticsGet();
      if (data.status === 200) {
        setData(data.data.data);
      } else {
        // error message here
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);
  console.log("le data1", data);
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
          <Grid item xs={12}>
            <TendencyNewSubscribers
              labels={data.weeks}
              data={data.entries}
              totalSubs={data.subscribers}
            />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default DashboardCrypto;
