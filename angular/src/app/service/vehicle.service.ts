import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {AppSettings} from '../appSettings';
import 'rxjs/add/operator/map';
import { Contentmodel } from '../models/contentmodel';
@Injectable()
export class VehicleService { 
	 url: any;
	 dataValue: any;
	 httpOptions:any;
	 constructor(private http: HttpClient) {
		
	 };
	
	 contentlist(type:string, filter = '',sortColumn:string, sortOrder = 'asc',pageNumber:number, pageSize:number) {
		 	this.dataValue={'type':type.toString(),
			  'filter':filter,
			  'sortColumn':sortColumn,
			  'sortOrder':sortOrder,
			  'pageNumber':pageNumber.toString(),
			  'pageSize':pageSize.toString()				
			}
			return this.http.post<Contentmodel>(AppSettings.API_ENDPOINT+'vehicle.php',this.dataValue).map(Contentmodel => { 
					return Contentmodel;
				});			 
		};				  
		
		
		insert(data: any) {		
			return this.http.post<any>(AppSettings.API_ENDPOINT+'vehicle.php', data);
				
		};
		getList(data: any) {
			return this.http.post<any>(AppSettings.API_ENDPOINT+'vehicle.php', data)
				.map(content => {
					return content;
				});
		};
		deletedetails(data: any) {	
			return this.http.post<any>(AppSettings.API_ENDPOINT+'vehicle.php', data)
				.map(user => {
					return user;
				});
		};
}