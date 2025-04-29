import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router";
import { OrdersPage } from "./feature-orders/OrdersPage";
import { Header } from "./header/Header";
import { Sidebar } from "./sidebar/Sidebar";
import { AlertsPage } from "./feature-alerts/AlertsPage";
import { ToastContainer } from "react-toastify";
import { Box, CssBaseline, styled } from "@mui/material";
import { useCryptoStreaming } from "./hooks/useCryptoStreaming";

const NOTIFICATION_DURATION = 3500;

const Main = styled("main")(() => ({
  flex: 1,
  padding: "24px 16px",
}));

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppShell />}>
            <Route path="/" element={<Navigate to="/alerts" />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/orders" element={<OrdersPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="bottom-right"
        autoClose={NOTIFICATION_DURATION}
      />
    </>
  );
};

const AppShell = () => {
  useCryptoStreaming();

  return (
    <>
      <CssBaseline />
      <Header />
      <Box
        sx={{
          display: "flex",
          height: "100%",
        }}
      >
        <aside>
          <Sidebar />
        </aside>
        <Main role="main">
          <Outlet />
        </Main>
      </Box>
    </>
  );
};
