import './globals.css';
import AuthProvider from './Providers';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
import { getServerSession } from 'next-auth';
import 'react-toastify/dist/ReactToastify.css';
import { AppProvider } from '@/context/AppProvider';
import { ToastContainer, toast } from 'react-toastify';
import Header from '@/Components/home/header';
import Footer from '@/Components/home/footer';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer />
        <AuthProvider session={session}>
          <AppProvider>{children} </AppProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
