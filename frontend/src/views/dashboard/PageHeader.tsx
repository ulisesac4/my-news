import { Typography, Avatar, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function PageHeader() {
  const user = {
    name: "John Doe",
  };

  return (
    <Grid container alignItems="center">
      <Grid item></Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Welcome, {user.name}!
        </Typography>
        <Typography variant="subtitle2">
          Check the summary of your newsletters!
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
