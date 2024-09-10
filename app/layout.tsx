import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
const inter = Inter({ subsets: ['latin'] });
import { Toaster } from 'sonner';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Nightwave',
  description: 'Highly customizable rss aggregator',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Navbar />
          {children}
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
