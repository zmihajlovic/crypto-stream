import { Box, styled, Typography } from "@mui/material";
import { orange, red, blue } from "@mui/material/colors";
import { useAppSelector } from "@crypto-stream/store";
import { Order } from "./Order";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { OrderColoredInformation } from "@crypto-stream/ui";

const ROW_HEIGHT = 90;

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

export const OrdersPage = () => {
  const orders = useAppSelector((store) => store.streamingSlice.orders);

  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => (
    <div className={index % 2 ? "ListItemOdd" : "ListItemEven"} style={style}>
      <Order order={orders[index]} />
    </div>
  );

  return (
    <OrdersBox>
      <Box mb={3} px={2}>
        <OrderColoredInformation
          infoText="Order is at a price below $50000."
          color={orange[500]}
          backgroundColor={orange[500]}
        />
        <OrderColoredInformation
          infoText="More than 10BTC is in the order."
          color={blue[500]}
          backgroundColor={blue[500]}
        />
        <OrderColoredInformation
          infoText="Order’s total value is over $1m."
          color={red["A400"]}
          backgroundColor={red["A400"]}
        />
      </Box>
      {orders.length ? (
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height - ROW_HEIGHT}
              itemCount={orders.length}
              itemSize={ROW_HEIGHT}
              width={width}
            >
              {Row}
            </List>
          )}
        </AutoSizer>
      ) : (
        <Typography px={2} color="var(--white)">
          No orders at the moment
        </Typography>
      )}
    </OrdersBox>
  );
};
