import "./globals.css"; // optional, only if you have global styles

export const metadata = {
  title: "GrowthBase",
  description: "GrowthBase AI App",
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
