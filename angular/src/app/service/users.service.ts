import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {AppSettings} from '../appSettings';
import 'rxjs/add/operator/map';
import { Usersmodel } from '../models/usersmodel';
@Injectable()
export class UsersService { 
	 url: any;
	 dataValue: any;
	 httpOptions:any;
	 constructor(private http: HttpClient) {
		 
	 };
	
		/*List of Content*/
		list(data: any): Observable<Usersmodel> {
			return this.http.post<Usersmodel>(AppSettings.NODE_ENDPOINT, data);
		};
		insert(data: any, operation:string) {
			console.log(data);
			//return false;
			if(operation=='insert'){
				var URL='userinsert';
			} else if(operation=='update'){
				var URL='userupdate';
			}
			
			return this.http.post<any>(AppSettings.NODE_ENDPOINT+URL, data)
				.map(user => {
					return user;
				});
		};
		upload(data: any) {			
			return this.http.post<any>(AppSettings.NODE_ENDPOINT+'userprofileupload', data)
				.map(user => {
					return user;
				});
		};
		getList(data: any): Observable<Usersmodel> { 		
			return this.http.post<Usersmodel>(AppSettings.NODE_ENDPOINT+'getlist', data);
			/*return this.http.post<any>(AppSettings.NODE_ENDPOINT+'getlist', data)
				.map(user => {
					return user;
				});*/
		};
		changestatus(data: any) {	
			return this.http.post<any>(AppSettings.NODE_ENDPOINT+'changestatus', data)
				.map(user => {
					return user;
				});
		};
		deletedetails(data: any) {		
			return this.http.post<any>(AppSettings.NODE_ENDPOINT+'delete', data)
				.map(user => {
					return user;
				});
		};
		
}