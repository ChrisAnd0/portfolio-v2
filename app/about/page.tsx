import { Container, Stack, Title } from "@mantine/core";
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
