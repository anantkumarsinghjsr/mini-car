import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {AppSettings} from '../appSettings';
import 'rxjs/add/operator/map';
import { Contentmodel } from '../models/contentmodel';
@Injectable()
export class ManufacturerService { 
	 url: any;
	 dataValue: any;
	httpOptions:any;
	 constructor(private http: HttpClient) {
		 /*this.httpOptions = {
		  headers: new HttpHeaders({
			'Authorization': 'my-auth-token'
		  })
		};*/
	 };
	
	 
	insert(data: any) {		
	
		 return this.http.post<any>(AppSettings.API_ENDPOINT+'manufacturer.php', data);
	};
	list(data: any) {
		
		return this.http.post<any>(AppSettings.API_ENDPOINT+'manufacturer.php', data);		
	};	
		
}