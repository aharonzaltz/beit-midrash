import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ContactService} from "./contact.service";
import {take} from "rxjs/operators";
import {APP_TITLE, AppPages, CONTACT_TITLE, SUBSCRIBE_TITLE} from "../../../config/app-config";
import {MetaDataPageService} from "../../../services/meta-data-page.service";
import {
  CONTACT_WITH_MANAGER_BUTTON,
  CONTACT_WITH_MANAGER_TITLE,
  CONTACT_WITH_RABBI_BUTTON,
  CONTACT_WITH_RABBI_TITLE
} from "../../../config/contanct.config";
import {Router} from "@angular/router";
import firebase from "firebase/compat";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent implements OnInit {

  contactForm!: FormGroup;
  page!: AppPages;
  messageToManager = false;
  titleText!: string;

  buttonText!: string

  get AppPages(): typeof AppPages {
    return AppPages;
  }

  constructor(
      private formBuilder: FormBuilder,
      private contactService: ContactService,
      private metaDataPageService: MetaDataPageService,
      private router: Router,
  ) { }

  ngOnInit(): void {
    console.log(this.router.url)
    this.page = this.router.url.slice(1) as AppPages;
    const title = this.page === AppPages.contact ? CONTACT_TITLE: SUBSCRIBE_TITLE;
    this.metaDataPageService.changeMetaData(`${APP_TITLE} - ${title}`);
    this.initForm();
    this.getButtonText();
    this.getTitleText();
  }

  onChangeStatusForm() {
    this.messageToManager = !this.messageToManager;
    this.getButtonText();
    this.getTitleText();
  }

  getButtonText() {
    this.buttonText =  this.messageToManager ?  CONTACT_WITH_RABBI_BUTTON :CONTACT_WITH_MANAGER_BUTTON
  }

  getTitleText() {
   this.titleText = this.page === AppPages.subscribe ? SUBSCRIBE_TITLE: this.messageToManager ? CONTACT_WITH_MANAGER_TITLE : CONTACT_WITH_RABBI_TITLE
  }

  private initForm() {
    this.contactForm = this.formBuilder.group({
      name: [null, Validators.required],
      nonPublish: [false],
      email: [null, [Validators.required, Validators.email]],
      content: [null, this.page !== AppPages.subscribe? Validators.required: null],
    })
  }

  onSendMessageClick() {
    if (this.contactForm.valid) {
        if(this.page === AppPages.subscribe) {
          this.contactForm.controls.content.setValue(SUBSCRIBE_TITLE)
        }
        this.contactService.sendMessageToMail(this.contactForm.value).pipe(take(1)).subscribe(
            response => {
              this.contactForm.reset();
            }
        );
    }
  }
}
