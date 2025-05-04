import {
  NOTIFY_ERROR_MESSAGE,
  NOTIFY_INFO_MESSAGE,
  NOTIFY_SUCCESS_MESSAGE,
  ORDER_MESSAGE_TYPE,
  SUBSCRIPTION_ACTION,
  SUBSCRIPTION_TOPIC,
  useCryptoStreaming,
} from "@crypto-stream/hooks";
import { BIG_BIZNIS_HERE_ORDER, NotificationType } from "@crypto-stream/utils";
import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock dispatch
const dispatchMock = vi.fn();

// Mock message
const mockFormattedMessage = {
  alertMessage: BIG_BIZNIS_HERE_ORDER,
};

// Mock Redux hooks
vi.mock("../store/store", async () => {
  const actual = await vi.importActual<typeof import("@crypto-stream/store")>(
    "@crypto-stream/store"
  );
  return {
    ...actual,
    useAppDispatch: () => dispatchMock,
    useAppSelector: () => true, // Simulate isStreaming = true
  };
});

// Mock getNotification
const notifyMock = vi.fn();
vi.mock("@crypto-stream/utils", async () => {
  const actual = await vi.importActual<typeof import("@crypto-stream/utils")>(
    "@crypto-stream/utils"
  );
  return {
    ...actual,
    getFormatedMessage: vi.fn(() => mockFormattedMessage),
    getNotification: (type: NotificationType, message: string) =>
      notifyMock(type, message),
  };
});

// Mock WebSocket
let mockSocket: Partial<WebSocket>;
let onOpenHandler: (() => void) | null = null;
let onMessageHandler: ((event: MessageEvent) => void) | null = null;
let onCloseHandler: (() => void) | null = null;
let onErrorHandler: (() => void) | null = null;

beforeEach(() => {
  mockSocket = {
    send: vi.fn(),
    close: vi.fn(),
    set onopen(onOpenCallback: () => void) {
      onOpenHandler = onOpenCallback;
    },
    set onmessage(event: (value: MessageEvent) => void) {
      onMessageHandler = event;
    },
    set onerror(onErrorCallback: () => void) {
      onErrorHandler = onErrorCallback;
    },
    set onclose(onCloseCallback: () => void) {
      onCloseHandler = onCloseCallback;
    },
  };

  vi.stubGlobal(
    "WebSocket",
    vi.fn(() => mockSocket)
  );
});

/**
 * @description useCryptoStreaming hook tests
 */
describe("useCryptoStreaming hook tests", () => {
  it("should open webSocket connection, subscribe to topic and notify as success", async () => {
    renderHook(() => useCryptoStreaming());

    // Manually trigger the WebSocket `onopen` event
    act(() => {
      onOpenHandler?.();
    });

    // Check WebSocket subscription was sent
    expect(mockSocket.send).toHaveBeenCalledWith(
      JSON.stringify({
        action: SUBSCRIPTION_ACTION,
        subs: [SUBSCRIPTION_TOPIC],
      })
    );

    // Check if the toast is called with the success notification message
    expect(notifyMock).toHaveBeenCalledWith("success", NOTIFY_SUCCESS_MESSAGE);
  });

  it("should dispatch setOrders and setAlerts on receiving message", () => {
    renderHook(() => useCryptoStreaming());

    const rawMessage = JSON.stringify({
      TYPE: ORDER_MESSAGE_TYPE,
    });

    // Trigger onmessage handler with the raw message
    act(() => {
      onMessageHandler?.({ data: rawMessage } as MessageEvent);
    });

    expect(dispatchMock).toHaveBeenCalledWith(
      expect.objectContaining({
        type: expect.stringContaining("setOrders"),
        payload: expect.objectContaining(mockFormattedMessage),
      })
    );

    expect(dispatchMock).toHaveBeenCalledWith(
      expect.objectContaining({
        type: expect.stringContaining("setAlerts"),
        payload: expect.objectContaining(mockFormattedMessage),
      })
    );
  });

  it("should notify info when WebSocket closes", () => {
    renderHook(() => useCryptoStreaming());

    // Simulate WebSocket on close
    onCloseHandler?.();

    // Check if the toast is called with the info notification message
    expect(notifyMock).toHaveBeenCalledWith("info", NOTIFY_INFO_MESSAGE);
  });

  it("should notify error when WebSocket connection fails", () => {
    renderHook(() => useCryptoStreaming());

    // Simulate WebSocket error
    onErrorHandler?.();

    // Check if the toast is called with the error notification message
    expect(notifyMock).toHaveBeenCalledWith("error", NOTIFY_ERROR_MESSAGE);
  });
});
