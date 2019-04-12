import { Component, Input } from '@angular/core';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
import {Observable} from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DataService } from "./service/data.service";
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import {Title} from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   layoutclass: any;
  title:string;
   subscription: Subscription;
   constructor(
	   private data: DataService, 
	   private router: Router,
       private activatedRoute: ActivatedRoute,
       private titleService: Title) {	
	  
	}
   ngOnInit() {
   	 this.data.currentMessage.subscribe(layoutclass => this.layoutclass = layoutclass);	 
	   this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map((route) => {
        while (route.firstChild) route = route.firstChild;		  
        return route;
      })
      .filter((route) => route.outlet === 'primary')
      .mergeMap((route) => route.data)
      .subscribe((event) => this.titleService.setTitle(event['title']));
	  
  }
  public setTitle(newTitle: string) {
    this.titleService.setTitle( newTitle );
  }
   
}
