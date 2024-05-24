const PROFICIENCY = ['BEGINNER', 'PROFICIENT', 'EXPERT'];

const EMP_TYPE_ARR = [
  'FULLTIME',
  'PARTTIME',
  'ONDEMAND',
  'TEMPORARY',
  'VOLUNTEER',
  'INTERNSHIP',
];

const GENDER = ['MALE', 'FEMALE', 'OTHER'];

const HIGH_EDUCATION = [
  { label: '10th or Below 10th', value: 'TEN_OR_BELOW' },
  { label: '12th Pass', value: 'TWELVE_PASS' },
  { label: 'Diploma', value: 'DIPLOMA' },
  { label: 'Graduate', value: 'GRADUATE' },
];

const CURRENT_LOCATION = ['USA', 'OUT_OF_USA'];

const COMPANY_TYPE = [
  'Public company',
  'Limited by guarantee',
  'One Person Company',
  'Private company',
  'Unlimited company',
  'Holding company',
  'State-owned enterprise',
  'Associate companies',
  'Producer Companies',
  'Small business',
  'Foreign company',
  'Section 8 company',
  'Statutory corporation',
  'Company',
  'Dormant company',
  'Unlisted company',
  'Chartered company',
  'Classification of companies',
  'Corporations',
  'Indian company',
  'Nonprofit organization',
  'Public limited',
  'Banking company',
  'Nidhi Companies',
];
const COMPLETION_DATE = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
};

const JOB_STATUS = ['PENDING', 'ACTIVE', 'CLOSED'];

const APPLICANT_STATUS = ['Applicants', 'Awaiting', 'Contacting', 'Hired'];

const QUESTION_STATUS = [
  { id: 1, status: 'Default', color: 'bg-meta-gray-2' },
  { id: 2, status: 'Not Answered', color: 'bg-meta-brown-1' },
  { id: 3, status: 'Answered', color: 'bg-meta-green-1' },
  { id: 4, status: 'Marked for Review', color: 'bg-meta-red-1' },

  {
    id: 5,
    status: 'Answered & Marked for Review ',
    color: 'bg-meta-purple-2',
  },
];
export {
  PROFICIENCY,
  EMP_TYPE_ARR,
  GENDER,
  HIGH_EDUCATION,
  CURRENT_LOCATION,
  COMPLETION_DATE,
  COMPANY_TYPE,
  JOB_STATUS,
  APPLICANT_STATUS,
  QUESTION_STATUS,
};
