import type { Metadata } from "next";
import { ThemeProvider } from "../components/ui/theme-provider"
import "./globals.css";

export const metadata: Metadata = {
  title: "Play Games",
  description: "Build by Thiago Brito",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange >
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
