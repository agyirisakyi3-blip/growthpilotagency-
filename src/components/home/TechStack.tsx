"use client";

import { motion } from "framer-motion";

const techs = [
  { name: "Next.js", icon: "N" },
  { name: "TypeScript", icon: "TS" },
  { name: "React", icon: "R" },
  { name: "Node.js", icon: "N" },
  { name: "Python", icon: "Py" },
  { name: "Tailwind", icon: "TW" },
  { name: "PostgreSQL", icon: "PG" },
  { name: "OpenAI", icon: "AI" },
];

export function TechStack() {
  return (
    <section className="py-12 border-b border-border bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest text-center mb-6">
          Powered by modern technology
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {techs.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="flex items-center gap-2 text-muted-foreground/60"
            >
              <span className="w-8 h-8 rounded-md bg-muted border border-border flex items-center justify-center text-xs font-bold text-muted-foreground/40">
                {tech.icon}
              </span>
              <span className="text-sm font-medium">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
