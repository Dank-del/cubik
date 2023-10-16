import { Plus_Jakarta_Sans } from "next/font/google";
import Header from "@/app/components/layout/header";
import WalletContext from "@/app/components/wallet/context";
import { AuthProvider } from "./context/user";
import { Providers } from "./provider";
import "./globals.css";
const PlusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${PlusJakartaSans.className}`}>
        <button className="bg-red-400 p-3 text-2xl">asdf</button>
        <WalletContext>
          <AuthProvider>
            <Providers>
              {/* <Header /> */}
              {children}
            </Providers>
          </AuthProvider>
        </WalletContext>
      </body>
    </html>
  );
}
