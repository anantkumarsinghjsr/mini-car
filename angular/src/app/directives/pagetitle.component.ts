import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PageTitleService } from '../service/injectable/pagetitle.service';
@Component({
  selector: 'app-pagetitle',  //selector— the components CSS element selector
  templateUrl: './pagetitle.component.html',// templateUrl— the location of the component's template file.
  
})

export class PagetitleComponent implements OnInit {
	 header: string;
	 constructor(private pageTitleService: PageTitleService){
	 
	 }

	ngOnInit() {
      this.pageTitleService.title.subscribe((val: string) => {
            this.header = val;
       });
    }
	
}
