import { Component } from '@angular/core';
import { Toast } from '@ionic-native/toast/ngx';
import { PopoverController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { CheckoutPage } from '../checkout/checkout.page';
import { EdithostPage } from '../edithost/edithost.page';
import { Router } from '@angular/router';




@Component({

  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent {

  constructor(public toast: Toast, public router: Router, public popctrl: PopoverController, public modalController: ModalController) { }


/*function to call edit host page with an intent */
  edithost() {
    this.DismissClick();
    this.router.navigate(['/edithost'])

  }


  /* funciton to dismiss modal controller */
  async DismissClick() {
    await this.popctrl.dismiss();
  }


/*funtion which shows screnn to checkout visitor */
  async checkoutvisitor() {
    this.DismissClick();
    const modal = await this.modalController.create({
      component: CheckoutPage,
      showBackdrop: true,
      cssClass: 'my-custom-modal-css'

    });
    return await modal.present();
  }

  

}

