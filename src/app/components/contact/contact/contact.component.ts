import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ContactService} from "./contact.service";
import {take} from "rxjs/operators";
import {APP_TITLE, CONTACT_TITLE} from "../../../config/app-config";
import {MetaDataPageService} from "../../../services/meta-data-page.service";
import {
  CONTACT_WITH_MANAGER_BUTTON,
  CONTACT_WITH_MANAGER_TITLE,
  CONTACT_WITH_RABBI_BUTTON, CONTACT_WITH_RABBI_TITLE
} from "../../../config/contanct.config";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent implements OnInit {

  contactForm!: FormGroup;
  messageToManager = false;
  titleText!: string;

  buttonText!: string

  constructor(
      private formBuilder: FormBuilder,
      private contactService: ContactService,
      private metaDataPageService: MetaDataPageService
  ) { }

  ngOnInit(): void {

    this.metaDataPageService.changeMetaData(`${APP_TITLE} - ${CONTACT_TITLE}`);
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
    this.buttonText =  this.messageToManager ? CONTACT_WITH_MANAGER_BUTTON : CONTACT_WITH_RABBI_BUTTON
  }

  getTitleText() {
   this.titleText = this.messageToManager ? CONTACT_WITH_MANAGER_TITLE : CONTACT_WITH_RABBI_TITLE
  }

  private initForm() {
    this.contactForm = this.formBuilder.group({
      name: [null, Validators.required],
      nonPublish: [false],
      email: [null, [Validators.required, Validators.email]],
      content: [null, Validators.required],
    })
  }

  onSendMessageClick() {
    console.log(this.contactForm.value)

    if (this.contactForm.valid) {
        this.contactService.sendMessageToMail(this.contactForm.value).pipe(take(1)).subscribe(
            response => {
              console.log(response);
              this.contactForm.reset();
            }
        );
    }
  }
}
