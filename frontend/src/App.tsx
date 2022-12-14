import { useRoutes } from "react-router-dom";
import router from "src/router";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";

import { CssBaseline } from "@mui/material";
import { ToastContainer } from "react-toastify";
import ThemeProvider from "./theme/ThemeProvider";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const content = useRoutes(router);

  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {content}
      </LocalizationProvider>
    </ThemeProvider>
  );
}
export default App;
