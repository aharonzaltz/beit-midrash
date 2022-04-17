import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['../shared/auth-shared.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerifyEmailComponent implements OnInit {
  userData$ = this.authService.getUserData$;

  constructor(
      private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  sendVerificationMail() {
    this.authService.sendVerificationMail();
  }
}
