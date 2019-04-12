import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {AppSettings} from '../appSettings';

@Injectable()
export class AuthenticationService { 
	headers: any;
	 constructor(private http: HttpClient) { 	 		
		  this.headers = new HttpHeaders()
        				 .set('Content-Type', '*')
        				 .set('Access-Control-Allow-Headers', 'Content-Type');

	 }
		login(username: string, password: string) {			
			return this.http.post<any>(AppSettings.API_ENDPOINT+'authenticate.php', { username: username, password: password })
				.map(user => {
					return user;
				});
		}

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}