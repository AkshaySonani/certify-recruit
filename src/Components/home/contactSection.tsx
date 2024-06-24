'use client';
import Image from 'next/image';

const ContactSection = () => {
  return (
    <section>
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <p className="text-lg font-semibold text-meta-light-blue-3">
            CONTACT US
          </p>
          <p className="max-w-[642px] pt-2 text-4xl font-semibold text-meta-blue-1">
            Contact Our Friendly Team
          </p>
        </div>
        <div className="relative h-[285px] w-full rounded-xl bg-meta-gray-2 p-5">
          <div className="flex">
            <div className="max-w-[299px] pt-[10px] text-sm text-meta-light-blue-3 ">
              <p>
                Feel Free To Drop Us A Message Or Give Us A Call, And We'll Make
                Sure To Respond As Quickly As Possible. Your Success Is Our
                Priority, And We're Committed To Providing You With The Best
                Recruitment Assessment Solutions.
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-2 text-sm">
            <div className="my-6 flex items-center">
              <Image
                width={30}
                height={30}
                alt="close"
                className="mr-2 w-7"
                src={'/home/phone.svg'}
              />
              <a
                href="tel:+91 9157350298"
                aria-label="Our phone"
                title="Our phone"
                className="text-sm font-medium text-meta-light-blue-3 transition-colors duration-300 hover:text-meta-blue-1"
              >
                +91 9157350298
              </a>
            </div>
            <div className="flex items-center">
              <Image
                width={30}
                height={30}
                alt="close"
                className="mr-2 w-7"
                src={'/home/mail.svg'}
              />
              <a
                href="mailto:Info@Certifyrecruit.Com"
                aria-label="Our email"
                title="Our email"
                className="text-sm font-medium text-meta-light-blue-3 transition-colors duration-300 hover:text-meta-blue-1"
              >
                Info@Certifyrecruit.Com
              </a>
            </div>
          </div>

          <div className="absolute bottom-2 right-0">
            <Image
              alt="date"
              width={125}
              height={135}
              src={'/landing/servicebanner.png'}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
