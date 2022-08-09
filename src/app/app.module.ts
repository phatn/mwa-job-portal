import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from "./layout/layout.module";
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { JobSeekerModule } from "./job-seeker/job-seeker.module";
import { MaterialModule } from "./material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { UserService } from "./login/user.service";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from "./store/effect/user.effects";
import { JobEffects } from "./store/effect/job.effects";
import { jobReducer } from "./store/reducer/job.reducer";
import { userReducer } from "./store/reducer/user.reducer";
import {EmployerModule} from "./employer/employer.module";
import { AttachTokenInterceptor } from './attach-token.interceptor';
import { jobApplyReducer } from "./store/reducer/job.apply.reducer";
import { StatusExtractorPipe } from './pipe/status-extractor.pipe';
import {SeekerProfileComponent} from "./seeker-profile/seeker-profile.component";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        SignupComponent,
      SeekerProfileComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        LayoutModule,
        JobSeekerModule,
        MaterialModule,
        ReactiveFormsModule,
        HttpClientModule,
        StoreModule.forRoot({userReducer: userReducer, jobReducer: jobReducer, jobApplyReducer: jobApplyReducer}),
        EffectsModule.forRoot([UserEffects, JobEffects])
    ],
    providers: [
        UserService,
        {provide: HTTP_INTERCEPTORS, useClass: AttachTokenInterceptor, multi: true}
    ],
    exports: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
