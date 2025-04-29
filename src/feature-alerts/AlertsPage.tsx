import { alertsSelector, useAppSelector } from "@crypto-stream/store";
import {
  BIG_BIZNIS_HERE_ALERT,
  CHEAP_ORDER_ALERT,
  SOLID_ORDER_ALERT,
} from "@crypto-stream/utils";
import { Typography } from "@mui/material";

export const AlertsPage = () => {
  const alerts = useAppSelector(alertsSelector);

  const cheapOrderAlers = alerts.filter(
    (alert) => alert.alertMessage === CHEAP_ORDER_ALERT
  );

  const solidOrderAlers = alerts.filter(
    (alert) => alert.alertMessage === SOLID_ORDER_ALERT
  );

  const biznisOrderAlert = alerts.filter(
    (alert) => alert.alertMessage === BIG_BIZNIS_HERE_ALERT
  );

  return (
    <>
      <Typography mb={4} variant="h5">
        Alerts
      </Typography>
      <Typography>Number of Cheap alerts: {cheapOrderAlers.length}</Typography>
      <Typography>Number of Solid alerts {solidOrderAlers.length}</Typography>
      <Typography>
        Number of Biznis alerts: {biznisOrderAlert.length}
      </Typography>
    </>
  );
};
