import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { Toast } from '@ionic-native/toast/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { ModalController } from '@ionic/angular';
import { NotificationsComponent } from './../notifications/notifications.component';
import { PopoverController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

declare var Email: any;




@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  hostadded: boolean = false;
  hostdetail: any = [];
  visitordetail: any = [];
  // subscription:any;
  data: any = [];






  constructor(private nativeStorage: NativeStorage, public http: HTTP, public popctrl: PopoverController, public modalController: ModalController, public platform: Platform, private statusBar: StatusBar, private storage: Storage, private toast: Toast) {


    if (this.platform.ready()) {

      this.nativeStorage.getItem("hostdetails")
        .then(
          data => {
            /*Check whether the host details are saved on app startup, if saved , option to enter visitor details
            is shown else option to enter the host details */
            if (data != undefined) {
              this.hostadded = true;
              this.hostdetail = data;
              console.log(this.hostdetail);

            }
         
          },
          error => {
            this.toast.show(`Please add host details first`, '3000', 'bottom').subscribe(
              toast => {
               
              }
            );
            console.error(error)}
        );


    }






  }


  /* function to show three dot menu which shows option to edit host details and checkout visitor*/

  async presentRadioPopover(event) {
    const popover = await this.popctrl.create({
      component: NotificationsComponent,
      event: event,
      animated: true,
      showBackdrop: true
    });
    return await popover.present();
  }


  /* function which saves host details*/
  addhost() {
  //  console.log(this.hostdetail);
    if (this.hostdetail.name != undefined && this.hostdetail.email != undefined && this.hostdetail.phone != undefined && this.hostdetail.address != undefined) {
      this.nativeStorage.setItem("hostdetails", { name: this.hostdetail.name, email: this.hostdetail.email, phone: this.hostdetail.phone, address: this.hostdetail.address })
        .then(
          () => {
            this.hostadded = true;

            this.toast.show(`Host details added`, '3000', 'bottom').subscribe(
              toast => {
                //console.log(toast);
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

  /*function to add visitor details */
  addvisitor() {

    if (this.visitordetail.name == undefined) {

      this.toast.show(`Please enter visitor name`, '2000', 'bottom').subscribe(
        toast => {
          //console.log(toast);
        }
      );
    }
    else if (this.visitordetail.email == undefined) {

      this.toast.show(`Please enter visitor email`, '2000', 'bottom').subscribe(
        toast => {
          //console.log(toast);
        }
      );

    }
    else if (this.visitordetail.phone == undefined) {

      this.toast.show(`Please enter visitor phone`, '2000', 'bottom').subscribe(
        toast => {
          //console.log(toast);
        }
      );

    }
    else if (this.visitordetail.name != undefined && this.visitordetail.phone != undefined && this.visitordetail.email != undefined) {

      let date = new Date();
      this.nativeStorage.setItem(this.visitordetail.phone, { name: this.visitordetail.name, email: this.visitordetail.email, phone: this.visitordetail.phone, checkintime: date })
        .then(
          () => {
            //this.sendemailtohost(this.visitordetail);
            this.sendsms(this.visitordetail);
            this.sendemailsmtp(this.visitordetail);

            this.toast.show(`Visitor checked In`, '3000', 'bottom').subscribe(
              toast => {
                //console.log(toast);
              }
            );

            this.visitordetail = [];
          },
          error => console.error('Error storing item', error)
        );

    }

  }

  /*function to send email with visitor details to the host after the visitor has checked in  */
 
  sendemailsmtp(visitordetail) {

    this.nativeStorage.getItem("hostdetails").then((hostdetails => {

      let date = new Date();
      console.log(hostdetails)

      Email.send({
        Host: "smtp.elasticemail.com",
        Username: "arunchaudhary1076@gmail.com",
        Password: "b6350a97-0699-4cc7-a874-06e5d6f0fb9c",
        From: "akashchaudharymax@gmail.com",
        To: hostdetails.email,
        Subject: "New Visitor",
        Body: "Visitor details: " + "Name: " + visitordetail.name + " | Phone: " + visitordetail.phone + " | Email: " + visitordetail.email + " | Checkin Time: " + date
      }).then(
        message => console.log(message)
      );

    }))
  }



  /*function to send sms with visitor details to the host after the visitor has checked in  */

  sendsms(visitordetail) {
    let date = new Date();

    let text = "Visitor details: " + "Name: " + visitordetail.name + " | Phone: " + visitordetail.phone + " | Email: " + visitordetail.email + " | Checkin Time: " + date;

    this.nativeStorage.getItem("hostdetails").then((hostdetails => {

      let url = 'https://api.msg91.com/api/sendhttp.php?route=4&sender=TESTIN&message=' + text + '&country=91&mobiles=' + hostdetails.phone + '&authkey=305274AWuWZR4TW5dd8d506';
      this.http.get(url, {}, {}).then((error) => {
        console.log(error);
      });;

    }))



  }


  ionViewDidEnter() {
    this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    });
  }



}
