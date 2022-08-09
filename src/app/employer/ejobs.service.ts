import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Ejob} from "./EJobInterface";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class EjobsService {

  constructor(private httpClient: HttpClient) { }

  getJobs() {
    return this.httpClient.get<Array<Ejob>>(`${environment.apiUrl}/employers/jobs/`);
  }

  getJobById(job_id: string) {
    return this.httpClient.get<Ejob>(`${environment.apiUrl}/employers/jobs/` + job_id);
  }

  updateJobById(job_id: string, job: Ejob) {
    return this.httpClient.patch(`${environment.apiUrl}/employers/jobs/` + job_id, job);
  }

  addJob(job: Ejob) {
    return this.httpClient.post(`${environment.apiUrl}/employers/jobs/`, job);
  }
}
