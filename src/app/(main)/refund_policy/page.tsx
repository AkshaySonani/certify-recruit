'use client';
import React from 'react';

import PageTitle from '@/Components/home/pageTitle';

const Page = () => {
  return (
    <div className="dm-sans ">
      <div className="h-full w-full">
        <PageTitle content="Refund Policy" />
      </div>

      <div className="mx-auto h-full px-4 pb-[50px] pt-4 sm:max-w-xl sm:pt-36 md:max-w-full md:px-24 lg:max-w-screen-2xl lg:px-8">
        <p className="mb-10 text-lg font-normal text-meta-light-blue-3">
          At CLUSTER CERTIFY RECRUIT PRIVATE LIMITED, we strive to provide
          exceptional service to all our customers. Please read our refund
          policy carefully before making any purchases or booking our services.
        </p>

        <h2 className="mb-2 text-2xl font-bold text-meta-purple-1">
          Cancellation Policy:
        </h2>

        <p className="mb-10 text-lg font-normal text-meta-light-blue-3">
          Once you have opted for a service with us, any cancellation from your
          end will not be eligible for a refund. We understand that
          circumstances may change, but as we allocate resources and time to
          prepare for each service, we are unable to provide refunds for
          canceled bookings.
        </p>

        <h2 className="mb-2 text-2xl font-bold text-meta-purple-1">
          Failed Payment:
        </h2>

        <p className="mb-4 text-lg font-normal text-meta-light-blue-3">
          In the event of a failed payment due to technical issues or other
          unforeseen circumstances, any amount charged will be fully refundable.
          We will make every effort to notify you promptly regarding any payment
          issues and facilitate the refund process efficiently.
        </p>

        <h2 className="mb-2 text-2xl font-bold text-meta-purple-1">
          Refund Process:
        </h2>

        <ul className="mb-4 list-inside list-disc text-lg font-normal text-meta-light-blue-3">
          <li className="mb-5">
            If you are eligible for a refund as per our policy, please contact
            our customer support team at +91 9157350298 or Email:
            info@certifyrecruit.io. Provide relevant details such as your
            booking reference number and payment information to expedite the
            refund process.
          </li>
          <li className="mb-5">
            Refunds will be issued to the original payment method used during
            the transaction.
          </li>
          <li className="mb-10">
            Depending on your payment provider and bank processing times, it may
            take up to 10 working days for the refund amount to reflect in your
            account.
          </li>
        </ul>

        <h2 className="mb-2 text-2xl font-bold text-meta-purple-1">
          Exceptions:
        </h2>

        <p className="mb-4 text-lg font-normal text-meta-light-blue-3">
          Our refund policy is subject to change based on specific circumstances
          or legal requirements. We reserve the right to make exceptions or
          modifications to this policy at our discretion.
        </p>
        <h2 className="mb-2 text-2xl font-bold text-meta-purple-1">
          Contact Us:
        </h2>

        <ul className="mb-4 list-inside list-disc text-lg font-normal text-meta-light-blue-3">
          <li className="mb-5">
            If you have any questions or concerns regarding our refund policy,
            please feel free to reach out to our customer support team. We are
            here to assist you and address any inquiries you may have.
          </li>
          <li className="mb-5">
            By opting for our services, you acknowledge and agree to abide by
            the terms outlined in our refund policy.
          </li>
          <li className="mb-10">
            Thank you for choosing CLUSTER CERTIFY RECRUIT PRIVATE LIMITED. We
            appreciate your business and look forward to serving you.
          </li>
        </ul>

        <h2 className="mb-3 text-2xl font-bold text-meta-purple-1">
          CLUSTER CERTIFY RECRUIT PRIVATE LIMITED
        </h2>
        <p className="mb-4 text-lg font-normal text-meta-light-blue-3">
          201, Platinum Hub, near Central Bank, Near Tulsidham Char Rasta,
          Manjit Nagar, GIDC Industrial Area, Manjalpur, Vadodara, Gujarat
          390011
        </p>
        <div className="mb-4 flex items-center text-lg font-normal text-meta-light-blue-3">
          &#91;
          <div className="flex items-center px-1">
            <p>Email: </p>
            <a
              title="Our email"
              aria-label="Our email"
              href="mailto:info@certifyrecruit.io"
              className="transition-colors duration-300 hover:text-meta-blue-1"
            >
              info@certifyrecruit.io
            </a>
          </div>
          <div className="flex items-center px-1">
            <p>Phone: </p>
            <a
              href="tel:+91 9157350298"
              aria-label="Our phone"
              title="Our phone"
              className="transition-colors duration-300 hover:text-meta-blue-1"
            >
              +91 9157350298
            </a>
          </div>
          &#93;
        </div>
      </div>
    </div>
  );
};

export default Page;
