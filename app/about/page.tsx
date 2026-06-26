import { Container, Stack, Text, Title } from "@mantine/core";
import type { Metadata } from "next";
import { CareerTimeline } from "@/components/about/CareerTimeline";
import { SkillsGrid } from "@/components/about/SkillsGrid";

const description =
  "Skills and career timeline for Chris Omahen, covering React, Mantine, and the tools behind them.";

export const metadata: Metadata = {
  title: "About",
  description,
  openGraph: {
    title: "About | Chris Omahen",
    description,
    images: "/opengraph-image",
  },
  twitter: {
    title: "About | Chris Omahen",
    description,
    images: "/opengraph-image",
  },
};

export default function AboutPage() {
  return (
    <Container size="md" py="xl">
      <Stack gap="xl">
        <Title order={1}>About</Title>

        <Text c="dimmed" maw={640}>
          I&apos;ve been a lifelong tech enthusiast, but it wasn&apos;t quite a
          straight path into this field — retail tech support, B2B sales, and a
          multidisciplinary RIT degree in design and interactive storytelling
          all came before I started writing code professionally. That mix is
          probably why I gravitate toward the parts of frontend work that blend
          logic and craft. Here&apos;s how it came together.
        </Text>

        <Stack gap="md">
          <Title order={2}>Skills</Title>
          <SkillsGrid />
        </Stack>

        <Stack gap="md">
          <Title order={2}>Career</Title>
          <CareerTimeline />
        </Stack>
      </Stack>
    </Container>
  );
}
