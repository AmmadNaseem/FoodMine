import { Injectable } from '@angular/core';
import {HttpRequest,HttpHandler,HttpEvent,HttpInterceptor,HttpEventType} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';

var pendingRequests = 0; //THIS HANDLES THE MULTIPLE REQUESTS GOES TO THE SERVER.BECAUSE WE DON'T WANT TO SHOW LOADING MULTIPLE TIME AT SINGLE PAGE.WE SHOW THE LOADING WHEN ALL THE PENDING REQUESTS FINISHED THEN HIDE THE LOADING.

@Injectable()

export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // alert("i am interceptor");
    this.loadingService.showLoading();

    pendingRequests = pendingRequests + 1;

    return next.handle(request).pipe(
      tap({
        next:(event) => {
          if(event.type === HttpEventType.Response){ //THAT MEANS REQUEST IS FINISHED.
            this.handleHideLoading();
          }
        },
        error: (_) => {
          this.handleHideLoading();
        }
      })
    );
  }

  handleHideLoading(){
    pendingRequests = pendingRequests - 1;
    if(pendingRequests === 0)
    this.loadingService.hideLoading();
  }
}
