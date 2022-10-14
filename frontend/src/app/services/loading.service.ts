import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);

  constructor() { }

  showLoading(){
    this.isLoadingSubject.next(true);
  }

  hideLoading(){
    this.isLoadingSubject.next(false);
  }

  get isLoading(){
    return this.isLoadingSubject.asObservable();//BY RETURNING THE SUBJECT AS OBSERVABLE CAN MAKE SURE NOBODY CAN CHANGE ITS VALUE OUTSIDE.
  }
}
