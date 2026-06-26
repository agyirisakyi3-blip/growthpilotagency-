import type { ReactNode } from "react";

export type Translations = {
  (key: string): string;
  rich?(key: string, params?: Record<string, unknown>): ReactNode;
};
