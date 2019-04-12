import { Injectable } from '@angular/core';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
import {Observable} from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class ToastService {
  constructor(private toastyService:ToastyService, private toastyConfig: ToastyConfig) {  

  }
  addToast(obj:any) {   
    Observable.timer(500).subscribe(x => {
            // Or create the instance of ToastOptions 
            var toastOptions:ToastOptions = {
                title: obj.title ? obj.title : "Title",
                msg: obj.msg ? obj.msg : "Message",
                showClose: true,
                timeout: 5000,
                theme: 'bootstrap',// Possible values: default, bootstrap, material 
                onAdd: (toast:ToastData) => {
                  //console.log('Toast ' + toast.id + ' has been added!');
                },
                onRemove: function(toast:ToastData) {
                  //console.log('Toast ' + toast.id + ' has been removed!');
                }
            };
            var type = obj.type ? obj.type : "default";
            switch (type) {
                case 'default': this.toastyService.default(toastOptions); break;
                case 'info': this.toastyService.info(toastOptions); break;
                case 'success': this.toastyService.success(toastOptions); break;
                case 'wait': this.toastyService.wait(toastOptions); break;
                case 'error': this.toastyService.error(toastOptions); break;
                case 'warning': this.toastyService.warning(toastOptions); break;
            }
    });
	
  }
}
