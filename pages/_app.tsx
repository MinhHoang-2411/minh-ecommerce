import "../styles/globals.css";
import type {AppProps} from "next/app";

import {StoreProvider} from "../utils/Store";
import {ReactNode} from "react";
import {SessionProvider, useSession} from "next-auth/react";
import {useRouter} from "next/router";

export default function App({
  Component,
  pageProps: {session, ...pageProps},
}: any) {
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        {Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </StoreProvider>
    </SessionProvider>
  );
}
function Auth({children}: {children: any}) {
  const router = useRouter();
  const {status} = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/unauthorized?message=login required");
    },
  });
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return children;
}
