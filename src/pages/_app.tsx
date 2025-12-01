import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/context/AuthContext";
import { Noto_Sans_Thai } from "next/font/google";
import { NotificationProvider } from "@/context/NotificationContext";
import Notification from "@/components/Notification";

const notoSansThai = Noto_Sans_Thai({
  weight: ["400", "500", "600", "700"],
  subsets: ["thai", "latin"],
  variable: "--font-noto-sans-thai",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <AuthProvider>
        <NotificationProvider>
          <main className={`${notoSansThai.className} ${notoSansThai.variable}`}>
            <Notification />
            <Component {...pageProps} />
          </main>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
