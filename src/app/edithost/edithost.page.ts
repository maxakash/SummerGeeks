import { Component } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Toast } from '@ionic-native/toast/ngx';
import { PopoverController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';




@Component({
  selector: 'app-edithost',
  templateUrl: './edithost.page.html',
  styleUrls: ['./edithost.page.scss'],
})
export class EdithostPage {

  hostdetail: any = [];

  constructor(private nativeStorage: NativeStorage, public router: Router, public navctrl: NavController, private toast: Toast, public popctrl: PopoverController) {

    this.nativeStorage.getItem("hostdetails")
      .then(
        data => {
          if (data != undefined) {
            this.hostdetail = data;
            console.log(this.hostdetail);


          }
        });
  }


/* function to save host details in the storage*/
  savehost() {


    console.log(this.hostdetail);
    if (this.hostdetail.name != undefined && this.hostdetail.email != undefined && this.hostdetail.phone != undefined && this.hostdetail.address != undefined) {
      this.nativeStorage.setItem("hostdetails", { name: this.hostdetail.name, email: this.hostdetail.email, phone: this.hostdetail.phone, address: this.hostdetail.address })
        .then(
          () => {

            this.toast.show(`Host details saved`, '3000', 'bottom').subscribe(
              toast => {
                this.router.navigate(['/home'])
              }
            );

          },
          error => console.error('Error storing item', error)
        );


    }


    else {
      this.toast.show(`Please add all host details`, '3000', 'bottom').subscribe(
        toast => {
          //console.log(toast);
        }
      );
    }





  }


  DismissClick() {
    this.router.navigate(['/home']);
  }



}
