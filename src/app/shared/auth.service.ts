import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn() {
    return true
    // try {
    //   const expireAt = JSON.parse(localStorage.getItem('token') as string);
    //   if (new Date().getTime() > expireAt?.expireAt || expireAt == null) {
    //     return false
    //   } else {
    //     return true
    //   }
    // } catch (error) {
    //   return false
    // }
  }
}
