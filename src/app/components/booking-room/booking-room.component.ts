import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { ApiService } from 'src/app/shared/api.service';
import { UtilsService } from 'src/app/shared/utils.service';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-booking-room',
  templateUrl: './booking-room.component.html',
  styleUrls: ['./booking-room.component.css'],
})
export class BookingRoomComponent implements OnInit {
  paramId: string = '';
  room: any;
  bookRoomForm: FormGroup;
  userData = this.utils.getLocalStorageData();

  bookedFor = new FormControl('', [Validators.required]);
  additionalInfo = new FormControl('', [Validators.required]);
  bookingStart = new FormControl('', [Validators.required]);
  bookingEnd = new FormControl('', [Validators.required]);

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private toast: AlertService,
    private utils: UtilsService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.bookRoomForm = fb.group({
      bookedFor: this.bookedFor,
      additionalInfo: this.additionalInfo,
      bookingStart: this.bookingStart,
      bookingEnd: this.bookingEnd,
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      this.paramId = params.id;
    });
    this.api.getRoomAPI(this.paramId).subscribe(
      (res: any) => {
        const decryptedResponse = this.utils.decryptedText(res.data);
        this.room = decryptedResponse;
      },
      (err) => this.utils.catchBlock(err)
    );
  }

  submit() {
    const data = {
      roomNo: this.paramId,
      bookedBy: this.userData.id,
      bookingStart: '2023-08-21',
      bookingEnd: '2023-08-22',
      bookedFor: 'Kashif',
      additionalInfo: 'No additonal info',
    };

    this.api.bookRoomAPI(data).subscribe(
      (res: any) => {
        if (res.success) {
          this.toast.success(res.msg);
          this.route.navigateByUrl('/Booking');
        } else {
          this.toast.danger(res.msg);
        }
      },
      (err: any) => {
        this.utils.catchBlock(err);
      }
    );
  }
}
