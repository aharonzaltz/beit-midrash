import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpHeaders} from "@angular/common/http";
import {ContactService} from "./contact.service";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactForm!: FormGroup;

  constructor(
      private formBuilder: FormBuilder,
      private contactService: ContactService
  ) { }

  ngOnInit(): void {
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
