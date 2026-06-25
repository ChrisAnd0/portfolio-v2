"use client";

import { useState } from "react";
import {
  ActionIcon,
  Button,
  Container,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconDownload, IconUfo } from "@tabler/icons-react";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { BulletHellOverlay } from "./bullet-hell/BulletHellOverlay";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export function Hero() {
  const [gameOpened, setGameOpened] = useState(false);
  const isCoarsePointer = useMediaQuery("(pointer: coarse)", false);

  return (
    <>
      <Container size="md" h="100%">
        <motion.div initial="hidden" animate="visible" variants={container}>
          <Stack
            h="100%"
            justify="center"
            align="center"
            gap="md"
            ta="center"
            py="xl"
          >
            <motion.div variants={item}>
              <Text fw={600} c="violet" size="sm" tt="uppercase">
                Software Engineer
              </Text>
            </motion.div>

            <motion.div variants={item}>
              <Title order={1} fz={{ base: 36, sm: 48 }}>
                Chris Omahen
              </Title>
            </motion.div>

            <motion.div variants={item}>
              <Text size="lg" c="dimmed" maw={480}>
                I build interfaces that feel as good as they work.
              </Text>
            </motion.div>

            <motion.div variants={item}>
              <Group gap={6} justify="center" wrap="nowrap">
                <Text maw={520}>
                  Three years deep in React and Mantine, with a habit of poking
                  at whatever&apos;s new. This site&apos;s interactive bits —
                  the command palette, this sentence — are the portfolio.
                </Text>
                {!isCoarsePointer && (
                  <ActionIcon
                    variant="subtle"
                    color="gray"
                    size="sm"
                    aria-label="There's something here"
                    onClick={() => setGameOpened(true)}
                  >
                    <IconUfo size={16} />
                  </ActionIcon>
                )}
              </Group>
            </motion.div>

            <motion.div variants={item}>
              <Group gap="sm" mt="sm" justify="center">
                <Button component={Link} href="/projects">
                  View Projects
                </Button>
                <Button
                  component="a"
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="default"
                  leftSection={<IconDownload size={16} />}
                >
                  Resume
                </Button>
                <Button component={Link} href="/contact" variant="subtle">
                  Get in Touch
                </Button>
              </Group>
            </motion.div>
          </Stack>
        </motion.div>
      </Container>

      <BulletHellOverlay
        opened={gameOpened}
        onClose={() => setGameOpened(false)}
      />
    </>
  );
}
