import type { Metadata } from "next";
import { Manrope, Syne } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Fogo na Seda — Tabacaria & Lazer",
  description:
    "Tudo da Fogo na Seda em um só lugar: tabacaria, cigarros eletrônicos 18+, perfumes árabes e espetinhos & bebidas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${manrope.variable} ${syne.variable} font-sans antialiased`}
      >
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
