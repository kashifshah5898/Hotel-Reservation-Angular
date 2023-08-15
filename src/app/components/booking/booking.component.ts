import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { ApiService } from 'src/app/shared/api.service';
import { UtilsService } from 'src/app/shared/utils.service';
import { AddUpdateRoomComponent } from '../add-update-room/add-update-room.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  rooms: any;
  userData = this.utils.getLocalStorageData();

  constructor(
    private api: ApiService,
    private toast: AlertService,
    private utils: UtilsService,
    private route: Router,
    private dialog: MatDialog
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

  addRoom() {
    const addRoom = this.dialog.open(AddUpdateRoomComponent, {
      width: '60%',
      disableClose: true,
    });

    addRoom.afterClosed().subscribe(() => {
      this.getAllRooms();
    });
  }

  updateRoom(data: any) {
    const updateRoom = this.dialog.open(AddUpdateRoomComponent, {
      width: '60%',
      data: data,
      disableClose: true,
    });

    updateRoom.afterClosed().subscribe(() => {
      this.getAllRooms();
    });
  }

  deleteRoom(data: any) {
    this.api.deleteRoomAPI(data._id).subscribe(
      (res: any) => {
        this.getAllRooms();
        this.toast.success(res.msg);
      },
      (err) => this.utils.catchBlock(err)
    );
  }
}
