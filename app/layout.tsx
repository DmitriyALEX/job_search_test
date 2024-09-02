import type { Metadata } from "next";
import { Sarala } from "next/font/google";
import "./globals.css";
import Header from './components/Header'
import getCurrentUser from "./actions/getCurrentUser";

const sarala = Sarala({subsets: ['latin'], weight: '400', style: 'normal'});

export const metadata: Metadata = {
  title: "jobs search",
  description: "test task",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const user = await getCurrentUser()
  return (
    <html lang="en">
      <body className={sarala.className}>
        <Header user={user}/>
        {children}</body>
    </html>
  );
}
