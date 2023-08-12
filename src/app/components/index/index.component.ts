import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { ApiService } from 'src/app/shared/api.service';
import { UtilsService } from 'src/app/shared/utils.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  images = [
    { path: '../../../assets/images/Slider-1.jpg' },
    { path: '../../../assets/images/Slider-2.jpg' },
    { path: '../../../assets/images/Slider-3.jpg' },
  ];

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
    console.log(room);

    if (this.utils.getUserToken()) {
      this.route.navigateByUrl('/Dashboard');
    } else {
      this.route.navigateByUrl('/login');
    }
  }

  getImage(index: number) {
    return `https://source.unsplash.com/${1600 + index}x800/?hotelRooms`;
  }
}
