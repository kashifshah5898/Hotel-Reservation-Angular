import { Component, OnInit } from '@angular/core';
import { AlertService } from 'ngx-alerts';
import { ApiService } from 'src/app/shared/api.service';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  constructor(
    private api: ApiService,
    private toast: AlertService,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {}
}
