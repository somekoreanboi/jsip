import { Opportunity } from "./opportunity";

export interface Company {
    name?: string;
    subname?: string;
    description?: string;
    company_link?: string;
    img: string;
    ourBusiness?: string; 
    opportunities?: Opportunity[];
    
}