"use client";
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

 

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any; 
}) {
  return (
    <html lang="en">
      <Head>
        <title>{'My Next App'}</title>
        <meta name="description" content="This is my Next.js application." />
      </Head>
      <body className={inter.className}>
       
        <SessionProvider session={session}>
        <Header />
          {children}
          <Footer />
        </SessionProvider>
      
      </body>
    </html>
  );
}
