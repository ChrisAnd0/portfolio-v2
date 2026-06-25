import { Anchor, Container, Stack, Text, Title } from "@mantine/core";
import { ContactForm } from "@/components/contact/ContactForm";

export default function ContactPage() {
  return (
    <Container size="xs" py="xl">
      <Stack gap="xl">
        <Stack gap="xs">
          <Title order={1}>Contact</Title>
          <Text c="dimmed">
            Have a role, a project, or just want to talk shop? Send a message
            below.
          </Text>
        </Stack>

        <ContactForm />

        <Text size="sm" c="dimmed" ta="center">
          Prefer email? Reach me directly at{" "}
          <Anchor href="mailto:me@chrisomahen.com">me@chrisomahen.com</Anchor>.
        </Text>
      </Stack>
    </Container>
  );
}
