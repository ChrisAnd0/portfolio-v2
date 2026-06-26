import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/spotlight/styles.css";
import "@mantine/notifications/styles.css";
import "./globals.css";
import { theme } from "@/lib/theme";
import { AppShellWrapper } from "@/components/layout/AppShellWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteDescription =
  "Portfolio of Chris Omahen, a software engineer with three years of professional React and Mantine experience.";

export const metadata: Metadata = {
  metadataBase: new URL("https://chrisomahen.com"),
  title: {
    default: "Chris Omahen - Software Engineer",
    template: "%s | Chris Omahen",
  },
  description: siteDescription,
  authors: [{ name: "Chris Omahen", url: "https://chrisomahen.com" }],
  keywords: [
    "Chris Omahen",
    "Software Engineer",
    "React",
    "Mantine",
    "Next.js",
    "TypeScript",
  ],
  openGraph: {
    title: "Chris Omahen - Software Engineer",
    description: siteDescription,
    url: "/",
    siteName: "Chris Omahen",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chris Omahen - Software Engineer",
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="auto">
          <AppShellWrapper>{children}</AppShellWrapper>
        </MantineProvider>
      </body>
    </html>
  );
}
