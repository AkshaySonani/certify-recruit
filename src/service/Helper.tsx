import { Icons } from '@/svg';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import CryptoJS from 'crypto-js';

const EMAIlREGEX =
  /^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.-]?[a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/g;
// const EMAIlREGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
// const EMAIlREGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const ROUTE = {
  HOME: '/',
  JOB: '/job',
  MAIN: '/main',
  EXAM: '/exam',
  QUIZ: '/quiz',
  LOGIN: '/login',
  SIGN_UP: '/signup',
  PRICING: '/pricing',
  DASHBOARD: '/dashboard',
  MYPROFILE: '/myProfile',
  JOB_HIRED: '/job/hired',
  JOb_POST: '/job_posting',
  HIRED: '/dashboard/hired',
  SEARCH_CVS: '/search_CVs',
  JOb_DETAILS: 'job/details',
  COMING_SOON: '/comingSoon',
  JOB_ACTIVE: '/job/active',
  ACTIVE_JOBS: '/job/pending',
  APPLICANTS: '/job/applicants',
  JOB_AWAITING: '/job/awaiting',
  CERTIFICATION: '/certification',
  JOB_APPLICANTS: '/job/applicants',
  JOB_CONTACTING: '/job/contacting',
  BGV_FULL_REPORT: '/BGV/fullReport',
  FORGOT_PASSWORD: '/forgotpassword',
  CANDIDATES_HIRED: '/job/candidates',
  ACTIVE_JOB: '/dashboard/active_job',
  SIGN_UP_SUCCESS: '/signup/signUpSuccess',
  _CATEGORY: '/certification/chooseCategories',
  EMPLOYMENT_TYPE: '/job_posting/employment_Type',
  CHOOSE_CATEGORY: '/certification/chooseCategories',
  SUCCESSFUL_RESET_PASSWORD: '/resetpassword/success',
  SUCCESSFUL_FORGOT_PASSWORD: '/forgotPass/newPass/successful',
};

const TEXT = {
  OR: 'or',
  CTC: 'CTC',
  USA: 'Usa',
  CSS: 'Css',
  POST: 'Post',
  SEND: 'Send',
  DONE: 'Done',
  NAME: 'Name',
  EDIT: 'Edit',
  VIEW: 'View',
  DATE: 'Date',
  JOBS: 'Jobs',
  ROLE: 'Role',
  SAVE: 'Save',
  BACK: 'Back',
  NEXT: 'Next',
  JAVA: 'Java',
  MINS: 'Mins',
  SECS: 'Secs',
  CITY: 'City',
  AREA: 'Area',
  YEAR: 'Year',
  DAILY: 'Daily',
  EMAIL: 'Email',
  SCORE: 'Score',
  MONTH: 'Month',
  HIRED: 'Hired',
  OWNER: 'Owner',
  HOURS: 'Hours',
  SHARE: 'Share:',
  Month: '/Month',
  UPLOAD: 'Upload',
  LOG_IN: 'Log In',
  CANCEL: 'Cancel',
  DELETE: 'Delete',
  STATUS: 'Status',
  SALARY: 'Salary',
  HOURLY: 'Hourly',
  SKILLS: 'Skills',
  Hiring: 'Hiring',
  YEARLY: 'Yearly',
  PRICING: 'Pricing',
  LOG_OUT: 'Log out',
  SIGN_UP: 'Sign up',
  PREVIEW: 'Preview',
  MONTHLY: 'Monthly',
  KEYWORD: 'Keyword',
  COMPANY: 'Company',
  PINCODE: 'Pincodes',
  PASSWORD: 'Password',
  LOCATION: 'Location',
  JOB_POST: 'Job Post',
  DOWNLOAD: 'Download',
  AWAITING: 'Awaiting',
  EMPLOYEE: 'Employee',
  USERNAME: 'Username',
  MATCHING: 'Matching',
  ADD_USER: 'Add User',
  DURATION: 'Duration',
  Join_Now: 'Join Now',
  COMPLETE: 'Complete',
  FIVE_INTO_FIVE: '5/5',
  HI_THERE: ' Hi there!',
  JOB_TITLE: 'Job title',
  DOWNLOADS: 'Downloads',
  DASHBOARD: 'Dashboard',
  APPLICANT: 'Applicant',
  ADD_SKILL: 'Add Skill',
  AVAILABLE: 'Available',
  QUIZ_INFO: 'Quiz info',
  START_NOW: 'Start Now',
  FULL_NAME: 'Full Name',
  FORT_NIGHT: 'Fortnight',
  DEPARTMENT: 'Department',
  EXPERIENCE: 'Experience',
  ACTIVE_JOB: 'Active Job',
  EARN_BADGE: 'Earn Badge',
  CONTACTING: 'Contacting',
  INDIVIDUAL: 'Individual',
  PAN_NUMBER: 'PAN Number',
  BASIC_PLAN: 'Basic Plan',
  SEARCH_CVS: 'Search CVs',
  GO_TO_LOGIN: 'Go to login',
  JOB_DETAILS: 'Job details',
  DESIGNATION: 'Designation',
  DATE_POSTED: 'Date posted',
  JOB_POSTING: 'Job posting',
  HOURLY_RATE: 'Hourly rate',
  WEBSITE_URL: 'Website URL',
  GET_STARTED: 'Get Started',
  SERVER_SIDE: 'Server Side',
  ADD_KEYWORD: 'Add keyword',
  QUIZ_DETAIL: 'Quiz Detail',
  ARTICLE_LINK: 'Article Link',
  Get_Started: 'Get Started!',
  OUT_SIDE_USA: 'Outside USA',
  EDIT_PROFILE: 'Edit profile',
  MONTHLY_RATE: 'Monthly rate',
  SUCCESSFULLY: 'Successfully',
  COMPANY_INFO: 'Company Info',
  ADD_EMPLOYEE: 'Add Employee',
  TWO_WEEKS_AGO: '2 weeks ago',
  BASIC_DETAIL: 'Basic Detail',
  PHONE_NUMBER: 'Phone Number',
  COMPANY_TYPE: 'Company Type',
  COMPANY_NAME: 'Company Name',
  MOST_POPULAR: 'Most Popular',
  REGISTRATION: 'Registration',
  NEW_YOUR_USA: 'New Your, USA',
  STANDARD_PLAN: 'Standard Plan',
  BUSINESS_PLAN: 'Business Plan',
  DATE_UPLOADED: 'Date Uploaded',
  GO_TO_PROFILE: 'Go to profile',
  LEARN_AND_EARN: 'Learn & Earn',
  WORKPLACE_TYPE: 'Workplace type',
  RESET_PASSWORD: 'Reset Password',
  INTERVIEW_TIME: 'Interview Time',
  Company_Detail: 'Company Detail',
  STREET_ADDRESS: 'Street address',
  TIME_REMAINING: 'Time remaining',
  BADGE_OF_HONOUR: 'Badge of Honour',
  ADD_AN_EMPLOYEE: 'Add an Employee',
  RESET_VIA_EMAIL: 'Reset via Email',
  EMPLOYMENT_TYPE: 'Employment Type',
  SCHEDULE_A_DEMO: 'Schedule a demo',
  START_DATE_TIME: 'Start Date Time',
  FORGOT_PASSWORD: 'Forgot password?',
  CITY_NAMES: 'Surat, Gujrat, India.',
  CURRENT_LOCATION: 'Current location',
  TOTAL_EXPERIENCE: 'Total experience',
  SET_NEW_PASSWORD: 'Set new password',
  CONFIRM_PASSWORD: 'Confirm password',
  VIEW_CERTIFICATE: 'View certificate',
  WORKING_SCHEDULE: 'Working Schedule',
  WEBNOVA_INFOTECH: 'Webnova Infotech',
  NAME_ON_PAN_CARD: 'Name on PAN Card',
  QUESTION_PALETTE: 'Question Palette',
  RECENTLY_JOB_POST: 'Recently Job post',
  YOUR_COMPANY_NAME: 'Your Company name',
  REGISTRATION_INFO: 'Registration info',
  MARKS_PER_QUESTION: 'Marks Per Question',
  LOG_IN_WITH_GOOGLE: ' Log in with Google',
  SIGN_UP_WITH_GOOGLE: 'Sign up with Google',
  PAY_55_AND_PLAY_ONCE: 'Pay 55 and Play once',
  JOB_POSTING_LOCATION: 'Job posting location',
  START_NOW_ITS_FREE: " Start now - it's free",
  REDIRECT_TO_CALENDLY: 'Redirect to Calendly',
  MAX_TAB_SWITCH_ALLOW: 'Max Tab Switch Allow',
  ENABLE_NOTIFICATIONS: 'Enable notifications',
  COMPLETE_YOUR_PROFILE: 'Complete your profile',
  PICK_WORKING_SCHEDULE: 'Pick working schedule',
  KYC_Compliance_Detail: 'KYC Compliance Detail',
  DONT_HAVE_AN_ACCOUNT: "Don't have an account? ",
  THANK_YOU_FOR_SIGN_UP: 'Thank you for sign up!',
  TELL_US_ABOUT_THE_ROLE: 'Tell us about the role',
  RESULT_ANNULMENT_TIME: 'Result annulment 9:15 PM',
  COMPANY_MAILING_ADDRESS: 'Company mailing address',
  REFER_THIS_ARTICLE_LINK: 'Refer this article Link',
  ALREADY_HAVE_AN_ACCOUNT: 'Already have an account? ',
  USER_INTERFACE_EXPERT: 'User Interface Expert (WFH)',
  HIRING_MULTIPLE_CANDIDATES: 'Hiring multiple candidates?',
  QUIZ_JOINING_TIME: 'Quiz Joining Time 8:00 PM to 8:45 PM',
  WELCOME_BACK_TO_CERTIFY: 'Welcome back to CertifyRecruit.',
  PICK_ONE_OR_MULTIPLE_OPTION: 'Pick one or multiple option',
  NEGATIVE_MARKS_PER_QUESTION: 'Negative Marks Per Question',
  REGISTRATION_TIME: 'Registration Time 8:00 AM to 12:00 PM',
  YOUR_NEW_JOURNEY_BEGINS_NOW: 'Your New Journey Begins Now.',
  CHOOSE_YOUR_PLAN: ' Choose the most suitable plan for you.',
  MUST_BE_AT_LEAST_CHARACTERS: 'Must be at least 8 characters',
  YOUR_PASSWORD_HAS_BEEN_RESET: 'your password has been reset',
  PAY_1470_AND_PLAY_ONCE: 'Pay 1470 and play for 30 days straight',
  CHOOSE_YOUR_INTERVIEW_TIME_SLOT: 'Choose your interview time slot',
  PAY_750_AND_PLAY_ONCE: 'Pay 750 and play for 15 days straight (Only 50/Day)',
  YOU_CAN_PICK_MULTIPLE_WORK_SCHEDULES: 'You can pick multiple work schedules.',
  CHOOSE_HOW_YOU_PREFER_TO_PAY_FOR_THIS_JOB:
    'Choose how you prefer to pay for this job.',
  PLEASE_SELECT_OPTION_TO_RECEIVE_PASSWORD_RESET_LINK:
    'Please select option to receive password reset link.',
  YOU_WILL_BE_PROVIDE_A_UNIQUE:
    'You will be provide a unique password reset link to your registered email address.',
  CONGRATULATIONS_YOUR_CERTIFICATION_IS_COMPLETE:
    'Congratulations Your Certification is Complete.',
  CERTIFICATION_VALIDATION_IS_YEAR_ONLY:
    '*Certification validation is 1 year only',
  ADD_SKILL_KEYWORDS_TO_MAKE_YOUR_JOB:
    'Add skill keywords (max 10) to make your job more visible to the right candidates.',
  I_AM_HIRING_MULTIPLE_CANDIDATES: 'I am hiring multiple candidates',
  THIS_WILL_BE_DISPLAYED_ON_JOB_PAGE_FOR_CANDIDATES_SEE:
    ' This will be displayed on job page for candidates to see.',
  ARE_YOU_HIRING_MANAGER: 'Are you a hiring manager?',
  THE_HIRED_CANDIDATE_WILL_WORK_IN_REPORTING_CHAIN:
    ' The hired candidate will work in your reporting chain.',
  WHICH_OPTION_BEST_DESCRIBE_THIS_JOBS_LOCATION:
    " Which option best describe this job's location?",
  WINNING_PRIZE_REDEEM_WITH_HOURS_AFTER_TEST_COMPLETE:
    'Winning Prize redeem with in 24 Hours after test complete',
  ONLY_WHEN_YOU_HAVE_CERTIFICATION_CAN_YOU_DO_LEARN_AND_EARN_USE:
    'You can only play Learn & Earn if you have completed your certification.',
  GO_TO_CERTIFICATION: 'Go to Certification',
  CERTIFYRECRUIT_STREAMLINES_YOUR_ENTIRE_RECRUITING_PROCESS:
    ' CertifyRecruit streamlines your entire recruiting process, so you can find the best people for your team, quickly and easily',
};

const USER_ROLE = {
  EMPLOYEE: 'employee',
  INDIVIDUAL: 'individual',
};

const SIDE_BAR_DATA: any = {
  admin: [],
  individual: [
    { path: 'dashboard', title: 'Dashboard', icon: Icons.Dashboard },
    { path: 'job', title: 'Job', icon: Icons.Job },
    { icon: Icons.Learn, path: 'learnAndEarn', title: 'Learn & Earn' },
    { path: 'certification', title: 'Certification', icon: Icons.Certificate },
    { path: 'pricing', title: 'Pricing', icon: Icons.Pricing },
    { path: 'BGV', title: 'BGV', icon: Icons.Bgv },
  ],
  employee: [
    { path: 'dashboard', title: 'Dashboard', icon: Icons.Dashboard },
    { path: 'job_posting', title: 'Job Posting', icon: Icons.Job },
    { path: 'job', title: 'Job', icon: Icons.Job },
    // { path: 'users', title: 'Users', icon: Icons.Job },
    // { icon: Icons.Job, path: 'earn_badge', title: 'Company info' },
    { path: 'search_CVs', title: 'Search CVs', icon: Icons.Job },
    // { icon: Icons.Job, path: 'badgeOfHonour', title: 'Badge of Honour' },
    { path: 'pricing', title: 'Pricing', icon: Icons.Pricing },
    { path: 'BGV', title: 'BGV', icon: Icons.Bgv },
  ],
};

const EMP_BASIC_PLAN = [
  { Title: 'Upto 5 Job Postings' },
  { Title: 'Upto 10 Applicant search' },
  { Title: 'Badge of Honour Not included' },
  { Title: 'Upto 5 BGV' },
  { Title: 'Upto 5 applicants allowed' },
];

const EMP_STANDARD_PLAN = [
  { Title: 'Upto 25 Job Postings' },
  { Title: 'Upto 25 Applicant Search' },
  { Title: 'Eligible for Badge of Honour' },
  { Title: 'Upto 15 BGV' },
  { Title: 'Eligible for Post Boosting' },
  { Title: 'Upto 20 applicants allowed' },
];

const EMP_BUSINESS_PLAN = [
  { Title: 'Unlimited Job Postings' },
  { Title: 'Unlimited Applicant Search' },
  { Title: 'Eligible for badge of Honour' },
  { Title: 'Upto 50 BGV (outsiders included)' },
  { Title: 'Eligible for Post Boosting' },
  { Title: 'Upto 75 applicants allowed' },
];

const INDIVIDUAL_DAILY_PLAN = [
  { Title: 'Get daily news, facts and assessment of 10 questions.' },
  { Title: 'Log in every day to get 100 points. Missed days you get nothing.' },
  {
    Title:
      '1st Rank gets 50 points. 2nd rank gets 25 points. 3rd rank gets 10 Points.',
  },
];
const INDIVIDUAL_FORT_NIGHT_PLAN = [
  { Title: 'Get daily news, facts and assessment of 10 questions.' },
  { Title: 'Log in every day to get 100 points. Missed days you get nothing.' },
  {
    Title:
      '1st Rank gets 50 points. 2nd rank gets 25 points. 3rd rank gets 10 Points.',
  },
];
const INDIVIDUAL_MONTHLY_PLAN = [
  { Title: 'Get daily news, facts and assessment of 10 questions.' },
  { Title: 'Log in every day to get 100 points. Missed days you get nothing.' },
  {
    Title:
      '1st Rank gets 50 points. 2nd rank gets 25 points. 3rd rank gets 10 Points.',
  },
];

export const generateToken = () => {
  return CryptoJS.lib.WordArray.random(32).toString();
};

export const hashToken = async (token: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(token, salt);
};

export const calculateExpirationDate = (createdAt: any, planType: any) => {
  const date = new Date(createdAt);
  switch (planType) {
    case 'Daily':
      date.setDate(date.getDate() + 1);
      break;
    case 'Fortnight':
      date.setDate(date.getDate() + 14);
      break;
    case 'Monthly':
      date.setMonth(date.getMonth() + 1);
      break;
    case 'Yearly':
      date.setFullYear(date.getFullYear() + 1);
      break;
    default:
      break;
  }
  return date;
};

const createModal = (name: string, schema: any) =>
  mongoose.models?.[name] || mongoose.model(name, schema);

const shuffleData = (data: any) => {
  for (let i = data.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [data[i], data[j]] = [data[j], data[i]];
  }
  return data;
};

const calculatePercentage = (values: any, pr: any) => {
  const tab1Complete = Object.values(values).filter((val) => val !== '').length;
  const totalFields = Object.keys(values).length;
  const totalCompleted = tab1Complete;
  const percentage = (totalCompleted / totalFields) * pr;
  return percentage.toFixed(2);
};

// const updateProfileCount = (
//   role: any,
//   section: any,
//   setProfileCompletionCount: any,
//   completedSections: any,
//   setCompletedSections: any,
// ) => {
//   const employeeDetails = {
//     basic_details: 30,
//     company_detail: 50,
//     KYC_compliance_detail: 20,
//   };

//   const individualDetails = {
//     resume: 10,
//     education: 10,
//     key_skills: 10,
//     career_info: 20,
//     bank_details: 20,
//     profile_summary: 10,
//     personal_details: 20,
//   };

//   let details: any;
//   if (role === 'employee') {
//     details = employeeDetails;
//   } else if (role === 'individual') {
//     details = individualDetails;
//   }

//   const sectionKey = `${role}-${section}`;

//   if (details && details[section] && !completedSections.has(sectionKey)) {
//     setProfileCompletionCount((prevCount: any) => ({
//       ...prevCount,
//       [role]: (prevCount[role] || 0) + details[section],
//     }));
//     setCompletedSections((prevSet: any) => new Set(prevSet).add(sectionKey));
//   }
// };

const updateProfileCount = (
  role: any,
  section: any,
  setProfileCompletionCount: any,
  completedSections: any,
  setCompletedSections: any,
  setOpenSuccessModal: any,
) => {
  const employeeDetails = {
    basic_details: 30,
    company_detail: 50,
    KYC_compliance_detail: 20,
  };

  const individualDetails = {
    resume: 10,
    education: 10,
    key_skills: 10,
    career_info: 20,
    bank_details: 20,
    profile_summary: 10,
    personal_details: 20,
  };

  let details: any;
  if (role === 'employee') {
    details = employeeDetails;
  } else if (role === 'individual') {
    details = individualDetails;
  }

  const sectionKey = `${role}-${section}`;

  if (details && details[section] && !completedSections.has(sectionKey)) {
    setProfileCompletionCount((prevCount: any) => {
      const newCount = (prevCount[role] || 0) + details[section];
      if (newCount === 100) {
        setOpenSuccessModal(true);
      }

      return {
        ...prevCount,
        [role]: Math.min(newCount, 100), // Ensure count does not exceed 100
      };
    });
    setCompletedSections((prevSet: any) => new Set(prevSet).add(sectionKey));
  }
};

export {
  TEXT,
  ROUTE,
  USER_ROLE,
  EMAIlREGEX,
  shuffleData,
  createModal,
  SIDE_BAR_DATA,
  EMP_BASIC_PLAN,
  EMP_BUSINESS_PLAN,
  EMP_STANDARD_PLAN,
  updateProfileCount,
  calculatePercentage,
  INDIVIDUAL_DAILY_PLAN,
  INDIVIDUAL_MONTHLY_PLAN,
  INDIVIDUAL_FORT_NIGHT_PLAN,
};
