import {
  Button,
  Card,
  Grid,
  Box,
  CardContent,
  Typography,
  Avatar,
  alpha,
  Tooltip,
  CardActionArea,
  styled,
  IconButton,
} from "@mui/material";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import ScheduleSend from "@mui/icons-material/ScheduleSend";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import SendAndArchive from "@mui/icons-material/SendAndArchive";
import SummaryCard from "./SummaryCard";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
      margin: ${theme.spacing(2, 0, 1, -0.5)};
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: ${theme.spacing(1)};
      padding: ${theme.spacing(0.5)};
      border-radius: 60px;
      height: ${theme.spacing(5.5)};
      width: ${theme.spacing(5.5)};
      background: ${
        theme.palette.mode === "dark"
          ? theme.colors.alpha.trueWhite[30]
          : alpha(theme.colors.alpha.black[100], 0.07)
      };
    
      img {
        background: ${theme.colors.alpha.trueWhite[100]};
        padding: ${theme.spacing(0.5)};
        display: block;
        border-radius: inherit;
        height: ${theme.spacing(4.5)};
        width: ${theme.spacing(4.5)};
      }
  `
);

const AvatarAddWrapper = styled(Avatar)(
  ({ theme }) => `
          background: ${theme.colors.alpha.black[10]};
          color: ${theme.colors.primary.main};
          width: ${theme.spacing(8)};
          height: ${theme.spacing(8)};
  `
);

const CardAddAction = styled(Card)(
  ({ theme }) => `
          border: ${theme.colors.primary.main} dashed 1px;
          height: 100%;
          color: ${theme.colors.primary.main};
          transition: ${theme.transitions.create(["all"])};
          
          .MuiCardActionArea-root {
            height: 100%;
            justify-content: center;
            align-items: center;
            display: flex;
          }
          
          .MuiTouchRipple-root {
            opacity: .2;
          }
          
          &:hover {
            border-color: ${theme.colors.alpha.black[70]};
          }
  `
);

function Summary({ sent, unsent, amountSent, amountunSent }) {
  console.log("x", sent, unsent);
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          pb: 3,
        }}
      >
        <Typography variant="h3">Summary</Typography>
      </Box>
      <Grid container spacing={3}>
        <SummaryCard
          icon={
            <IconButton aria-label="delete" size="large">
              <NotificationImportantIcon fontSize="inherit" />
            </IconButton>
          }
          quantity={amountSent}
          quantityContext="that have been sent"
          subtitle=""
          title="Total Issues"
        />

        <SummaryCard
          icon={
            <IconButton aria-label="delete" size="large">
              <SendAndArchive fontSize="inherit" />
            </IconButton>
          }
          quantity={sent["name"]}
          quantityContext={`On ${sent["date"]}`}
          subtitle=""
          title="The last sent Issue is"
        />

        <SummaryCard
          icon={
            <IconButton aria-label="delete" size="large">
              <NotificationImportantIcon fontSize="inherit" />
            </IconButton>
          }
          quantity={amountunSent}
          quantityContext="that haven't been sent"
          subtitle=""
          title="Total Issues"
        />

        <SummaryCard
          icon={
            <IconButton aria-label="delete" size="large">
              <ScheduleSend fontSize="inherit" />
            </IconButton>
          }
          quantity={unsent["name"]}
          quantityContext={`On ${unsent["date"]}`}
          subtitle=""
          title="The next Issue to be sent is"
        />
      </Grid>
    </>
  );
}

export default Summary;
