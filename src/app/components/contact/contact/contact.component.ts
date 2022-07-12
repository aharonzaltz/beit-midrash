import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpHeaders} from "@angular/common/http";
import {ContactService} from "./contact.service";
import {take} from "rxjs/operators";
import {APP_TITLE, CONTACT_TITLE} from "../../../config/app-config";
import {Title} from "@angular/platform-browser";
import {MetaDataPageService} from "../../../services/meta-data-page.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactForm!: FormGroup;

  constructor(
      private formBuilder: FormBuilder,
      private contactService: ContactService,
      private metaDataPageService: MetaDataPageService
  ) { }

  ngOnInit(): void {

    this.metaDataPageService.changeMetaData(`${APP_TITLE} - ${CONTACT_TITLE}`);
    this.initForm();
  }

  private initForm() {
    this.contactForm = this.formBuilder.group({
      name: [null, Validators.required],
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
