import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Toast } from '@ionic-native/toast/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

declare var Email: any;



@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage {

  visitordetail: any;
  hostdetails: any;
  visitorphone: any;
  itemsCollection: any;

  constructor(public afs: AngularFirestore, private nativeStorage: NativeStorage, public http: HTTP, public platform: Platform, private storage: Storage, private toast: Toast) {




  }
 /*function to checkout visitor */

  checkout() {

    console.log(this.visitorphone);
  
    this.nativeStorage.getItem("hostdetails")
      .then(
        data => {
          console.log(data)
          this.hostdetails = data;

        },
        error => console.error(error)
      );
    this.nativeStorage.getItem(this.visitorphone)
      .then(
        data => {
          console.log(data)
          this.visitordetail = data;
          this.addUser();
        },
        error =>{
          this.toast.show(`Visitor doesnot exist`, '3000', 'bottom').subscribe(
            toast => {
              //console.log(toast);
            }
          );
          console.error(error)}
      );




  }

/*function to save visitor details in the firebase firestore */
  addUser() {
    let date = new Date();


    this.afs.collection('/visitors').add({
      name: this.visitordetail.name,
      email: this.visitordetail.email,
      phone: this.visitordetail.phone,
      checkintime: this.visitordetail.checkintime,
      checkouttime: date

    })
      .then(
        (res) => {

          //console.log(res)

          this.sendemailtovisitor();
          this.toast.show(`Visitor checkout successfull.`, '3000', 'bottom').subscribe(
            toast => {
              //console.log(toast);
            }
          );


        }, error => console.log(error)

      )



  }


  /*function to send email to visitor with details of visit
  */

  sendemailtovisitor() {

    let date = new Date();
    Email.send({
      Host: "smtp.elasticemail.com",
      Username: "arunchaudhary1076@gmail.com",
      Password: "b6350a97-0699-4cc7-a874-06e5d6f0fb9c",
      From: "akashchaudharymax@gmail.com",
      To: this.visitordetail.email,
      Subject: "Visit Completed",
      Body: "Visit details: " + "Name: " + this.visitordetail.name + " | Phone: " + this.visitordetail.phone + " | Checkin Time: " + this.visitordetail.checkintime + " | Checkout Time: " + date + " | Host name: " + this.hostdetails.name + " | Address visited: " + this.hostdetails.address
    }).then(
      message => console.log(message)
    );


  }


}
