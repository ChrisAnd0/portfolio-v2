"use client";

import { Button, Group, Modal, Stack, Text } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { BulletHellCanvas } from "./BulletHellCanvas";
import { useBulletHellGame } from "./use-bullet-hell-game";

interface BulletHellOverlayProps {
  opened: boolean;
  onClose: () => void;
}

function formatTime(ms: number) {
  return `${(ms / 1000).toFixed(1)}s`;
}

function formatGrazeScore(ms: number) {
  return Math.round(ms / 100).toString();
}

export function BulletHellOverlay({ opened, onClose }: BulletHellOverlayProps) {
  const game = useBulletHellGame(opened);

  return (
    <Modal.Root opened={opened} onClose={onClose} fullScreen padding={0}>
      <Modal.Overlay />
      <Modal.Content aria-label="Bullet hell mini-game">
        <Modal.Body
          style={{ height: "100dvh", position: "relative", overflow: "hidden" }}
        >
          <BulletHellCanvas game={game} />

          <Group
            justify="space-between"
            align="center"
            p="md"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              pointerEvents: "none",
            }}
          >
            <Stack gap={2} style={{ pointerEvents: "auto" }}>
              <Group gap="xs">
                <Text c="white" fw={600} ff="monospace">
                  {formatTime(game.elapsedMs)}
                </Text>
                <Text c="gray.5" size="sm" ff="monospace">
                  Best {formatTime(game.bestMs)}
                </Text>
              </Group>
              <Group gap="xs">
                <Text c="white" size="sm" ff="monospace">
                  Graze {formatGrazeScore(game.grazeMs)}
                </Text>
                <Text c="gray.5" size="xs" ff="monospace">
                  Best {formatGrazeScore(game.bestGrazeMs)}
                </Text>
              </Group>
            </Stack>
            <Button
              variant="subtle"
              color="gray.4"
              c="white"
              size="sm"
              onClick={onClose}
              leftSection={<IconX size={16} />}
              style={{ pointerEvents: "auto" }}
            >
              Close
            </Button>
          </Group>

          <Text
            c="gray.5"
            size="xs"
            ta="center"
            style={{
              position: "absolute",
              bottom: 12,
              left: 0,
              right: 0,
              pointerEvents: "none",
            }}
          >
            Arrow keys or WASD — dodge the bullets
          </Text>

          {game.status === "gameOver" && (
            <Stack
              align="center"
              justify="center"
              gap="xs"
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "rgba(0, 0, 0, 0.55)",
              }}
            >
              <Text c="white" fw={700} size="xl">
                Hit!
              </Text>
              <Group gap="xl" justify="center" mt="xs">
                <Stack gap={0} align="center">
                  <Text c="gray.5" size="xs" tt="uppercase">
                    Survived
                  </Text>
                  <Text c="white" fw={600} size="lg" ff="monospace">
                    {formatTime(game.elapsedMs)}
                  </Text>
                  <Text c="gray.5" size="sm" ff="monospace">
                    Best {formatTime(game.bestMs)}
                  </Text>
                </Stack>
                <Stack gap={0} align="center">
                  <Text c="gray.5" size="xs" tt="uppercase">
                    Graze
                  </Text>
                  <Text c="white" fw={600} size="lg" ff="monospace">
                    {formatGrazeScore(game.grazeMs)}
                  </Text>
                  <Text c="gray.5" size="sm" ff="monospace">
                    Best {formatGrazeScore(game.bestGrazeMs)}
                  </Text>
                </Stack>
              </Group>
              <Group mt="sm">
                <Button onClick={game.restart}>Try again</Button>
                <Button
                  variant="default"
                  onClick={() => {
                    game.restart();
                    onClose();
                  }}
                >
                  Close
                </Button>
              </Group>
            </Stack>
          )}
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}
