import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../toast/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PageTitleService } from '../service/injectable/pagetitle.service';
import { ToastService } from '../toast/toast.service';
import { AppSettings } from '../appSettings';
import { NgxSpinnerService } from 'ngx-spinner';
import { ManufacturerService } from '../service/manufacturer.service';

@Component({
	selector: 'app-manufacturer',
	templateUrl: './manufacturer.component.html'
})
export class ManufacturerComponent implements OnInit {

	description: string;
	subtitle: string;
	model: any = {};
	dataValue: any = {};
	messageOptions: any = {};
	data: any;
	manufacturerId: number;
	ckeditorContent: string = '<p>Some html</p>';
	isSubmit:boolean = false;
	 requestLists: any = [];
	constructor(private alertService: AlertService,
		private route: ActivatedRoute,
		private router: Router,
		private toastService: ToastService,
		private pageTitleService: PageTitleService,
		private spinner: NgxSpinnerService,
		private manufacturerService:ManufacturerService		 
	) {
		
	}
	ngOnInit() {
		/** spinner starts on init */
		this.spinner.show();
		this.pageTitleService.setTitle("Manufacturer");
		this.subtitle = 'Add';
		this.spinner.hide();
		this.pageTitleService.setTitle("Manufacturer Management");
		var getValue = { type: 'get', 'id': 8 };
		this.isSubmit=true;
		this.getList();
	}

	manufacturerSubmit(): void {
		
		this.spinner.show();
		this.dataValue = {
				type: 'insert',
				name: this.model.name				
			};

		this.manufacturerService.insert(this.dataValue).subscribe(
			data => {
				if (data.code == 200) {
					this.messageOptions = {
						title: AppSettings.SUCCESSTITLE,
						msg: AppSettings.SAVEMESSAGE,
						type: "success"
					};
					this.model.name='';
					this.getList();
					this.toastService.addToast(this.messageOptions);
					this.spinner.hide();
					this.router.navigateByUrl('/manufacturer');
					this.isSubmit=false;
				} else {
					this.messageOptions = {
						title: AppSettings.WARNINGTITLE,
						msg: AppSettings.WARNINGMESSAGE,
						type: "warning"
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
				//this.alertService.error(error);
				this.spinner.hide();
			});
	};

	getList() {
		var getValue = { type: 'listing'};
		this.manufacturerService.list(getValue)
			.subscribe(
				data => {
					
					if (data.code == 200) {
						this.requestLists=data.response;
						/** spinner starts on init */
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


}
