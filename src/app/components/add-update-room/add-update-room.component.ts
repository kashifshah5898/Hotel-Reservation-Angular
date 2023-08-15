import { UtilsService } from 'src/app/shared/utils.service';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { AlertService } from 'ngx-alerts';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-add-update-room',
  templateUrl: './add-update-room.component.html',
  styleUrls: ['./add-update-room.component.css'],
})
export class AddUpdateRoomComponent implements OnInit {
  form: any;

  roomNo = new FormControl('', Validators.required);
  additionalInfo = new FormControl('', Validators.required);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<AddUpdateRoomComponent>,
    private toast: AlertService,
    private api: ApiService,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      roomNo: this.roomNo,
      additionalInfo: this.additionalInfo,
    });

    if (this.data) {
      this.form.controls['roomNo'].setValue(this.data.number);
      this.form.controls['additionalInfo'].setValue(this.data.additionalInfo);
    }
  }

  save() {
    if (this.data) {
      const formValues = {
        number: this.form.value.roomNo,
        additionalInfo: this.form.value.additionalInfo || 'No Additional Info',
      };

      this.api.updateRoomAPI(this.data._id, formValues).subscribe(
        (res: any) => {
          if (res.success) {
            this.toast.success(res.msg);
            this.dialog.closeAll();
          } else {
            this.toast.warning(res.msg);
          }
        },
        (err) => {
          this.toast.warning(err.error.msg);
        }
      );
    } else {
      const formValues = {
        number: this.form.value.roomNo,
        additionalInfo: this.form.value.additionalInfo || 'No Additional Info',
      };

      this.api.addRoomAPI(formValues).subscribe(
        (res: any) => {
          if (res.success) {
            this.toast.success(res.msg);
            this.dialog.closeAll();
          } else {
            this.toast.warning(res.msg);
          }
        },
        (err) => {
          this.toast.warning(err.error.msg);
        }
      );
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
