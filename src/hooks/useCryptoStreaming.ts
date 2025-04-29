import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useNotification } from "./useNotification";
import { setStreamingMessages } from "@crypto-stream/store";

const STREAMING_API_KEY = import.meta.env.VITE_STREAMING_API_KEY;
const SOCKET_URL = "wss://streamer.cryptocompare.com/v2";
const SUBSCRIPTION_TOPIC = "8~Binance~BTC~USDT";
const SUBSCRIPTION_ACTION = "SubAdd";
const NOTIFY_ERROR_MESSAGE = "WebSocket connection failed.";
const NOTIFY_SUCCESS_MESSAGE = "Streaming has been started.";
const NOTIFY_INFO_MESSAGE = "Streaming has been interrupted.";

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
  const socketRef = useRef<WebSocket | null>(null);
  const isStreaming = useAppSelector(
    (state) => state.streamingSlice.isStreaming
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isStreaming) {
      return;
    }

    const socket = new WebSocket(`${SOCKET_URL}?api_key=${STREAMING_API_KEY}`);
    socketRef.current = socket;

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
        dispatch(setStreamingMessages(message));
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
