import Certificate from '@/Components/Certificate/certificate';
import Footer from '@/Components/home/footer';
import Header from '@/Components/home/header';
import PageTitle from '@/Components/home/pageTitle';

export default function Home() {
  return (
    <div>
      <div className="container mx-auto">
        <Header />
        <div className="mx-auto h-full px-4 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8">
          <PageTitle content="Make way for more with our advanced Recruitment Assessment Platform." />
          landing page background Home
        </div>
        <Footer />
      </div>
    </div>
  );
}
