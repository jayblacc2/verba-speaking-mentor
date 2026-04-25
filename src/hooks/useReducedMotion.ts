import { useReducedMotion as useFramerReducedMotion } from "motion/react";

export function useReducedMotion(): boolean {
  return useFramerReducedMotion() ?? false;
}
