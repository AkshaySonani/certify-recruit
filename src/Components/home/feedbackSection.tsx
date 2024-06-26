'use client';
import Image from 'next/image';

const FeedbackSection = () => {
  const feedbacks = [
    {
      name: 'Deepak Sharma',
      text: 'Appreciate the certification feature. Thanks a ton!',
      rating: 4,
    },
    {
      name: 'Kavya V',
      text: 'CertifyRecruit has simplified my recruiting. I can easily find excellent candidates from the leaderboard.',
      rating: 3,
    },
    {
      name: 'Bhumi Gupta',
      text: 'I am a regular user of Learn & Earn. Staying in the top 50 has helped me negotiate during my increment, and I am the happiest :)',
      rating: 5,
    },
    {
      name: 'Emmanuel',
      text: 'Certification is adding good value to my CV. Thank you.',
      rating: 2,
    },
    {
      name: 'Kaveri Mehra',
      text: 'Thanks for making us eligible for the Badge of Honour. I can proudly say my organization has the best team!',
      rating: 1,
    },
    {
      name: 'Dhaval Mehta',
      text: 'Felt amazing after getting all right answers and staying on top of leaderboard for 3 weeks. I enjoy coming here and improving my skills everyday.',
      rating: 5,
    },
  ];

  const renderStars = (rating: any) => {
    return Array.from({ length: 5 }, (_, i) => {
      if (rating >= i + 1) {
        return (
          <span className="text-2xl" key={i}>
            ★
          </span>
        );
      } else if (rating > i && rating < i + 1) {
        return <span key={i}>½</span>;
      } else {
        return (
          <span className="text-2xl" key={i}>
            ☆
          </span>
        );
      }
    });
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-5">
          <p className="text-lg font-semibold text-meta-light-blue-3">
            FEEDBACK
          </p>
          <p className="max-w-[642px] pt-2 text-4xl font-semibold text-meta-blue-1">
            What They Thought About Us
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {feedbacks.map((feedback, index) => (
            <div key={index} className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 flex items-center">
                <div className="mr-2 text-yellow-500">
                  {renderStars(feedback.rating)}
                </div>
                <span className="text-gray-600">{feedback.rating} of 5</span>
              </div>
              <p className="mb-4 text-gray-800">{feedback.text}</p>
              <div className="flex w-full items-center">
                <div className="mr-3">
                  <Image
                    alt="Icon"
                    width={39}
                    height={39}
                    className="rounded-xl p-0.5"
                    src={'/sidebarIcon/profile.svg'}
                  />
                </div>
                <p className="text-lg font-semibold text-meta-blue-1">
                  {feedback.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;
