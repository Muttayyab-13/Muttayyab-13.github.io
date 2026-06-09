// Shared accent → Tailwind text-color map.
// Class strings are written out in full so Tailwind's JIT can detect them
// (dynamic `text-${accent}` would be purged). Consumed by Work, Capabilities
// and About; per-component box / glow / shadow maps stay local since they differ.
export const accentText = {
  primary: "text-primary",
  secondary: "text-secondary",
  tertiary: "text-tertiary",
} as const;
