import { Component, Input,OnInit, ViewChild,EventEmitter, OnDestroy, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AlertService } from '../toast/alert.service';
import { ContentService } from '../service/content.service';
import { VehicleService } from '../service/vehicle.service';
import { PageTitleService } from '../service/injectable/pagetitle.service';
import { Contentmodel } from '../models/contentmodel';
import { ToastService } from '../toast/toast.service';
import { SortService } from '../service/sort.service';
import {AppSettings} from '../appSettings';
import {MatTableDataSource, MatPaginatorModule,MatSortModule,MatSort,MatPaginator} from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-listvehicles',  //selector— the components CSS element selector
  templateUrl: './listvehicles.component.html'// templateUrl— the location of the component's template file.
})
export class ListvehiclesComponent implements OnInit {
  public statusTitle: string = 'Confirmation';
  public statusMessage: string = 'Do you want to change the status?';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
	//public heading: string; 
    description: string;
	model: any = {};
	dataValue:any={};
	data:any;
	dataSource:any;
	totalCountValue:number;
	responseValue:any={};
	searchKey:string;
	perPage:number=5;
	startIndex:number=0;
	pageEvent:any;
	messageOptions:any={};
	sortDirection:string='asc';
	order:string;
	columnName: string="name";
	checkbox: string;
  	selectedAll: any;
	vechicleDetails:any={};
	vechicleModel:string;
	vechicleManufacture:string;
    constructor(private alertService: AlertService,
			    private contentService: ContentService,
				private pageTitleService: PageTitleService,
				private toastService: ToastService,
				private spinner: NgxSpinnerService,
				private sortService: SortService,				
	            private vehicleService:VehicleService, 
			   ) {
		
	} 
	private columnSortedSubscription: Subscription;
	displayedColumns = ['serialNumber','manufacture','model','count','action'];
	columnsToDisplay = ['userName', 'age'];
	@ViewChild(MatPaginator) paginator: MatPaginator;
	
	
	
  	ngOnInit() {
		/** spinner starts on init */
    	this.spinner.show();
		
		// subscribe to sort changes so we can react when other columns are sorted
        this.columnSortedSubscription = this.sortService.columnSorted$.subscribe(event => {
			//console.log(event);
            // reset this column's sort direction to hide the sort icons
            if (this.columnName != event.sortColumn) {
                this.sortDirection = '';
                this.columnName = '';
            }
        });
		
		
   	    this.pageTitleService.setTitle("Vehicles Listing");	
		this.vehicleService.contentlist('list','',this.columnName,this.sortDirection,0,this.perPage)
		.subscribe(
			Contentmodel => {				
				this.data=Contentmodel.result;
				this.totalCountValue=Contentmodel.totalCount;
				 this.spinner.hide();
			},
			error => {
				this.alertService.error(error);				
			});
 	}
	
	selectAll() {
		for (var i = 0; i < this.data.length; i++) {			
		  this.data[i].selected = this.selectedAll;
			console.log(this.data);
		}		
	  }
	checkIfAllSelected() {
		console.log(this.data);
		this.selectedAll = this.data.every(function(item:any) {		
			return item.selected == true;
		  });
		this.selectedOptions();
  	}
	 get selectedOptions() { // right now: ['1','3']
		return this.data
				  .filter(opt => opt.selected)
				  .map(opt => opt.id)
	  }
	sort(value: string) {
		this.columnName=value;
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        this.sortService.columnSorted({ sortColumn: value, sortDirection: this.sortDirection });
		var inputdata={'filter':this.searchKey,'columnName':this.columnName,'sortOrder':this.sortDirection,'pageNumber':0, pageSize:this.perPage}
		this.list(inputdata);
    }
	
	onPaginateChange(event){
		this.startIndex = event.pageIndex * event.pageSize;		
		var inputdata={'filter':this.searchKey,'columnName':this.columnName,'sortOrder':this.sortDirection,'pageNumber':this.startIndex, pageSize:this.perPage}
		this.list(inputdata);
	  }
	applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); 
		filterValue = filterValue.toLowerCase();
		this.data.filteredData = filterValue;
		this.searchKey= filterValue.trim();
		var inputdata={'filter':this.searchKey,'columnName':this.columnName,'sortOrder':this.sortDirection,'pageNumber':0, pageSize:this.perPage}
		this.list(inputdata);	
	};
	list(inputdata:any){
		/** spinner starts on init */
    	
		 this.vehicleService.contentlist('list',this.searchKey,inputdata.columnName,inputdata.sortOrder,inputdata.pageNumber,inputdata.pageSize)
		.subscribe(
			responseValue => {				
				this.data =responseValue.result;
				this.totalCountValue=responseValue.totalCount;
				
			},
			error => {
				this.messageOptions = {
						title: AppSettings.ERRORTITLE,
						msg: AppSettings.WARNINGMESSAGE,
						type: "warning"
					};
				 this.toastService.addToast(this.messageOptions);
				
			});
	}
	
	delete(details:any){
		var deleteData={'type':'delete','manufacturer_id':details.manufacturer_id,'model':details.model};
		this.vehicleService.deletedetails(deleteData)
		.subscribe(
			responseValue => {
				if(responseValue.code==200){
					var inputdata={'filter':this.searchKey,'columnName':this.columnName,'sortOrder':this.sortDirection,'pageNumber':this.startIndex, pageSize:this.perPage}
					this.list(inputdata);
					this.messageOptions = {
						    title: AppSettings.SUCCESSTITLE,
							msg: AppSettings.DELETEMESSAGE,
							type: "success"
						};
				 this.toastService.addToast(this.messageOptions);
					//this.alertService.success('Successfully deleted.');					
				}else{
					this.messageOptions = {
						title: AppSettings.WARNINGTITLE,
						msg: AppSettings.WARNINGMESSAGE,
						type: "warning"
					};
				 this.toastService.addToast(this.messageOptions);
				}				
			},
			error => {
				this.messageOptions = {
						title: AppSettings.ERRORTITLE,
						msg: error,
						type: "error"
					};
				this.toastService.addToast(this.messageOptions);
			});
	};
	showDetails(details:any){
		this.spinner.show();
		this.vechicleModel=details.model;
		this.vechicleManufacture=details.name;
		this.vechicleDetails=details.vehicle_details;
		this.spinner.hide();
	}

}


