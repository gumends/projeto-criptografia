import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Stack } from "@mui/joy";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <Stack sx={{ bgcolor: "neutral.outlinedDisabledBorder", width: '100vw', transition: 'all 0.4s' }}>
          {children}
        </Stack>
      </body>

    </html>
  );
}
