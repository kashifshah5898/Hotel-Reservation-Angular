import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { ApiService } from 'src/app/shared/api.service';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'app-user-dashobard',
  templateUrl: './user-dashobard.component.html',
  styleUrls: ['./user-dashobard.component.css'],
})
export class UserDashobardComponent implements OnInit {
  userData = this.utils.getLocalStorageData();

  rooms: any;
  isCreditCard: boolean = false;

  constructor(
    private api: ApiService,
    private route: Router,
    private toast: AlertService,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.getMyRooms();
    this.creditCard();
  }

  getMyRooms() {
    this.api.getMyRoomsAPI().subscribe(
      (res: any) => {
        const decryptedResponse = this.utils.decryptedText(res.data);
        this.rooms = decryptedResponse.length;
      },
      (err) => this.utils.catchBlock(err)
    );
  }

  creditCard() {
    this.api.getMyCardAPI().subscribe(
      (res: any) => {
        if (res.success) {
          this.isCreditCard = true;
        } else {
          this.isCreditCard = false;
        }
      },
      (error) => this.utils.catchBlock(error)
    );
  }
}
