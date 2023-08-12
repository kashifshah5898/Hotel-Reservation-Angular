import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'app-dashobard',
  templateUrl: './dashobard.component.html',
  styleUrls: ['./dashobard.component.css'],
})
export class DashobardComponent implements OnInit {
  userData = this.utils.getLocalStorageData();
  isAdmin: boolean = false;

  constructor(private utils: UtilsService) {
    if (this.userData.role === 'user') {
      this.isAdmin = false;
    } else {
      this.isAdmin = true;
    }
  }

  ngOnInit(): void {}
}
