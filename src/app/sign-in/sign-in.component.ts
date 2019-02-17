import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html'
})
export class SignInComponent implements OnInit {
  frm: FormGroup;
  isBusy = false;
  hasFailed = false;
  showInputErrors = false;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.frm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  public doSignIn() {
    // Check the form values
    if(this.frm.invalid) {
      this.showInputErrors = true;
      return;
    }
    // reset status
    this.isBusy = true;
    this.hasFailed = false;

    // Grab values from form
    const username = this.frm.get('username').value;
    const password = this.frm.get('password').value;

    // Submit request to API
    this.api
      .signIn(username, password)
      .subscribe(
        (response) => {
          this.auth.doSignIn(
            response.token,
            response.name
          );
          this.router.navigate(['todos']);
        },
        (error) => {
          this.isBusy = false;
          this.hasFailed = true;
        }
      );
  }
}
