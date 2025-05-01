import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderMessage } from "@crypto-stream/utils";

export interface StreamingState {
  isStreaming: boolean;
  orders: OrderMessage[];
  alerts: OrderMessage[];
}

const initialState: StreamingState = {
  isStreaming: false,
  orders: [],
  alerts: [],
};

const MAX_STREAMING_ORDERS = 500;
const MILISECONDS_DIVIDER = 1_000_000;
const MILISECONDS_TIMESTAMP = 60_000;

/**
 * @description StreamingSlice of the app.
 */
export const streamingSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    stopStreaming: (state) => {
      state.isStreaming = false;
    },

    startStreaming: (state) => {
      state.isStreaming = true;
    },

    setOrders: (state, action: PayloadAction<OrderMessage>) => {
      state.orders = [action.payload, ...state.orders].slice(
        0,
        MAX_STREAMING_ORDERS
      );
    },

    setAlerts: (state, action: PayloadAction<OrderMessage>) => {
      const newAlert = action.payload;
      const oneMinuteAgo = Date.now() - MILISECONDS_TIMESTAMP;

      state.alerts = [newAlert, ...state.alerts].filter((alert) => {
        const alertTime = alert.reportedNs / MILISECONDS_DIVIDER;
        return alertTime >= oneMinuteAgo;
      });
    },
  },
});

export const { stopStreaming, startStreaming, setOrders, setAlerts } =
  streamingSlice.actions;

// // Get all alerts from the state
// const selectAlerts = (state: RootState) => state.streamingSlice.alerts;

// // Selector to filter alerts from the last 1 minute
// export const alertsSelector = createSelector([selectAlerts], (alerts) => {
//   const oneMinuteAgo = Date.now() - 60_000;

//   return alerts.filter((alert) => {
//     const receivedAt = alert.reportedNs / MILISECONDS_DIVIDER;
//     return receivedAt >= oneMinuteAgo;
//   });
// });
