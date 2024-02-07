import "@/app/globals.css";
import AppProvider from "@/context/AppProvider";
import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={cn(
          "w-full min-h-screen font-sans antialiased flex flex-col",
          fontSans.variable
        )}
      >
        <AppProvider>
          <main className="bg-background flex flex-col flex-grow">
            {children}
          </main>
        </AppProvider>
      </body>
    </html>
  );
}
