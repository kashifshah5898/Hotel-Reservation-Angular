import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { ApiService } from 'src/app/shared/api.service';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'app-admin-dashobard',
  templateUrl: './admin-dashobard.component.html',
  styleUrls: ['./admin-dashobard.component.css'],
})
export class AdminDashobardComponent implements OnInit {
  rooms: any;
  users: any;

  constructor(
    private api: ApiService,
    private route: Router,
    private toast: AlertService,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.getAllRooms();
    this.getAllUsers();
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

  getAllUsers() {
    this.api.getUsersAPI().subscribe(
      (res: any) => {
        const decryptedResponse = this.utils.decryptedText(res.data);
        this.users = decryptedResponse;
      },
      (err) => this.utils.catchBlock(err)
    );
  }
}
