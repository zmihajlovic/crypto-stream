import { alertsSelector, useAppSelector } from "@crypto-stream/store";
import {
  BIG_BIZNIS_HERE_ORDER,
  CHEAP_ORDER,
  SOLID_ORDER_ORDER,
} from "@crypto-stream/utils";
import { Box, Typography } from "@mui/material";

export const AlertsPage = () => {
  const alerts = useAppSelector(alertsSelector);

  const cheapOrderAlerts = alerts.filter(
    (alert) => alert.alertMessage === CHEAP_ORDER
  );

  const solidOrderAlerts = alerts.filter(
    (alert) => alert.alertMessage === SOLID_ORDER_ORDER
  );

  const biznisOrderAlerts = alerts.filter(
    (alert) => alert.alertMessage === BIG_BIZNIS_HERE_ORDER
  );

  return (
    <>
      <Typography mb={4} variant="h4">
        Alerts
      </Typography>
      <Box display="flex" alignItems="center">
        <Typography mr={2}>
          Number of Cheap orders: {cheapOrderAlerts.length};
        </Typography>
        <Typography mr={2}>
          Number of Solid orders {solidOrderAlerts.length};
        </Typography>
        <Typography mr={2}>
          Number of Biznis orders: {biznisOrderAlerts.length};
        </Typography>
      </Box>
    </>
  );
};
