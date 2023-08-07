import { Component, OnInit, ViewChild } from '@angular/core';
import { UtilsService } from 'src/app/shared/utils.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  name: string = this.utils.getLocalStorageData().name;

  constructor(private utils: UtilsService) {}
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav | undefined;

  ngOnInit() {
    console.log(
      'this.utils.getLocalStorageData() : ',
      this.utils.getLocalStorageData()
    );
  }
}
