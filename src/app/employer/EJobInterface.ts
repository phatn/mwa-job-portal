import {Applicant} from "./ApplicantInterface";

export interface Ejob {
  _id: string,
  title: string,
  description: string,
  skills: [{ type: string }],
  job_type: string,
  location: {
    address: string,
    city: string,
    state: string,
    country: string
  },
  salary: string,
  timestamp_created: number,
  created_by: string,
  employer: {
    _id: string,
    email: string,
    fullname: string,
    organization: string
  },
  applied_by: [{ type: Applicant }],
  status: string
}
