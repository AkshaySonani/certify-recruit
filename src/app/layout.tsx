import './globals.css';
import AuthProvider from './Providers';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
import { getServerSession } from 'next-auth';
import 'react-toastify/dist/ReactToastify.css';
import { AppProvider } from '@/context/AppProvider';
import { ToastContainer, toast } from 'react-toastify';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <noscript>
          <iframe
            style="display:none;visibility:hidden"
            src="https://www.googletagmanager.com/ns.html?id=GTM-M932G5QB"
            height="0"
            width="0"
          />
        </noscript>
        <ToastContainer />
        <AuthProvider session={session}>
          <AppProvider>{children} </AppProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
