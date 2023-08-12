import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { ApiService } from 'src/app/shared/api.service';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  rooms: any;

  constructor(
    private api: ApiService,
    private toast: AlertService,
    private utils: UtilsService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.getAllRooms();
  }

  getAllRooms() {
    this.api.getRoomsApi().subscribe(
      (res: any) => {
        const decryptedResponse = this.utils.decryptedText(res.data);
        this.rooms = decryptedResponse;
      },
      (err) => this.utils.catchBlock(err)
    );
  }

  bookRoom(room: any) {
    this.route.navigate(['/Booking-Room', room._id]);
  }

  getImage(index: number) {
    return `https://source.unsplash.com/${1600 + index}x800/?hotelRooms`;
  }
}
