"use client";
import Header from "@/components/Header/Header";
import AuthenticatePage from "./AuthenticatePage";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthenticatePage>{children}</AuthenticatePage>
    </>
  );
}
