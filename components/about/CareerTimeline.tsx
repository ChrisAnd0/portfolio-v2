"use client";

import { Stack, Text, Timeline, Title } from "@mantine/core";
import { motion, type Variants } from "framer-motion";
import { careerTimeline } from "@/lib/timeline-data";

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export function CareerTimeline() {
  return (
    <Timeline bulletSize={28} lineWidth={2}>
      {careerTimeline.map((entry) => (
        <Timeline.Item
          key={`${entry.org}-${entry.period}`}
          bullet={<entry.icon size={16} />}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={item}
          >
            <Title order={4}>{entry.role}</Title>
            <Text size="sm" c="dimmed">
              {entry.org} · {entry.period}
              {entry.location ? ` · ${entry.location}` : ""}
            </Text>
            <Stack gap={4} mt="xs">
              {entry.bullets.map((bullet) => (
                <Text key={bullet} size="sm">
                  {bullet}
                </Text>
              ))}
            </Stack>
          </motion.div>
        </Timeline.Item>
      ))}
    </Timeline>
  );
}
