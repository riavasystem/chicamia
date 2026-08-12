import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Evita que `next dev` reescriba/anexe reglas en nuestro CLAUDE.md (spec propia del proyecto).
  agentRules: false,
};

export default nextConfig;
