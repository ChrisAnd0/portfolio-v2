"use client";

import { Badge, Card, Group, SimpleGrid, Text } from "@mantine/core";
import { motion, type Variants } from "framer-motion";
import { skillCategories } from "@/lib/skills-data";

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export function SkillsGrid() {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
      {skillCategories.map((category) => (
        <motion.div
          key={category.category}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={item}
        >
          <Card withBorder padding="lg" radius="md" h="100%">
            <Group gap="xs" mb="sm">
              <category.icon
                size={20}
                color="var(--mantine-color-violet-filled)"
              />
              <Text fw={600}>{category.category}</Text>
            </Group>
            <Group gap={6}>
              {category.skills.map((skill) => (
                <Badge key={skill} variant="light" radius="sm">
                  {skill}
                </Badge>
              ))}
            </Group>
          </Card>
        </motion.div>
      ))}
    </SimpleGrid>
  );
}
