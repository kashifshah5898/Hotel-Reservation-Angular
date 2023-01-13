import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UtilsService } from './utils.service';
import { map } from 'rxjs/operators';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  token: any;
  omitCalls = ['auth'];
  skipInterceptor = false;



  constructor(
    private route: Router,
    private ngxService: NgxUiLoaderService,
    private utils: UtilsService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.ngxService.start();

    this.omitCalls.forEach(api => {
      if (req.url.includes(api)) {
        this.skipInterceptor = true;
      }
    });

    this.token = this.utils.getUserToken();
    if (this.token || this.skipInterceptor) {
      const tokenizedReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + this.token.token) });
      return next.handle(tokenizedReq).pipe(map((event: HttpEvent<any>) => {
        this.ngxService.stop();
        if (event instanceof HttpResponse) {
          if (event.status === 401) {
            this.utils.userLoggedOut();
            this.route.navigateByUrl('/');
          }
        }

        return event;
      }));
    }
    else {
      this.ngxService.stop();

      const unAuth = ['/']
      this.ngxService.stop();
      if (unAuth.includes(this.route.url)) { } else {
        this.utils.userLoggedOut();
        this.route.navigateByUrl('/');
      }
    }

    return next.handle(req);
  }
}
