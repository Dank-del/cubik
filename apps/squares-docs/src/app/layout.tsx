import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import { AxiomWebVitals } from 'next-axiom';

import { ClientCookiesProvider } from '../app/home-page-components/providers/cookies';

import './globals.css';
import '@cubik/presets/styles/style.css';
import '@cubik/presets/styles/lightColor.style.css';
import '@cubik/presets/styles/darkColors.styles.css';
import '@cubik/presets/styles/component.style.css';

import { Toaster } from 'sonner';

import Background from './home-page-components/components';
import Header from './home-page-components/header';
import Sidebar from './home-page-components/sidebar';
import { ThemeProvider } from './home-page-components/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="light" lang="en">
      <body className={`${inter.className}`}>
        <ClientCookiesProvider value={cookies().getAll()}>
          <ThemeProvider>
            <Background />
            <Header />
            <AxiomWebVitals />
            <div className="z-0 flex w-full flex-row bg-[var(--color-bg-secondary)] ">
              <Toaster />
              <Sidebar />
              {children}
            </div>
          </ThemeProvider>
        </ClientCookiesProvider>
      </body>
    </html>
  );
}
