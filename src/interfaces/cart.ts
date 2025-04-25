import { currentCart } from "@wix/ecom";

export type cartInterface = currentCart.Cart;

export interface cartInterfaceUnknown extends cartInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
}

export type cartLineItemInterface = currentCart.LineItem;
