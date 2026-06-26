import { NextResponse } from "next/server";

const GITHUB_USERNAME = "ChrisAnd0";
const MAX_ITEMS = 6;
const MAX_DETAIL_LENGTH = 80;

interface GithubEvent {
  id: string;
  type: string;
  created_at: string;
  repo: { name: string };
  payload: {
    head?: string;
    before?: string;
    action?: string;
    ref_type?: string;
    pull_request?: { title: string; html_url: string };
  };
}

export interface ActivityItem {
  id: string;
  type: string;
  description: string;
  detail?: string;
  detailUrl?: string;
  repo: string;
  url: string;
  createdAt: string;
}

interface DescribedEvent {
  description: string;
  detail?: string;
  detailUrl?: string;
}

interface CompareResponse {
  total_commits: number;
  commits: { commit: { message: string }; html_url: string }[];
}

function firstLine(message: string): string {
  const line = message.split("\n")[0].trim();
  return line.length > MAX_DETAIL_LENGTH
    ? `${line.slice(0, MAX_DETAIL_LENGTH - 3)}...`
    : line;
}

// The public events API only gives `before`/`head` SHAs for PushEvent (no
// commit messages or even an accurate count), so the real commit detail has
// to come from a separate compare-range call.
async function describePush(
  repo: string,
  before: string,
  head: string,
): Promise<DescribedEvent> {
  const fallback: DescribedEvent = { description: "Pushed to" };
  try {
    const res = await fetch(
      `https://api.github.com/repos/${repo}/compare/${before}...${head}`,
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate },
      },
    );
    if (!res.ok) return fallback;

    const compare: CompareResponse = await res.json();
    const count = compare.total_commits || compare.commits.length || 1;
    const latest = compare.commits[compare.commits.length - 1];
    const description = `Pushed ${count} commit${count === 1 ? "" : "s"} to`;
    if (!latest) return { description };

    return {
      description,
      detail:
        count > 1
          ? `${firstLine(latest.commit.message)} (+${count - 1} more)`
          : firstLine(latest.commit.message),
      detailUrl: latest.html_url,
    };
  } catch {
    return fallback;
  }
}

function describeOther(event: GithubEvent): DescribedEvent | null {
  switch (event.type) {
    case "PullRequestEvent":
      if (event.payload.action !== "opened") return null;
      return {
        description: "Opened a pull request on",
        detail: event.payload.pull_request?.title,
        detailUrl: event.payload.pull_request?.html_url,
      };
    case "CreateEvent":
      return event.payload.ref_type === "repository"
        ? { description: "Created repository" }
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
  const pendingPushes: { index: number; before: string; head: string }[] = [];

  for (const event of events) {
    if (items.length >= MAX_ITEMS) break;

    if (event.type === "PushEvent") {
      if (!event.payload.before || !event.payload.head) continue;

      pendingPushes.push({
        index: items.length,
        before: event.payload.before,
        head: event.payload.head,
      });
      items.push({
        id: event.id,
        type: event.type,
        description: "Pushed to",
        repo: event.repo.name,
        url: `https://github.com/${event.repo.name}`,
        createdAt: event.created_at,
      });
      continue;
    }

    const described = describeOther(event);
    if (!described) continue;

    items.push({
      id: event.id,
      type: event.type,
      description: described.description,
      detail: described.detail,
      detailUrl: described.detailUrl,
      repo: event.repo.name,
      url: `https://github.com/${event.repo.name}`,
      createdAt: event.created_at,
    });
  }

  await Promise.all(
    pendingPushes.map(async ({ index, before, head }) => {
      const described = await describePush(items[index].repo, before, head);
      items[index] = { ...items[index], ...described };
    }),
  );

  return NextResponse.json({ items });
}
