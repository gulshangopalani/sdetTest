import dotenv from 'dotenv';
dotenv.config();  // This loads .env file if present

import { v4 as uuidv4 } from 'uuid';

export const config = {
  baseUrl: process.env.BASE_URL || 'https://apply.mykaleidoscope.com',
  environment: process.env.ENVIRONMENT || 'development',
  userCredentials: {
    email: `user+${uuidv4()}@test.com`,
    password: 'm1J@82d97y',

    // testtaswkml@test.com
  },
  registrationUrl: '/register',
  applicationUrl: '/program/sdet-test-scholarship',
  homeUrl:'/applicant/applications',
  transcriptFilePath: process.env.TRANSCRIPT_PATH || '',
  defaultName: 'Test User',
  defaultPhone: '+911234567890',
  defaultAddress: '123 Main St, City, Country',
  defaultGender: 'Male',
  defaultDob: '2000-01-01',
  defaultcity:'Florida',
  defaultzipcode: '411014',
  defaultcountry: 'India',
  essayAnswers: {
    Animals: 'I love animals because...',
    School: 'My favorite subject is Math...',
  },
  activities: {
    activity1:'tennis',
    yearsActivity1 :'1',
    roleActivity1 :'associate',
    descriptionActivity1:'intern',
    activity2:'Cricket',
    yearsActivity2 :'3',
    roleActivity2 :'Advance',
    descriptionActivity2:'Advance',
  }
};
