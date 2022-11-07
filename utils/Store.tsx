import {createContext, Dispatch, ReactNode, useReducer} from "react";
import Cookies from "js-cookie";
export interface IProduct {
  _id: number;
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

export interface IShippingAddress {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface IState {
  cart: {
    cartItems: IProduct[];
    shippingAddress: IShippingAddress;
    paymentMethod: string;
  };
}
interface IAction {
  type: "CART_ADD_ITEM" | "CART_REMOVE_ITEM";
  payload: IProduct;
}
interface IAction2 {
  type: "CART_RESET" | "CART_CLEAR_ITEMS";
}

interface IAction3 {
  type: "SAVE_SHIPPING_ADDRESS";
  payload: IShippingAddress;
}

interface IAction4 {
  type: "SAVE_PAYMENT_METHOD";
  payload: string;
}

interface IStoreValue {
  state: IState;
  dispatch: Dispatch<IAction | IAction2 | IAction3 | IAction4>;
}
interface IStoreProvider {
  children: ReactNode;
}

const initialState: IState = {
  cart: Cookies.get("cart")
    ? JSON.parse(Cookies.get("cart") as string)
    : {
        cartItems: [],
        shippingAddress: {},
        paymentMethod: "",
      },
};

function reducer(
  state: IState,
  action: IAction | IAction2 | IAction3 | IAction4
) {
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
      Cookies.set("cart", JSON.stringify({cartItems}));
      return {
        ...state,
        cart: {...state.cart, cartItems},
      };
    }
    case "CART_REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter(
        (item) => item.slug !== action.payload.slug
      );
      Cookies.set("cart", JSON.stringify({cartItems}));
      return {
        ...state,
        cart: {...state.cart, cartItems},
      };
    }
    case "CART_RESET":
      return {
        ...state,
        cart: {
          cartItems: [],
          shippingAddress: {},
        },
      };
    case "CART_CLEAR_ITEMS":
      return {...state, cart: {...state.cart, cartItems: []}};
    case "SAVE_SHIPPING_ADDRESS":
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: {
            ...state.cart.shippingAddress,
            ...action.payload,
          },
        },
      };
    case "SAVE_PAYMENT_METHOD":
      return {
        ...state,
        cart: {
          ...state.cart,
          paymentMethod: action.payload,
        },
      };
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
