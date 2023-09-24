import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import RootClientLayout from "./client.layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Param FE Case",
  description: "Author MG",
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <RootClientLayout>{children}</RootClientLayout>
        </Providers>
      </body>
    </html>
  );
}

export default RootLayout;
