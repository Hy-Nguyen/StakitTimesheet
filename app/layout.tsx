import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import LayoutWrapper from '@/components/layout/LayoutWrapper';
import NavBar from '@/components/layout/nav/NavBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NextJS Template - Hy Nguyen',
  description: 'NextJS Template - Hy Nguyen',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + ' bg-timesheet min-h-screen max-w-[100dvw] overflow-x-hidden'}>
        <NavBar />
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
