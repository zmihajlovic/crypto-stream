import { alertsSelector, useAppSelector } from "@crypto-stream/store";
import {
  BIG_BIZNIS_HERE_ORDER,
  CHEAP_ORDER,
  SOLID_ORDER_ORDER,
} from "@crypto-stream/utils";
import { Typography } from "@mui/material";

export const AlertsPage = () => {
  const alerts = useAppSelector(alertsSelector);

  const cheapOrderAlerts = [];
  const solidOrderAlerts = [];
  const biznisOrderAlerts = [];

  alerts.forEach((alert) => {
    switch (alert.alertMessage) {
      case CHEAP_ORDER:
        cheapOrderAlerts.push(alert);
        break;
      case SOLID_ORDER_ORDER:
        solidOrderAlerts.push(alert);
        break;
      case BIG_BIZNIS_HERE_ORDER:
        biznisOrderAlerts.push(alert);
        break;
    }
  });

  return (
    <>
      <Typography mb={4} variant="h4">
        Alerts
      </Typography>
      <Typography mr={2}>
        Number of Cheap orders: {cheapOrderAlerts.length};
      </Typography>
      <Typography mr={2}>
        Number of Solid orders {solidOrderAlerts.length};
      </Typography>
      <Typography mr={2}>
        Number of Biznis orders: {biznisOrderAlerts.length};
      </Typography>
    </>
  );
};
