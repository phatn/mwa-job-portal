import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { SearchJobsComponent } from "./job-seeker/search-jobs/search-jobs.component";
import { MyJobsComponent } from "./job-seeker/my-jobs/my-jobs.component";
import { CheckEmployerGuard } from "./check-employer-guard";
import { CheckSeekerGuard } from "./check-seeker-guard";
import {SeekerProfileComponent} from "./seeker-profile/seeker-profile.component";

const routes: Routes = [
  { path: '', redirectTo: "login", pathMatch: "full"},
  { path: 'login', component: LoginComponent},
  { path: 'sign-up', component: SignupComponent},
  {
    path: 'seekers',
    loadChildren: () =>
      import('./job-seeker/job-seeker.module')
        .then(module => module.JobSeekerModule),
    canActivate: [CheckSeekerGuard],
  },
  { path: 'seeker-profile', component: SeekerProfileComponent},
  {
    path: 'employers',
    loadChildren: () =>
      import('./employer/employer.module')
      .then(module => module.EmployerModule),
    canActivate: [CheckEmployerGuard],
  },
  { path: '**', redirectTo: "login"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
