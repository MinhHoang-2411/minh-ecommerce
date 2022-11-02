import {ReactNode, useContext} from "react";
import Head from "next/head";
import Link from "next/link";
import {Store} from "../utils/Store";

type Props = {children: ReactNode; title?: String};

const Layout = ({children, title}: Props) => {
  const {state} = useContext(Store);
  const {cart} = state;
  return (
    <>
      <Head>
        <title>{title ? `MinhShop- ${title}` : "MinhShop"}</title>
        <meta name="description" content="E-commerce" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-12 justify-between shadow-md items-center px-4">
            <Link href="/" className="text-lg font-bold">
              MinhShop
            </Link>
            <div className="flex">
              <Link href="/cart" className="p-2">
                Cart
                {cart.cartItems.length > 0 && (
                  <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </span>
                )}
              </Link>
              <Link href="/login" className="p-2">
                Login
              </Link>
            </div>
          </nav>
        </header>
        <main className="container m-auto px-4 mt-4">{children}</main>
        <footer className="flex h-10 items-center justify-center shadow-inner ">
          <p>Copyright © 2022 MinhShop</p>
        </footer>
      </div>
    </>
  );
};

export default Layout;
