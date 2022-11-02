import {createContext, Dispatch, ReactNode, useReducer} from "react";

export interface IProduct {
  name: string;
  slug: string;
  category: string;
  image: string;
  price: number;
  brand: string;
  rating: number;
  numReviews: number;
  countInStock: number;
  description: string;
  quantity: number;
}

interface IState {
  cart: {cartItems: IProduct[]};
}
interface IAction {
  type: "CART_ADD_ITEM" | "CART_REMOVE_ITEM";
  payload: IProduct;
}
interface IStoreValue {
  state: IState;
  dispatch: Dispatch<IAction>;
}
interface IStoreProvider {
  children: ReactNode;
}

const initialState: IState = {
  cart: {cartItems: []},
};

function reducer(state: IState, action: IAction) {
  switch (action.type) {
    case "CART_ADD_ITEM": {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item.slug === newItem.slug
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      return {...state, cart: {cartItems}};
    }
    case "CART_REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter(
        (item) => item.slug !== action.payload.slug
      );
      return {...state, cart: {cartItems}};
    }
    default:
      return state;
  }
}

export const Store = createContext({} as IStoreValue);

export function StoreProvider({children}: IStoreProvider) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = {state, dispatch};
  return <Store.Provider value={value}>{children}</Store.Provider>;
}
