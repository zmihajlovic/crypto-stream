import { StreamMessage } from "@crypto-stream/hooks";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  BIG_BIZNIS_HERE_ORDER,
  CHEAP_ORDER,
  formatMessage,
  OrderMessage,
  SOLID_ORDER_ORDER,
} from "@crypto-stream/utils";

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

    setStreamingMessages: (state, action: PayloadAction<StreamMessage>) => {
      const message = formatMessage(action.payload);

      state.orders = [message, ...state.orders].slice(0, MAX_STREAMING_ORDERS);

      const isAlertOrder =
        message.alertMessage === CHEAP_ORDER ||
        message.alertMessage === SOLID_ORDER_ORDER ||
        message.alertMessage === BIG_BIZNIS_HERE_ORDER;

      if (isAlertOrder) {
        state.alerts = [message, ...state.alerts];
      }
    },
  },
});

export const { stopStreaming, startStreaming, setStreamingMessages } =
  streamingSlice.actions;

/**
 * @description Alerts selector from the store according to conditions
 */
export const alertsSelector = (state: RootState) => state.streamingSlice.alerts;
