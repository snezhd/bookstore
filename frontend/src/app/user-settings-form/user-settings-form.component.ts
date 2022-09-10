import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IUserSettings } from './user-settings.interface';

@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.scss']
})
export class UserSettingsFormComponent implements OnInit {

  originalUserSettings: IUserSettings = {
    name: '',
    emailOffers: true,
    style: '',
    subscription: ''
  }

  userSettings: IUserSettings = { ...this.originalUserSettings };

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log(form.valid);
  }
}
