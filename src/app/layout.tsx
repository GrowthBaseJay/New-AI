// src/app/layout.tsx
import './globals.css'; // or wherever your global styles live
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GrowthBase',
  description: 'AI Copilot',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
