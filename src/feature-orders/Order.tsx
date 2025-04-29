import { AlertMessage, OrderMessage } from "@crypto-stream/utils";
import { Box, Divider, styled } from "@mui/material";
import { lightGreen, purple, orange, red, blue } from "@mui/material/colors";

interface OrderProps {
  order: OrderMessage;
}

const colorMap: Record<AlertMessage, string> = {
  "Cheap order": orange[500],
  "Solid order": blue[500],
  "Big biznis here": red["A400"],
};

const OrderBox = styled("p")<{ alertMessage: AlertMessage | null }>(
  ({ alertMessage }) => ({
    color: alertMessage ? colorMap[alertMessage] : lightGreen["A400"],
    fontSize: "12px",
    wordWrap: "break-word",
    fontFamily: '"Fira Code", monospace',
  })
);

export const Order = ({ order }: OrderProps) => {
  const {
    price,
    action,
    ccseq,
    delayNs,
    fsym,
    m,
    quantity,
    repotedNs,
    seq,
    side,
    total,
    tsym,
    type,
  } = order;
  return (
    <Box px={2}>
      <OrderBox alertMessage={order.alertMessage}>
        {`Price: ${price} - Quantity: ${quantity} - Total: ${total} - Action: ${action} - CCSEQL: ${ccseq} - DelayNS: ${delayNs} - FSYM: ${fsym} - M: ${m} - ReportedNS ${repotedNs} - SEQ: ${seq} - Side: ${side}- TSYM: ${tsym} - Type: ${type}`}
      </OrderBox>
      <Divider sx={{ my: 2, borderColor: purple[500] }} />
    </Box>
  );
};
