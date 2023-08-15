import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { AlertService } from 'ngx-alerts';
import { UtilsService } from 'src/app/shared/utils.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  hide = true;
  signUpForm: FormGroup;
  genderDrop = [{ value: 'Male' }, { value: 'Female' }];
  roleDrop = [{ value: 'admin' }, { value: 'user' }];
  queryParams: any;
  signUpData: any;

  name = new FormControl('', [Validators.required]);
  userName = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  gender = new FormControl('', [Validators.required]);
  role = new FormControl('user', [Validators.required]);

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private toast: AlertService,
    private utils: UtilsService
  ) {
    this.signUpForm = fb.group({
      name: this.name,
      userName: this.userName,
      email: this.email,
      password: this.password,
      gender: this.gender,
      role: this.role,
    });
  }

  ngOnInit(): void {
    this.isLogin();
  }

  isLogin() {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.queryParams = params;
    });
    if (this.queryParams?.params?.admin) {
      this.signUpData = {
        isAdmin: 'true',
        heading: 'Create Account For User',
        buttonTitle: 'Add User',
      };
      this.utils.setUser(true);
    } else {
      this.signUpData = {
        isAdmin: 'false',
        heading: 'Create Your Account For Booking',
        buttonTitle: 'Sign Up',
      };
      this.utils.setUser(false);
    }
  }

  submit() {
    const data = {
      name: this.signUpForm.value.name,
      userName: this.signUpForm.value.userName,
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password,
      gender: this.signUpForm.value.gender,
      role: this.signUpForm.value.role,
    };

    this.api.signUpApi(data).subscribe(
      (res: any) => {
        if (res.success) {
          this.toast.success(res.msg);
          this.route.navigateByUrl('/Dashboard');
        } else {
          this.toast.danger(res.msg);
        }
      },
      (err: any) => {
        this.utils.catchBlock(err);
      }
    );
  }

  isAdmin(): boolean {
    if (this.signUpData.isAdmin == 'true') {
      return true;
    } else {
      return false;
    }
  }
}
