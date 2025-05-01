import { useAppSelector } from "@crypto-stream/store";
import {
  BIG_BIZNIS_HERE_ORDER,
  CHEAP_ORDER,
  SOLID_ORDER_ORDER,
} from "@crypto-stream/utils";
import { Box } from "@mui/material";
import { AlertsTable } from "./AlertsTable";
import { blue, orange, red } from "@mui/material/colors";
import { OrderColoredInformation } from "@crypto-stream/ui";
import { useTranslation } from "react-i18next";

/**
 *
 * @description Alerts Page
 */
export const AlertsPage = () => {
  const alerts = useAppSelector((state) => state.streamingSlice.alerts);
  const { t } = useTranslation();

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
      <Box mb={4}>
        <OrderColoredInformation
          infoText={t("cheapOrderCount", { count: cheapOrderAlerts.length })}
          backgroundColor={orange[500]}
        />
        <OrderColoredInformation
          infoText={t("solidOrderCount", { count: solidOrderAlerts.length })}
          backgroundColor={blue[500]}
        />
        <OrderColoredInformation
          infoText={t("bigBiznisOrderCount", {
            count: biznisOrderAlerts.length,
          })}
          backgroundColor={red["A400"]}
        />
      </Box>
      <AlertsTable alerts={alerts} />
    </>
  );
};
