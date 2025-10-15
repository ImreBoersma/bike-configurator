import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";
import NavigationHeader from "./components/Header";
import { ThemeProvider } from "./components/ThemeProvider";

const robotoSans = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bike configurator",
  description: "Configure your bike with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body
        suppressHydrationWarning
        className={`${robotoSans.variable} ${robotoMono.variable} antialiased`}
      >
        <div className="container mx-auto">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NavigationHeader />
            {children}
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
