import {
  AlertMessage,
  getAlertColorMap,
  OrderMessage,
} from "@crypto-stream/utils";
import { Box, Divider, styled } from "@mui/material";
import { lightGreen, purple } from "@mui/material/colors";
import { useTranslation } from "react-i18next";

interface OrderProps {
  order: OrderMessage;
}

const OrderBox = styled("p")<{ alertMessage: AlertMessage | null }>(
  ({ alertMessage }) => ({
    color: alertMessage ? getAlertColorMap(alertMessage) : lightGreen["A400"],
    fontSize: "12px",
    wordWrap: "break-word",
    fontFamily: '"Fira Code", monospace',
  })
);

export const Order = ({ order }: OrderProps) => {
  const { t } = useTranslation();

  const {
    price,
    action,
    ccseq,
    delayNs,
    fsym,
    m,
    quantity,
    reportedNs,
    seq,
    side,
    total,
    tsym,
    type,
  } = order;

  const priceKeyword = t("price");
  const quantityKeyword = t("quantity");
  const totalKeyword = t("total");
  const actionKeyword = t("action");
  const typeKeyword = t("type");

  return (
    <Box px={2}>
      <OrderBox alertMessage={order.alertMessage}>
        {`${priceKeyword}: ${price} - ${quantityKeyword}: ${quantity} - ${totalKeyword}: ${total} - ${actionKeyword}: ${action} - CCSEQL: ${ccseq} - DelayNS: ${delayNs} - FSYM: ${fsym} - M: ${m} - ReportedNS ${reportedNs} - SEQ: ${seq} - Side: ${side} - TSYM: ${tsym} - ${typeKeyword}: ${type}`}
      </OrderBox>
      <Divider sx={{ my: 2, borderColor: purple[500] }} />
    </Box>
  );
};
