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
