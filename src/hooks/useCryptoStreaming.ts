import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useNotification } from "./useNotification";
import { setAlerts, setOrders } from "@crypto-stream/store";
import {
  BIG_BIZNIS_HERE_ORDER,
  CHEAP_ORDER,
  getFormatedMessage,
  SOLID_ORDER_ORDER,
} from "@crypto-stream/utils";

const STREAMING_API_KEY = import.meta.env.VITE_STREAMING_API_KEY;
const SOCKET_URL = "wss://streamer.cryptocompare.com/v2";
const SUBSCRIPTION_TOPIC = "8~Binance~BTC~USDT";
const SUBSCRIPTION_ACTION = "SubAdd";
const NOTIFY_ERROR_MESSAGE = "WebSocket connection failed.";
const NOTIFY_SUCCESS_MESSAGE = "Streaming has been started.";
const NOTIFY_INFO_MESSAGE = "Streaming has been stoped.";

export interface StreamMessage {
  ACTION: number;
  CCSEQ: number;
  DELAYNS: number;
  FSYM: string;
  M: string;
  P: number;
  Q: number;
  REPORTEDNS: number;
  SEQ: number;
  SIDE: number;
  TSYM: string;
  TYPE: string;
}

const ORDER_MESSAGE_TYPE = "8";

/**
 * @description Hook for app connection to webSocket.
 */
export const useCryptoStreaming = () => {
  const notify = useNotification();
  const isStreaming = useAppSelector(
    (state) => state.streamingSlice.isStreaming
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isStreaming) {
      return;
    }

    const socket = new WebSocket(`${SOCKET_URL}?api_key=${STREAMING_API_KEY}`);

    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          action: SUBSCRIPTION_ACTION,
          subs: [SUBSCRIPTION_TOPIC],
        })
      );
      notify("success", NOTIFY_SUCCESS_MESSAGE);
    };

    socket.onmessage = (event) => {
      const message: StreamMessage = JSON.parse(event.data);

      if (message.TYPE === ORDER_MESSAGE_TYPE) {
        const formattedMessage = getFormatedMessage(message);

        dispatch(setOrders(formattedMessage));

        const isAlertOrder =
          formattedMessage.alertMessage === CHEAP_ORDER ||
          formattedMessage.alertMessage === SOLID_ORDER_ORDER ||
          formattedMessage.alertMessage === BIG_BIZNIS_HERE_ORDER;

        if (isAlertOrder) {
          dispatch(setAlerts(formattedMessage));
        }
      }
    };

    socket.onerror = () => {
      notify("error", NOTIFY_ERROR_MESSAGE);
    };

    socket.onclose = () => {
      notify("info", NOTIFY_INFO_MESSAGE);
    };

    return () => {
      socket.close();
    };
  }, [dispatch, isStreaming, notify]);
};
