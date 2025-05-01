import { blue, orange, red } from "@mui/material/colors";
import { AlertMessage } from "./getFormatedMessage";

const alertColorMap: Record<AlertMessage, string> = {
  "Cheap order": orange[500],
  "Solid order": blue[500],
  "Big biznis here": red["A400"],
};

export const getAlertColorMap = (alertMessage: AlertMessage) => {
  return alertColorMap[alertMessage];
};
