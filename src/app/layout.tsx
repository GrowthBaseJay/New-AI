// app/layout.tsx
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
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
