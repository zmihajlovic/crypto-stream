import { StreamMessage } from "@crypto-stream/hooks";

export type AlertMessage = "Cheap order" | "Solid order" | "Big biznis here";

export interface OrderMessage {
  price: number;
  quantity: number;
  total: number;
  alertMessage: AlertMessage | null;
  action: number;
  ccseq: number;
  delayNs: number;
  fsym: string;
  m: string;
  repotedNs: number;
  seq: number;
  side: number;
  tsym: string;
  type: string;
}

const PRICE_BOUNCE = 50000;
const QUANTITY_BOUNCE = 10;
const TOTAL_BOUNCE = 1000000;
export const CHEAP_ORDER = "Cheap order";
export const BIG_BIZNIS_HERE_ORDER = "Big biznis here";
export const SOLID_ORDER_ORDER = "Solid order";

const getAlertMessage = (price: number, quantity: number) => {
  const total = price * quantity;

  if (price < PRICE_BOUNCE) {
    return CHEAP_ORDER;
  }

  if (total > TOTAL_BOUNCE) {
    return BIG_BIZNIS_HERE_ORDER;
  }

  if (quantity > QUANTITY_BOUNCE) {
    return SOLID_ORDER_ORDER;
  }

  return null;
};

/**
 * @description format message from webSocket
 * @param message as StreamMessage
 * @returns
 */
export const formatMessage = (message: StreamMessage): OrderMessage => {
  return {
    price: message.P,
    quantity: message.Q,
    total: message.P * message.Q,
    alertMessage: getAlertMessage(message.P, message.Q),
    action: message.ACTION,
    ccseq: message.CCSEQ,
    delayNs: message.DELAYNS,
    fsym: message.FSYM,
    m: message.M,
    repotedNs: message.REPORTEDNS,
    seq: message.SEQ,
    side: message.SIDE,
    tsym: message.TSYM,
    type: message.TYPE,
  };
};
