import {ReactNode} from "react";
import Head from "next/head";
import Link from "next/link";

type Props = {children: ReactNode; title?: String};

const Layout = ({children, title}: Props) => {
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
