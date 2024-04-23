// "use client";
// import { SessionProvider } from "next-auth/react";
// export default function AuthProvider({
//   Component,
//   pageProps: { session, ...pageProps },
// }) {
//   return (
//     <SessionProvider session={session}>
//       <Component {...pageProps} />
//     </SessionProvider>
//   );
// }

"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";

const AuthProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
