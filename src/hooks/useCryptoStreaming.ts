import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useNotification } from "./useNotification";
import { setStreamingMessages } from "@crypto-stream/store";

const STREAMING_API_KEY = import.meta.env.VITE_STREAMING_API_KEY;
const SOCKET_URL = "wss://streamer.cryptocompare.com/v2";
const SUBSCRIPTION = "8~Binance~BTC~USDT";

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
    if (!isStreaming) return;

    const socket = new WebSocket(`${SOCKET_URL}?api_key=${STREAMING_API_KEY}`);
    socketRef.current = socket;

    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          action: "SubAdd",
          subs: [SUBSCRIPTION],
        })
      );
      notify("success", "Streaming has been started.");
    };

    socket.onmessage = (event) => {
      const message: StreamMessage = JSON.parse(event.data);

      if (message.TYPE === "8") {
        dispatch(setStreamingMessages(message));
      }
    };

    socket.onerror = () => {
      notify("error", "WebSocket connection failed.");
    };

    socket.onclose = () => {
      notify("info", "Streaming has been interrupted.");
    };

    return () => {
      socket.close();
    };
  }, [dispatch, isStreaming, notify]);
};
