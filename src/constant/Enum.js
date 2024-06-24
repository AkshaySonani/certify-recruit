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

const RENDER_OPTION = [
  { 0: 'A). ' },
  { 1: 'B). ' },
  { 2: 'C). ' },
  { 3: 'D). ' },
];

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
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

const JOB_STATUS = ['PENDING', 'ACTIVE', 'CLOSED'];

const APPLICANT_STATUS = ['Applicants', 'Awaiting', 'Contacting', 'Hired'];
const EXAM_STATUS = {
  STARTED: 'Started',
  STOPPED: 'Stopped',
};

const BGV_STATUS={
  PENDING:'Pending',
   VERIFIED:'Verified',
   REJECTED: 'Rejected'
}
const QUESTION_STATUS = [
  { id: 1, status: 'Default', color: 'bg-meta-gray-2' }, //0
  { id: 2, status: 'Not Answered', color: 'bg-meta-brown-1' }, //1
  { id: 3, status: 'Answered', color: 'bg-meta-green-1' }, //2
  { id: 4, status: 'Marked for Review', color: 'bg-meta-red-1' }, //3
  {
    id: 5,
    status: 'Answered & Marked for Review ',
    color: 'bg-meta-purple-2',
  }, //4
];
const WORKPLACE_TYPE = ['ONSITE', 'HYBRID', 'REMOTE'];

const BANK_ACCOUNT_TYPE=['SAVINGS', 'CURRENT']
export {
  RENDER_OPTION,
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
  EXAM_STATUS,
  WORKPLACE_TYPE,
  BANK_ACCOUNT_TYPE,
  BGV_STATUS
};
