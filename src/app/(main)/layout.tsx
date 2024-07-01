'use client';
import Header from '@/Components/home/header';
import Footer from '@/Components/home/footer';

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="dm-sans">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
