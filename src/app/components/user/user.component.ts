import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { AlertService } from 'ngx-alerts';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/shared/utils.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  displayedColumns: string[] = ['Name', 'Email', 'Gender', 'Role', 'action'];
  dataSource: MatTableDataSource<any>;
  users: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private api: ApiService,
    private toast: AlertService,
    private route: Router,
    private utils: UtilsService
  ) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit(): void {
    this.getUsers();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getUsers() {
    this.api.getUsersAPI().subscribe(
      (res: any) => {
        const decryptedResponse = this.utils.decryptedText(res.data);
        this.users = decryptedResponse;

        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
      },
      (err) => this.utils.catchBlock(err)
    );
  }

  deleteUser(data: any) {
    this.api.deleteUserAPI(data._id).subscribe(
      (res: any) => {
        this.toast.success(res.msg);
        this.getUsers();
      },
      (err) => this.utils.catchBlock(err)
    );
  }

  routeToSignUp() {
    this.route.navigate(['/Sign-Up'], {
      queryParams: { admin: true },
    });
  }
}
