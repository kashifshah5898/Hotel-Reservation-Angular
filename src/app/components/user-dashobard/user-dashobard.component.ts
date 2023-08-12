import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'app-user-dashobard',
  templateUrl: './user-dashobard.component.html',
  styleUrls: ['./user-dashobard.component.css'],
})
export class UserDashobardComponent implements OnInit {
  userData = this.utils.getLocalStorageData();
  constructor(private utils: UtilsService) {}

  ngOnInit(): void {}
}
