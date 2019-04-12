import { Injectable } from '@angular/core';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';

@Injectable()
export class LogService {
  userName = "Anant";
  constructor() { }
	
	getCustomers(): Promise<Hero[]> {
   		 return Promise.resolve(HEROES);
  	}
}
