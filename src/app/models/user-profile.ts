import { Country } from "@angular-material-extensions/select-country";

export interface UserProfile {
    name?: string;  
    email: string;
    password?: string;
    nationality?: Country;
    birthday?: string;
    gender?: string;
    universityName?: string;
    graduationPeriod?: string;
    yearOfStudy?: string;
    faculty?: string;
    japaneseProficiency?: string;
    futureWorkPlace?: string;
    jobType?: string;
    interestedIndustry?: string;
    is_admin?: boolean;
    // reason?: string;
    // expectation?: string;
    // standOut?: string;
  }