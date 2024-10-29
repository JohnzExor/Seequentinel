import AuthDesign from "./auth-design";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthDesign>{children}</AuthDesign>
    </>
  );
}
