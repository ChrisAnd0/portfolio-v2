import { Container, Stack, Title } from "@mantine/core";
import { CareerTimeline } from "@/components/about/CareerTimeline";
import { SkillsGrid } from "@/components/about/SkillsGrid";

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
