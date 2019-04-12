import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { AlertService } from '../toast/alert.service';
@Component({
  selector: 'footer-section',  //selector— the components CSS element selector
  templateUrl: './footer.component.html',// templateUrl— the location of the component's template file.
  
})

export class FooterComponent implements OnInit {
	 loginresponse:any;
	 logincredential:any;
	 username:string;
	 useremail:string;
	 constructor(			
				private route: ActivatedRoute,
				private router: Router
				){
	 
	 }

	ngOnInit() {
       
    }
}
