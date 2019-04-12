import { BrowserModule,Title } from '@angular/platform-browser';
import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule,ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { AppRoutingModule }     from './app-routing.module';
import { AuthGuard } from './guards/auth.guards';
import { AppComponent } from './app.component';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';


import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatSort, MatTableModule,MatToolbarModule} from "@angular/material";
import { NavComponent } from './nav/nav.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';

import {ToastyModule} from 'ng2-toasty';

import { LoginComponent } from './login/login.component'; 


import { FooterComponent } from './directives/footer.component';
import { AlertComponent } from './directives/alert.component';
import { PagetitleComponent } from './directives/pagetitle.component';

import { DataService } from './service/data.service';
import { ToastService } from './toast/toast.service';
import { AlertService } from './toast/alert.service';
import { AuthenticationService } from './service/authentication.service';
import { SortService } from './service/sort.service';
import { ContentService } from './service/content.service';
import { UsersService } from './service/users.service';
import { PageTitleService } from './service/injectable/pagetitle.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';


import { ManufacturerComponent } from './manufacturer/manufacturer.component';
import { VehicleComponent } from './vehicles/vehicle.component';
import { ListvehiclesComponent } from './vehicles/listvehicles.component';
import { ManufacturerService } from './service/manufacturer.service';
import { VehicleService } from './service/vehicle.service';
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    MessagesComponent,
	AlertComponent,
	PagetitleComponent,
	LoginComponent,ManufacturerComponent,VehicleComponent,ListvehiclesComponent
  ], 
	
  imports: [ 
    BrowserModule,
    FormsModule,
	HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
	ReactiveFormsModule,  
	ReactiveFormsModule, 
	MatInputModule,
	MatTableModule,
	MatToolbarModule,  
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
	NgxSpinnerModule,
	ConfirmationPopoverModule.forRoot({
     confirmButtonType: 'success' // set defaults here
    }),
	ToastyModule.forRoot()
  ],
  exports: [BrowserModule, ToastyModule],
  providers: [MessagesComponent,DataService,Title,AuthGuard,MatSort, MessageService,SortService,ToastService,AlertService,AuthenticationService,VehicleService,ManufacturerService,ContentService,UsersService,PageTitleService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {
	
}
