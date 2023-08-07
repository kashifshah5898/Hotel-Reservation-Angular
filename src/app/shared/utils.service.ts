import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import * as CryptoJS from 'crypto-js';
import * as CryptoJS from 'crypto-ts';
import { AlertService } from 'ngx-alerts';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  // public login = new BehaviorSubject<boolean>(false);
  public login = new BehaviorSubject<boolean>(!false);
  public login$ = this.login.asObservable();
  securityKey = 'secret_key_123';

  constructor(
    private route: Router,
    private ngxService: NgxUiLoaderService,
    private toast: AlertService
  ) {}

  setUser(login: boolean) {
    this.login.next(login);
  }

  decryptedText = (encryptedText: string): any => {
    const bytes = CryptoJS.AES.decrypt(encryptedText || '', this.securityKey);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(originalText || '{}');
  };

  getLocalStorageData() {
    const decrypted = this.decryptedText(
      JSON.parse(localStorage.getItem('userData') as string)
    );
    return decrypted;
  }

  getUserToken() {
    return this.getLocalStorageData()?.token?.token;
  }

  userLoggedOut() {
    localStorage.clear();
    this.route.navigateByUrl('/login');
  }

  catchBlock(error: any) {
    this.ngxService.stop();
    this.toast.danger(
      error?.msg ||
        error?.error?.msg ||
        error?.message ||
        error?.error?.message ||
        'something went wrong'
    );
  }
}
