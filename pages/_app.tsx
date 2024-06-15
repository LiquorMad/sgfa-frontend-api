import "@/styles/globals.css";
import "@/styles/sidebar.css";

import type { AppProps } from "next/app";
import { AuthProvider } from '@/context/AuthContext'

export default function App({ Component, pageProps }: AppProps) {
  
  return (
    <div>
      <AuthProvider>
          <Component {...pageProps} />
      </AuthProvider>
    </div>
  )
}