import { toast } from "react-toastify";

type NotificationType = "success" | "info" | "warning" | "error";

/**
 * Represents useNotification custom hook to access notify function
 * @returns notify function
 */
export const useNotification = () => {
  return (type: NotificationType, message: string) => {
    toast[type](message, { theme: "colored", hideProgressBar: true });
  };
};
