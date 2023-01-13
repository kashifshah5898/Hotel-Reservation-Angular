import { Component, OnInit } from '@angular/core';
import { AlertService } from 'ngx-alerts';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(
    private api: ApiService,
    private toast: AlertService
  ) { }

  ngOnInit(): void {
    this.api.tempApi().subscribe((res: any) => {
      console.log('response: ', res);
      this.toast.success('success')
    }, (err) => {
      console.log('error: ', err);

    })
  }

}
