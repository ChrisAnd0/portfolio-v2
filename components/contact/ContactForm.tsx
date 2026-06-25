"use client";

import { Button, Stack, TextInput, Textarea } from "@mantine/core";
import { schemaResolver, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { contactSchema, type ContactFormValues } from "@/lib/validation";

const initialValues: ContactFormValues = { name: "", email: "", message: "" };

export function ContactForm() {
  const form = useForm<ContactFormValues>({
    initialValues,
    validate: schemaResolver(contactSchema, { sync: true }),
  });

  const handleSubmit = async (values: ContactFormValues) => {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      notifications.show({
        color: "red",
        title: "Couldn't send message",
        message: "Something went wrong — try again, or email me directly.",
        position: "top-right",
      });
      return;
    }

    notifications.show({
      color: "green",
      title: "Message sent",
      message: "Thanks for reaching out — I'll get back to you soon.",
      position: "top-right",
    });
    form.reset();
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="md">
        <TextInput
          label="Name"
          placeholder="Your name"
          required
          {...form.getInputProps("name")}
        />
        <TextInput
          label="Email"
          placeholder="you@example.com"
          required
          {...form.getInputProps("email")}
        />
        <Textarea
          label="Message"
          placeholder="What's on your mind?"
          minRows={4}
          required
          {...form.getInputProps("message")}
        />
        <Button type="submit" loading={form.submitting}>
          Send Message
        </Button>
      </Stack>
    </form>
  );
}
