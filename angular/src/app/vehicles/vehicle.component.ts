import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../toast/alert.service';
import { VehicleService } from '../service/vehicle.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PageTitleService } from '../service/injectable/pagetitle.service';
import { ToastService } from '../toast/toast.service';
import { AppSettings } from '../appSettings';
import { NgxSpinnerService } from 'ngx-spinner';
import { ManufacturerService } from '../service/manufacturer.service';
@Component({
	selector: 'app-vehicle',
	templateUrl: './vehicle.component.html',
	styleUrls: ['./vehicle.component.css'] 
})
export class VehicleComponent implements OnInit {

	description: string;
	subtitle: string;
	model: any = {};
	dataValue: any = {};
	messageOptions: any = {};
	data: any;
	contentId: string;
	colourLists: any = [];
	yearLists: any = [];
	manufacturerLists:any=[];
	urls = [];
	selectedFile=[];
	constructor(private alertService: AlertService,
		private route: ActivatedRoute,
		private router: Router,
		private toastService: ToastService,
		private pageTitleService: PageTitleService,
	    private vehicleService:VehicleService,
		private spinner: NgxSpinnerService,
	   private manufacturerService:ManufacturerService	
	) {
		
	}
	ngOnInit() {
		/** spinner starts on init */
		this.spinner.show();
		this.pageTitleService.setTitle("Vehicles Managment");
			this.subtitle = 'Add';
			this.spinner.hide();
		this.pageTitleService.setTitle("Vehicles Managment");
		
		this.model.manufacturer='';
		this.model.color='';
		this.model.year='';
		this.yearLists=[{"year":"2015"},{"year":"2016"},{"year":"2017"},{"year":"2018"},{"year":"2019"}];
		this.colourLists=[{"colour":"Red"},{"colour":"Yelow"},{"colour":"Blue"},{"colour":"White"},{"colour":"Black"}];
		this.getManufacturerList();
	}
	getManufacturerList() {
			var getValue = { type: 'listing'};
			this.manufacturerService.list(getValue)
				.subscribe(
					data => {

						if (data.code == 200) {
							this.manufacturerLists=data.response;
							
							this.spinner.hide();
						} else {

						}
					},
					error => {
						this.messageOptions = {
							title: AppSettings.ERRORTITLE,
							msg: error,
							type: "error"
						};
						this.toastService.addToast(this.messageOptions);
						this.spinner.hide();
					});
		};
	
	  onSelectFile(event) {
		if (event.target.files && event.target.files[0]) {
			var filesAmount = event.target.files.length;
			if(filesAmount<2){				
				for (let i = 0; i < filesAmount; i++) {					
					   let fileItem=event.target.files[0];
					 var ext = event.target.files[0].name.match(/\.(.+)$/)[1];
					var extList = ['jpg', 'jpeg', 'png', 'JPG', 'JPEG', 'PNG'];
					if (event.target.files && extList.indexOf(ext) !== -1) {
							var reader = new FileReader();						
							reader.onload = (e: any) => {						
								 this.urls.push(e.target.result)
							}
							reader.readAsDataURL(event.target.files[i]);
					}else{
						 this.messageOptions = {
								title: 'Invalid',
								msg: 'Invalid image format. Valid formats are jpg, jpeg, png.',
								type: 'error'
							};
						this.toastService.addToast(this.messageOptions);

					}
				}			
			}else{
				this.urls=[];
				this.messageOptions = {
						title: 'Invalid',
						msg: 'Only 2 images can upload!',
						type: 'error'
					};
				this.toastService.addToast(this.messageOptions);
				
			}
		}
	  }
	
	
	/*Save Vehicle*/
	vehicleSubmit(): void {
		
			
		  this.spinner.show();
			this.dataValue = {
				type: 'insert',
				name: this.model.name,
				model: this.model.vechicle_model,
				manufacturer_id: this.model.manufacturer,
				color: this.model.color,
				year: this.model.year,
				registration_number: this.model.registration_number,				
				note: this.model.note,
				url:this.urls
			};
		

		this.vehicleService.insert(this.dataValue).subscribe(
			data => {
				if (data.code == 200) {
					this.messageOptions = {
						title: AppSettings.SUCCESSTITLE,
						msg: AppSettings.SAVEMESSAGE,
						type: "success"
					};
					this.toastService.addToast(this.messageOptions);
					this.urls=[];
					this.router.navigateByUrl('/vehicles');
				} else {
					this.messageOptions = {
						title: AppSettings.ERRORTITLE,
						msg: data.message,
						type: "error"
					};
					this.toastService.addToast(this.messageOptions);
					this.spinner.hide();
				}
			},
			error => {
				this.messageOptions = {
					title: AppSettings.ERRORTITLE,
					msg: error,
					type: "error"
				};
				this.toastService.addToast(this.messageOptions);
				this.spinner.hide();
			});
	};

	


}
