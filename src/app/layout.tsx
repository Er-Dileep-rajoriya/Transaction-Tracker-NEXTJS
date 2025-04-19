import type { Metadata } from "next";
import "./globals.css";
import ThemeProviderComp from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar/Navbar";
import ReduxProvider from "@/components/ReduxProvider";
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: "Transaction Tracker",
  description: "Track your transactions efficiently.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ReduxProvider>
          <ThemeProviderComp> 
            <div className="min-h-screen">
              <Navbar />
              <div className="mt-15">{children}</div>
            </div>
            <Toaster />
          </ThemeProviderComp>
        </ReduxProvider>
      </body>
    </html>
  );
}
