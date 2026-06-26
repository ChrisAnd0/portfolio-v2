import { Anchor, Container, Stack, Text, Title } from "@mantine/core";
import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";

const description = "Get in touch with Chris Omahen about a role or project.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  openGraph: {
    title: "Contact | Chris Omahen",
    description,
    images: "/opengraph-image",
  },
  twitter: {
    title: "Contact | Chris Omahen",
    description,
    images: "/opengraph-image",
  },
};

export default function ContactPage() {
  return (
    <Container size="md" py="xl">
      <Stack gap="xs" mb={20}>
        <Title order={1}>Contact</Title>
        <Text c="dimmed">
          Have a role, a project, or just want to chat? Send a message below.
        </Text>
      </Stack>

      <Stack gap="xl" maw={580} mx="auto">
        <ContactForm />

        <Text size="sm" c="dimmed" ta="center">
          Prefer email? Reach me directly at{" "}
          <Anchor href="mailto:me@chrisomahen.com">me@chrisomahen.com</Anchor>.
        </Text>
      </Stack>
    </Container>
  );
}
