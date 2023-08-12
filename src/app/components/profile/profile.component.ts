import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from 'ngx-alerts';
import { ApiService } from 'src/app/shared/api.service';
import { UtilsService } from 'src/app/shared/utils.service';
import { UpdatePasswordComponent } from '../update-password/update-password.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  userInfo: any;

  apiRes: any;
  genderDrop = [{ value: 'Male' }, { value: 'Female' }];
  updateUserForm: FormGroup;
  name: FormControl = new FormControl('', Validators.required);
  userName: FormControl = new FormControl('', Validators.required);
  gender: FormControl = new FormControl('', Validators.required);
  email: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(
    private utils: UtilsService,
    private api: ApiService,
    private toast: AlertService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.userInfo = this.utils.getLocalStorageData();
    this.bindingForm();
  }

  bindingForm() {
    this.updateUserForm = this.fb.group({
      name: this.name,
      userName: this.userName,
      email: this.email,
      gender: this.gender,
    });

    this.getUserInfo();
  }

  getUserInfo() {
    this.api.getMeAPI(this.userInfo.id).subscribe(
      (res: any) => {
        if (res.success) {
          const decryptedResponse = this.utils.decryptedText(res.data);
          this.apiRes = decryptedResponse;

          this.updateUserForm.controls['userName'].setValue(
            this.apiRes.userName
          );
          this.updateUserForm.controls['userName'].disable();
          this.updateUserForm.controls['name'].setValue(this.apiRes.name);
          this.updateUserForm.controls['gender'].setValue(this.apiRes.gender);
          this.updateUserForm.controls['email'].setValue(this.apiRes.email);
        } else {
          this.toast.danger(res.msg);
        }
      },
      (err) => this.utils.catchBlock(err)
    );
  }

  updateUser() {
    const payload = {
      name: this.updateUserForm.value.name,
      email: this.updateUserForm.value.email,
      gender: this.updateUserForm.value.gender,
    };
    const myInfo = this.utils.getLocalStorageData();
    this.api.updateUserAPI(myInfo.id, payload).subscribe(
      (res: any) => {
        if (res.success) {
          console.log('res.data', this.utils.decryptedText(res.data));

          localStorage.setItem('userData', JSON.stringify(res.data));
          this.toast.info(res.msg);
        } else {
          this.toast.danger(res.msg);
        }
      },
      (err) => this.utils.catchBlock(err)
    );
  }

  updatePassword() {
    const openUpdatePasswordModal = this.dialog.open(UpdatePasswordComponent, {
      width: '60%',
      disableClose: true,
    });
  }
}
