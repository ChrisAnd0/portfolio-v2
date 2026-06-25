import { NextResponse } from "next/server";

const GITHUB_USERNAME = "ChrisAnd0";
const MAX_ITEMS = 6;

interface GithubEvent {
  id: string;
  type: string;
  created_at: string;
  repo: { name: string };
  payload: {
    commits?: unknown[];
    size?: number;
    action?: string;
    ref_type?: string;
  };
}

export interface ActivityItem {
  id: string;
  type: string;
  description: string;
  repo: string;
  url: string;
  createdAt: string;
}

function describeEvent(event: GithubEvent): string | null {
  switch (event.type) {
    case "PushEvent": {
      const count = event.payload.commits?.length ?? event.payload.size ?? 1;
      return `Pushed ${count} commit${count === 1 ? "" : "s"} to`;
    }
    case "PullRequestEvent":
      return event.payload.action === "opened"
        ? "Opened a pull request on"
        : null;
    case "CreateEvent":
      return event.payload.ref_type === "repository"
        ? "Created repository"
        : null;
    default:
      return null;
  }
}

export const revalidate = 3600;

export async function GET() {
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=30`,
    {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate },
    },
  );

  if (!res.ok) {
    return NextResponse.json({ items: [] satisfies ActivityItem[] });
  }

  const events: GithubEvent[] = await res.json();
  const items: ActivityItem[] = [];

  for (const event of events) {
    const description = describeEvent(event);
    if (!description) continue;

    items.push({
      id: event.id,
      type: event.type,
      description,
      repo: event.repo.name,
      url: `https://github.com/${event.repo.name}`,
      createdAt: event.created_at,
    });

    if (items.length >= MAX_ITEMS) break;
  }

  return NextResponse.json({ items });
}
