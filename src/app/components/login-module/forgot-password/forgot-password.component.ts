import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['../shared/auth-shared.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm!: FormGroup;

  constructor(
      private authService: AuthService,
      private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.forgotPasswordForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    })
  }

    onForgotPasswordClick() {
      this.authService.forgotPassword(this.forgotPasswordForm.value.email).pipe(
          take(1)
      ).subscribe()
    }
}
