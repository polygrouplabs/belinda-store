import { currentCart } from "@wix/ecom";

export interface cartInterface extends currentCart.Cart {
  [x: string]: unknown;
}
