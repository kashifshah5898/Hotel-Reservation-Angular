import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from './../../shared/api.service';
import { HttpClient } from '@angular/common/http';
import {
  AfterContentInit,
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { AlertService } from 'ngx-alerts';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  disabled = false;
  userName = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  hide = true;
  user = {
    userName: '',
    password: '',
  };

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: Router,
    private toast: AlertService,
    private utils: UtilsService
  ) {
    this.loginForm = fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  isLogin() {
    if (this.loginForm.valid) {
      const data = {
        userName: this.loginForm.value.userName,
        password: this.loginForm.value.password,
      };

      this.api.login(data).subscribe(
        (res: any) => {
          if (res.success) {
            localStorage.setItem('userData', JSON.stringify(res.data));
            this.toast.success('Login Successfully');
            this.route.navigateByUrl('/Dashboard');
          } else {
            this.toast.danger(res.msg);
          }
        },
        (err: any) => {
          this.utils.catchBlock(err);
        }
      );
    } else {
      this.toast.danger('form is not valid');
    }
  }

  routeToSignUp() {
    this.route.navigateByUrl('/Sign-Up');
    // this.route.navigate(['/Sign-Up'], {
    //   queryParams: { admin: false },
    // });
  }
}
