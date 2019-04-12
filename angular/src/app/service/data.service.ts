import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class DataService {
  private messageSource = new BehaviorSubject<any>("default message");
  currentMessage = this.messageSource.asObservable();
  currentValue = this.messageSource.getValue();
  constructor() { }
  changeMessage(message: any) {
    this.messageSource.next(message);	
  }

	
}