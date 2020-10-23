import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WSAApiService } from '../admin.api.service';
import { UserLoginResponse } from '../admin.interfaces';
import { WSAUserService } from '../admin.user.service';

export class WSALoginComponent {

  loginForm: FormGroup = null;
  loginLoading = false;

  constructor(
    private wsaApiService: WSAApiService,
    private wsaUserService: WSAUserService
  ) {
    this.initLoginForm();
  }

  initLoginForm(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      stayLoggedIn: new FormControl(false)
    });
  }

  loginSuccessCallback(rsp: UserLoginResponse): void { }

  login(): void {
    this.loginLoading = true;
    this.wsaApiService.login(this.loginForm.value).subscribe((rsp) => {
      this.wsaUserService.userData = rsp.userData;
      this.loginSuccessCallback(rsp);
    }).add(() => {
      this.loginLoading = false;
    });
  }

}
