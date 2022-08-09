import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import { environment } from '../../environments/environment';
import jwt_decode from 'jwt-decode';
import {User} from "./UserInterface";
import {Ejob} from "../employer/EJobInterface";
import {ISeeker} from "../seeker-profile/SeekerInterface";
import {IEmployer} from "../employer/EmployerInterface";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
    console.log(`${environment.apiUrl}`)
  }

  login(email: string, password: string) {
    return this.http.post<{token:string}>(`${environment.apiUrl}/users/login`, { email, password});
  }

  signup(formData: FormData) {
    return this.http.post<{token:string}>(`${environment.apiUrl}/users`, formData);
  }

  /*
  signup(role:string, email:string, password:string, fullname:string, education:string, skills:string,
           yeo:string, resume:any, organization:string, address:string, city:string, state:string, country:string) {

    const formData = new FormData();
    formData.append('role', role);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('fullname', fullname);
    formData.append('education', education);
    formData.append('skills', skills);
    formData.append('yeo', yeo);
    formData.append('resume', resume.value);
    formData.append('organization', organization);
    formData.append('address', address);
    formData.append('city', city);
    formData.append('state', state);
    formData.append('country', country);

    return this.http.post<{token:string}>(`${environment.apiUrl}/users/signup`,
      { role, email, password, fullname, education, skills, yeo, resume, organization, address, city, state, country});


    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    let options = { headers: headers };
    return this.http.post<{token:string}>(`${environment.apiUrl}/users/signup`, formData, options);
  }
  */

  persistToken(token: string) {
    localStorage.setItem("TOKEN", token);
  }

  clearToken() {
    localStorage.removeItem('TOKEN');
  }

  decodeToken(): User {
    let user = {} as User;
    const token = localStorage.getItem('TOKEN');
    if (token) {
      user = jwt_decode(token);
    }

    return user;
  }

  getSeekerById(id: string) {
    return this.http.get(`${environment.apiUrl}/seekers/` + id);
  }

  updateSeekerById(seeker_id: string, seeker: ISeeker) {
    return this.http.patch(`${environment.apiUrl}/seekers/` + seeker_id, seeker);
  }

  getEmployerById(id: string) {
    return this.http.get(`${environment.apiUrl}/employers/` + id);
  }

  updateEmployerById(employer_id: string, employer: IEmployer) {
    return this.http.patch(`${environment.apiUrl}/employers/` + employer_id, employer);
  }
}
