import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Legacy | AI Intelligence Platform",
  description: "One intelligent workspace. Research, analysis, development, and agentic execution.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
