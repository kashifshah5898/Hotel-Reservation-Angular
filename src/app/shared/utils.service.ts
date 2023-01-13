import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private route: Router
  ) { }

  getUserToken() {
    return JSON.parse(localStorage.getItem('token') as string);
  }

  userLoggedOut() {
    localStorage.clear()
    this.route.navigateByUrl('/');
  }


}
