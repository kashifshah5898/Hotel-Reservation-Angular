import { Component } from '@angular/core';
import { UtilsService } from './shared/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isLoginPage$ = this.utils.login$;
  constructor(private utils: UtilsService) {}
}
