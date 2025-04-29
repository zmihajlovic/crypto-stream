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
 * Represents app connetiction to webSocket.
 */
export const useCryptoStreaming = () => {
  const notify = useNotification();
  const socketRef = useRef<WebSocket | null>(null);
  const isStreaming = useAppSelector(
    (state) => state.streamingSlice.isStreaming
  );
  const isStreamingStartedIntentionaly = useAppSelector(
    (state) => state.streamingSlice.isStreamingStartedIntentionaly
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

      if (!isStreamingStartedIntentionaly) {
        notify("info", "Streaming has been started!");
        return;
      }

      notify("success", "Streaming has been started again!");
    };

    socket.onmessage = (event) => {
      const message: StreamMessage = JSON.parse(event.data);

      if (message.TYPE === "8" && message.P && message.Q) {
        dispatch(setStreamingMessages(message));
      }
    };

    socket.onerror = () => {
      // use logs in development mode
    };

    socket.onclose = () => {
      // use logs in development mode
    };

    return () => {
      socket.close();
      notify("warning", "Streaming has been interrupted!");
    };
  }, [dispatch, isStreaming, isStreamingStartedIntentionaly, notify]);
};
