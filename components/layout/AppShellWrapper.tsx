"use client";

import { AppShell, Box } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { MotionConfig } from "framer-motion";
import { CommandPalette } from "./CommandPalette";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function AppShellWrapper({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <Notifications />
      <CommandPalette />
      <AppShell header={{ height: 64 }} padding="md">
        <AppShell.Header>
          <Header />
        </AppShell.Header>
        <AppShell.Main style={{ display: "flex", flexDirection: "column" }}>
          <Box style={{ flex: 1 }}>{children}</Box>
          <Footer />
        </AppShell.Main>
      </AppShell>
    </MotionConfig>
  );
}
