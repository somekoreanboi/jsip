import { Opportunity } from "./opportunity";

export interface Company {
    name?: string;
    profile?: string;
    company_link?: string;
    img: string;
    application_headline?: string;
    opportunities?: Opportunity[];
}