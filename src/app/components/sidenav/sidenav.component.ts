import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
  userData = this.utils.getLocalStorageData();
  toogle: boolean = true;
  navItems = {
    dashboard: {
      label: 'Dashboard',
      router: '/Dashboard',
      routerActive: 'navbar-button-active',
      icon: 'assets/images/dashboard-2-svgrepo-com (1).svg',
      iconWidth: 20,
      iconHeight: 20,
    },
    myBookings: {
      label: 'My-Bookings',
      router: '/My-Bookings',
      routerActive: 'navbar-button-active',
      icon: 'assets/images/american-football-player-svgrepo-com (1).svg',
      iconWidth: 20,
      iconHeight: 20,
    },
    RoomBooking: {
      label: 'Bookings',
      router: '/Booking',
      routerActive: 'navbar-button-active',
      icon: 'assets/images/add-plus-square-svgrepo-com.svg',
      iconWidth: 20,
      iconHeight: 20,
    },
    users: {
      label: 'Users',
      router: '/Users',
      routerActive: 'navbar-button-active',
      icon: 'assets/images/add-plus-square-svgrepo-com.svg',
      iconWidth: 20,
      iconHeight: 20,
    },
    creditCard: {
      label: 'Credit Card',
      router: '/Credit-Card',
      routerActive: 'navbar-button-active',
      icon: 'assets/images/add-plus-square-svgrepo-com.svg',
      iconWidth: 20,
      iconHeight: 20,
    },
  };

  constructor(public route: Router, private utils: UtilsService) {}

  ngOnInit(): void {
    if (window.screen.width <= 575) {
      this.toogle = false;
    }
  }

  logout() {
    this.utils.userLoggedOut();
    this.utils.setUser(false);
  }

  onToogleHandler(): void {
    this.toogle = !this.toogle;
  }

  isAdmin() {
    return this.utils.isAdminUser();
  }
}
