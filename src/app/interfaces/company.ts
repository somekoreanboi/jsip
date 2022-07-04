import { Opportunity } from "./opportunity";

export interface Company {
    name?: string;
    description?: string;
    company_link?: string;
    img: string;
    ourBusiness?: string; 
    slogan?: string;
    opportunities?: Opportunity[];
}