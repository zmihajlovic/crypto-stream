import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router";
import { OrdersPage } from "./feature-orders/OrdersPage";
import { Header } from "./feature-header/Header";
import { AlertsPage } from "./feature-alerts/AlertsPage";
import { ToastContainer } from "react-toastify";
import { CssBaseline, styled } from "@mui/material";
import { useCryptoStreaming } from "./hooks/useCryptoStreaming";

const Main = styled("main")(() => ({
  flex: 1,
  padding: "24px 16px 24px 16px",
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
      <ToastContainer position="bottom-right" />
    </>
  );
};

const AppShell = () => {
  useCryptoStreaming();

  return (
    <>
      <CssBaseline />
      <Header />
      <Main role="main">
        <Outlet />
      </Main>
    </>
  );
};
