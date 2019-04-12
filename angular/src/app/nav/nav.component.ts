import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { AlertService } from '../toast/alert.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastService } from '../toast/toast.service';
@Component({
  selector: 'app-nav',  //selector— the components CSS element selector
  templateUrl: './nav.component.html',// templateUrl— the location of the component's template file.
  
})

export class NavComponent implements OnInit {
	 loginresponse:any;
	 logincredential:any;
	 username:string;
	 useremail:string;
  messageOptions:any={};
	 constructor(private alertService: AlertService,
				private authenticationService:AuthenticationService,				
				private route: ActivatedRoute,
				private router: Router,
				private toastService: ToastService,
				private spinner: NgxSpinnerService
				){
	 
	 }

	ngOnInit() {
     this.loginresponse=localStorage.getItem('currentUser');
	   this.logincredential=JSON.parse(this.loginresponse);		
	   this.username=this.logincredential.name;
	   this.useremail=this.logincredential.email;
    }
	
	userLogout(){
    this.spinner.show();
		this.authenticationService.logout();
		this.alertService.success("You have successfully logout.");
    this.messageOptions = {
						title: "Success",
						msg: "You have successfully logout.",
						type: "success"
		};
		this.toastService.addToast(this.messageOptions);    
		this.router.navigate(['/login']);
	};
}
