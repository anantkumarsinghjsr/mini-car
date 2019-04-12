import { Component, OnInit, } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
//import { forbiddenNameValidator } from '../shared/forbidden-name.directive';
import { AuthenticationService } from '../service/authentication.service'; 

import { AlertService } from '../toast/alert.service';
import { ToastService } from '../toast/toast.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-login',  //selector— the components CSS element selector
  templateUrl: './login.component.html', // templateUrl— the location of the component's template file.
  styleUrls: ['./login.component.css'] //styleUrls— the location of the component's private CSS styles.
})
export class LoginComponent implements OnInit {
	heading: string;
  	description: string;
	returnUrl: string;
	model: any = {};
	messageOptions: any = {};
    constructor(private alertService: AlertService,
				private route: ActivatedRoute,
        		private router: Router,
				private toastService: ToastService,
				private authenticationService:AuthenticationService,
				private spinner: NgxSpinnerService
			   ) {
				
	}
	
	data: string;
	login = {username: '', password: ''};
	
	ngOnInit() {
		this.spinner.show();
		setTimeout(() => {
			this.spinner.hide();
    	},1000);
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/' http://jasonwatmore.com/post/2017/06/25/angular-2-4-alert-toaster-notifications
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
	
	
	
   
	userLogin(): void{
		this.spinner.show();
		this.authenticationService.login(this.model.username, this.model.password)
		.subscribe(
			data => {
                console.log(data);
				if(data.code==201){
				// this.alertService.error(data.message);
					this.messageOptions = {
						title: "Error",
						msg: data.message,
						type: "error"
					};
				  this.toastService.addToast(this.messageOptions);
					this.spinner.hide();
				}else if(data.code==200){
					this.messageOptions = {
						    title: "Successfully",
							msg: "Successfully login.",
							type: "success"
						};
					 this.toastService.addToast(this.messageOptions);
					
					localStorage.setItem('currentUser', JSON.stringify(data.response));
					this.router.navigate(['/vehicles']);					
				}
			},
			error => {
			     this.messageOptions = {
						title: "Error",
						msg: error,
						type: "error"
					};
				 this.toastService.addToast(this.messageOptions);
				
				this.spinner.hide();
			});
	
	};
	
}
