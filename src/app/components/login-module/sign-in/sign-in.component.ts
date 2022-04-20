import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {map, take, takeUntil, tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {AppPages} from "../../../config/app-config";
import {Observable, Subject} from "rxjs";
import { isMobile } from 'src/app/services/app-utils.service';
import {LoginBaseComponent} from "../shared/login-base.component";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['../shared/auth-shared.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent extends LoginBaseComponent implements OnInit {

  loginForm!: FormGroup;
  private destroyed$ = new Subject<any>();
  isLoggedIn$!: Observable<boolean>;


  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
   this.isLoggedIn$ = this.authService.isLoggedIn().pipe(
       map((isLoggedIn, index) => {
         if (isLoggedIn) {
           this.router.navigate([AppPages.home])
         }
         return isLoggedIn
       })
   )
    this.initForm();
  }

  private initForm() {
    this.loginForm = this.fb.group({
      userName: [null, Validators.required],
      password: [null, Validators.required],
    })
  }

  onSignIn() {
    if(!this.loginForm.valid) return;
    this.authService.signIn(this.loginForm.value.userName, this.loginForm.value.password).pipe(
        take(1)
    ).subscribe()
  }

  signInWithGoogle() {
    this.authService.googleAuth().pipe(
        take(1)
    ).subscribe()
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
