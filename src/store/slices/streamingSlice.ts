import { StreamMessage } from "@crypto-stream/hooks";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  BIG_BIZNIS_HERE_ALERT,
  CHEAP_ORDER_ALERT,
  formatMessage,
  OrdersMessage,
  SOLID_ORDER_ALERT,
} from "@crypto-stream/utils";

export interface StreamingState {
  isStreaming: boolean;
  isStreamingStartedIntentionaly: boolean;
  orders: OrdersMessage[];
  alerts: OrdersMessage[];
}

const initialState: StreamingState = {
  isStreaming: true,
  isStreamingStartedIntentionaly: false,
  orders: [],
  alerts: [],
};

const MAX_STREAMING_ORDERS = 500;

/**
 * Represents streamingSlice of the app.
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
      state.isStreamingStartedIntentionaly = true;
    },

    setStreamingMessages: (state, action: PayloadAction<StreamMessage>) => {
      const message = formatMessage(action.payload);

      state.orders = [message, ...state.orders].slice(0, MAX_STREAMING_ORDERS);

      const isAlertOrder =
        message.alertMessage === CHEAP_ORDER_ALERT ||
        message.alertMessage === SOLID_ORDER_ALERT ||
        message.alertMessage === BIG_BIZNIS_HERE_ALERT;
      if (isAlertOrder) {
        state.alerts = [message, ...state.alerts];
      }
    },
  },
});

export const { stopStreaming, startStreaming, setStreamingMessages } =
  streamingSlice.actions;

/**
 * Represents alerts selector from the store according to conditions
 */
export const alertsSelector = (state: RootState) => state.streamingSlice.alerts;
