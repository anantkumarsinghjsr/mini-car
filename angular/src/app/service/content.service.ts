import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {AppSettings} from '../appSettings';
import 'rxjs/add/operator/map';
import { Contentmodel } from '../models/contentmodel';
@Injectable()
export class ContentService { 
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
	
	 contentlist(type:string, filter = '',sortColumn:string, sortOrder = 'asc',pageNumber:number, pageSize:number) {
		 	this.dataValue={'type':type.toString(),
			  'filter':filter,
			  'sortColumn':sortColumn,
			  'sortOrder':sortOrder,
			  'pageNumber':pageNumber.toString(),
			  'pageSize':pageSize.toString()				
			}
			return this.http.post<Contentmodel>(AppSettings.API_ENDPOINT+'content.php',this.dataValue).map(Contentmodel => { 
					return Contentmodel;
				});			 
		};					  
		/**
		 * Get user employee details
		 * @param userDetails 
		 */
		getEmployeeList(): Observable<any> {			
			const request = {
			'headers': {				
				'PATCHERAUTHKEY': 'Zm18zsH+QyEoQF7L5G6FNT+NK+0YPVK7RGmYzQFx8AOWS/8pFpfcq03z5keqZCGkA+woy3Uo4UObZo1geljvaA=='
			},
			'url': 'http://35.176.36.170/patcherapi-dev/index.php/vehiclesInfo/getVehicleClassificationList',
			'params': {"user_id": 427,"contact_number": "8961127410","otp": "4303"}
			};
			return this.http.post<any>(request.url, request.params, { headers: request.headers });
		}
		/*List of Content*/
			
		listObservable(data: any): Observable<Contentmodel>{				
				return this.http.post<Contentmodel>(AppSettings.API_ENDPOINT+'content.php', data);
					
			};
		/*List of Content*/
		list(data: any) {	
			//console.log(data.type.toString());
			return this.http.post<any>(AppSettings.API_ENDPOINT+'content.php', data)
				.map(content => {
					return content;
				});
		};
		insert(data: any) {		
			return this.http.post<any>(AppSettings.API_ENDPOINT+'content.php', data)
				.map(user => {
					return user;
				});
		};
		getList(data: any) {
			return this.http.post<any>(AppSettings.API_ENDPOINT+'content.php', data)
				.map(content => {
					return content;
				});
		};
		changestatus(data: any) {		
			return this.http.post<any>(AppSettings.API_ENDPOINT+'content.php', data)
				.map(user => {
					return user;
				});
		};
		deletedetails(data: any) {		
			return this.http.post<any>(AppSettings.API_ENDPOINT+'content.php', data)
				.map(user => {
					return user;
				});
		};
		
}