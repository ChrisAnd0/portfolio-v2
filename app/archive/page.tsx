import { Container, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { archiveItems } from "@/lib/archive-data";

export default function ArchivePage() {
  return (
    <Container size="md" py="xl">
      <Stack gap="xl">
        <Stack gap="xs">
          <Title order={1}>Archive</Title>
          <Text c="dimmed">
            Old projects from school and earlier years, kept around as-is for
            the sake of history. These won&apos;t be updated or redesigned —
            what you see is what shipped at the time.
          </Text>
        </Stack>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
          {archiveItems.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
