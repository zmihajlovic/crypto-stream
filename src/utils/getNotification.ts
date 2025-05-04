import { toast } from "react-toastify";

export type NotificationType = "success" | "info" | "warning" | "error";

/**
 * @description Function to access notify function
 */
export const getNotification = (type: NotificationType, message: string) => {
  return toast[type](message, { theme: "colored", hideProgressBar: true });
};
