import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {take} from "rxjs/operators";
import {Router} from "@angular/router";
import {AppPages} from "../../../config/app-config";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['../shared/auth-shared.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.authService.isLoggedIn().pipe(take(1)).subscribe(
        isLoggedIn => {
          if(isLoggedIn) {
            this.router.navigate([AppPages.home])
          }
        }
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
    this.authService.signIn(this.loginForm.value.userName, this.loginForm.value.password)
  }

  signInWithGoogle() {
    this.authService.googleAuth()
  }
}
