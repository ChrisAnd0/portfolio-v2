"use client";

import { useEffect, useState } from "react";
import { Anchor, Group, Skeleton, Stack, Text } from "@mantine/core";
import {
  IconFolderPlus,
  IconGitCommit,
  IconGitPullRequest,
  type Icon,
} from "@tabler/icons-react";
import type { ActivityItem } from "@/app/api/github-activity/route";

const iconForType: Record<string, Icon> = {
  PushEvent: IconGitCommit,
  PullRequestEvent: IconGitPullRequest,
  CreateEvent: IconFolderPlus,
};

function formatRelativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`;
  const years = Math.floor(months / 12);
  return `${years} year${years === 1 ? "" : "s"} ago`;
}

export function GithubActivityFeed() {
  const [items, setItems] = useState<ActivityItem[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/github-activity")
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json() as Promise<{ items: ActivityItem[] }>;
      })
      .then((data) => {
        if (!cancelled) setItems(data.items);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (failed) {
    return (
      <Text size="sm" c="dimmed">
        Couldn&apos;t load recent activity right now.
      </Text>
    );
  }

  if (!items) {
    return (
      <Stack gap="sm">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} height={20} radius="sm" />
        ))}
      </Stack>
    );
  }

  if (items.length === 0) {
    return (
      <Text size="sm" c="dimmed">
        No recent public activity.
      </Text>
    );
  }

  return (
    <Stack gap="sm">
      {items.map((item) => {
        const ItemIcon = iconForType[item.type] ?? IconGitCommit;
        return (
          <Group
            key={item.id}
            justify="space-between"
            align="flex-start"
            wrap="nowrap"
          >
            <Group gap="xs" align="flex-start" wrap="nowrap">
              <ItemIcon size={16} style={{ marginTop: 3, flexShrink: 0 }} />
              <Text size="sm">
                {item.description}{" "}
                <Anchor
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="sm"
                >
                  {item.repo}
                </Anchor>
              </Text>
            </Group>
            <Text size="xs" c="dimmed" style={{ flexShrink: 0 }}>
              {formatRelativeTime(item.createdAt)}
            </Text>
          </Group>
        );
      })}
    </Stack>
  );
}
