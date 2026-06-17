"use client";

import {
  ActionIcon,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { useMounted } from "@mantine/hooks";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";

export function ThemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light");
  const mounted = useMounted();

  // Mantine reads localStorage synchronously on the client's first render to avoid a
  // theme flash, which differs from the server's default — gate on `mounted` so this
  // component's own output matches between server and first client render.
  const isDark = mounted && computedColorScheme === "dark";

  return (
    <ActionIcon
      variant="subtle"
      size="lg"
      aria-label="Toggle color scheme"
      onClick={() => setColorScheme(isDark ? "light" : "dark")}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.15 }}
          style={{ display: "flex" }}
        >
          {isDark ? <IconMoon size={18} /> : <IconSun size={18} />}
        </motion.span>
      </AnimatePresence>
    </ActionIcon>
  );
}
