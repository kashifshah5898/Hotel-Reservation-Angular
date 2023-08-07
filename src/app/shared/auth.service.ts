import { Injectable } from '@angular/core';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private utils: UtilsService) {}

  isLoggedIn() {
    return true;
    // try {
    //   const expireAt = this.utils.getLocalStorageData();
    //   if (
    //     new Date().getTime() > expireAt?.token?.expireAt ||
    //     expireAt == null
    //   ) {
    //     return false;
    //   } else {
    //     return true;
    //   }
    // } catch (error) {
    //   return false;
    // }
  }
}
