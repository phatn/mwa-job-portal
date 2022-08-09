export interface Applicant {
  _id: string,
  email: string,
  fullname: string,
  resume: string,
  education: string,
  skill_set: [{ type: string }],
  yoe: number,
  status: string
}
