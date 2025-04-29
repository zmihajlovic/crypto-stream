import { Box, styled, Typography } from "@mui/material";
import { orange, red, blue } from "@mui/material/colors";
import { useAppSelector } from "@crypto-stream/store";
import { Order } from "./Order";

const OrdersBox = styled(Box)(() => ({
  width: "100vw",
  height: "100vh",
  position: "absolute",
  top: 0,
  left: 0,
  backgroundColor: "var(--terminal-purple)",
  padding: "32px 0",
  display: "flex",
  flexDirection: "column",
}));

const InfoBox = styled("div")<{ color: string }>(({ color }) => ({
  marginTop: 0,
  marginBottom: "8px",
  color,
  display: "flex",
  alignItems: "center",
  padding: "0 16px",
}));

const InfoSign = styled("span")<{ color: string }>(({ color }) => ({
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
            return <Order order={order} key={order.ccseq}></Order>;
          })
        ) : (
          <Typography px={2} color={"var(--white)"}>
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
 * @description Colored information box
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
