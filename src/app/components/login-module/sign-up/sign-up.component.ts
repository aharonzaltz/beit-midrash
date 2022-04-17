import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../shared/auth-shared.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnInit {


  signUpForm!: FormGroup;

  constructor(
      private authService: AuthService,
      private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.signUpForm = this.fb.group({
      userEmail: [null, Validators.required],
      password: [null, Validators.required],
    })
  }

  onSignUp() {
    this.authService.signUp(this.signUpForm.value.userEmail, this.signUpForm.value.password);
  }

  googleAuth() {
    this.authService.googleAuth();
  }
}
