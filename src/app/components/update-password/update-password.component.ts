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

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css'],
})
export class UpdatePasswordComponent {
  hide = true;
  hide2 = true;

  updatePasswordForm: FormGroup;
  oldPassword: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern('^[^\\s]+(\\s+[^\\s]+)*$'),
  ]);
  newPassword: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern('^[^\\s]+(\\s+[^\\s]+)*$'),
  ]);

  constructor(
    private toast: AlertService,
    private fb: FormBuilder,
    private api: ApiService,
    private utils: UtilsService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.bindingForm();
  }

  bindingForm() {
    this.updatePasswordForm = this.fb.group({
      oldPassword: this.oldPassword,
      newPassword: this.newPassword,
    });
  }

  submit() {
    const payload = {
      userId: this.utils.getLocalStorageData().id,
      newPassword: this.updatePasswordForm.value.newPassword,
      oldPassword: this.updatePasswordForm.value.oldPassword,
    };

    this.api.updateUserPasswordAPI(payload.userId, payload).subscribe(
      (res: any) => {
        if (res.success) {
          this.toast.success(res.msg);
          this.dialog.closeAll();
        } else {
          this.toast.danger(res.msg);
        }
      },
      (err) => this.utils.catchBlock(err)
    );
  }
}
