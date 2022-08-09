import { Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { UserService } from "./user.service";
import { Router } from "@angular/router";
import { Observable, Subject, takeUntil} from "rxjs";
import { Store } from "@ngrx/store";
import { login } from '../store/action/user.actions'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup;

  token$!: Observable<any>;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private formBuilder : FormBuilder,
              private userService: UserService,
              private router: Router,
              private store: Store<{userReducer: any}>
              ) {

    store.select('userReducer')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        response => {
          console.log(`Response: ${JSON.stringify(response)}`);
          const {token} = response;
          if(token) {
            localStorage.setItem('TOKEN', token);
            const user = this.userService.decodeToken();
            if(user.role === 'employer') {
              router.navigate(['/', 'employers']);
            }else {
              router.navigate(['/', 'seekers']);
            }
          }

        }
    );
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


  login(): void {
    const { email, password } = this.loginForm.value;
    this.store.dispatch(login({email, password}));
  }

  ngOnInit(): void {
  }

}
