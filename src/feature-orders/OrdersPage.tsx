import { Box, Divider, styled, Typography } from "@mui/material";
import { lightGreen, orange, red, blue, purple } from "@mui/material/colors";
import { AlertMessage } from "@crypto-stream/utils";
import { useAppSelector } from "@crypto-stream/store";
import { Fragment } from "react";

const colorMap: Record<AlertMessage, string> = {
  "Cheap order": orange[500],
  "Solid order": blue[500],
  "Big biznis here": red["A400"],
};

const OrdersBox = styled(Box)(() => ({
  width: "100vw",
  height: "100vh",
  position: "absolute",
  top: 0,
  left: 0,
  backgroundColor: "var(--terminal-purple)",
  padding: "32px 16px",
  display: "flex",
  flexDirection: "column",
}));

const InfoBox = styled("div")(({ color }) => ({
  marginTop: 0,
  marginBottom: "8px",
  color: color,
  display: "flex",
  alignItems: "center",
}));

const InfoSign = styled("span")(({ color }) => ({
  width: "15px",
  height: "15px",
  backgroundColor: color,
  display: "block",
  marginRight: "12px",
}));

const InfoText = styled("p")(() => ({
  fontSize: "14px",
}));

export const OrdersPage = () => {
  const orders = useAppSelector((store) => store.streamingSlice.orders);

  return (
    <OrdersBox>
      <InformationBox
        infoText="Cheap order(order is at a price below $50000)."
        color={orange[500]}
      />
      <InformationBox
        infoText="Solid order(more than 10BTC is in the order)."
        color={blue[500]}
      />
      <InformationBox
        infoText="Big biznis here(order’s total value is over $1m)."
        color={red["A400"]}
      />
      <Box sx={{ mt: 4, overflowY: orders.length ? "scroll" : "auto" }}>
        {orders.length ? (
          orders.map((order) => {
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
              <Fragment key={order.ccseq}>
                <p
                  key={order.ccseq}
                  style={{
                    color: order.alertMessage
                      ? colorMap[order.alertMessage]
                      : lightGreen["A400"],
                    fontSize: "12px",
                    wordWrap: "break-word",
                    fontFamily: '"Fira Code", monospace',
                  }}
                >
                  {`Price: ${price} - Quantity: ${quantity} - Total: ${total} - Action: ${action} - CCSEQL: ${ccseq} - DelayNS: ${delayNs} - FSYM: ${fsym} - M: ${m} - ReportedNS ${repotedNs} - SEQ: ${seq} - Side: ${side}- TSYM: ${tsym} - Type: ${type}`}
                </p>
                <Divider sx={{ my: 2, borderColor: purple[500] }} />
              </Fragment>
            );
          })
        ) : (
          <Typography color={"var(--white)"}>
            No orders at the moment
          </Typography>
        )}
      </Box>
    </OrdersBox>
  );
};

interface InformationBoxProps {
  infoText: string;
  color: string;
}

/**
 * Represents colored information box
 * @param infoText as string, color as string
 * @returns InformationBox
 */
const InformationBox = ({ infoText, color }: InformationBoxProps) => {
  return (
    <InfoBox color={color}>
      <InfoSign color={color} />
      <InfoText>{infoText}</InfoText>
    </InfoBox>
  );
};
