import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EdithostPageRoutingModule } from './edithost-routing.module';

import { EdithostPage } from './edithost.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EdithostPageRoutingModule
  ],
  declarations: [EdithostPage]
})
export class EdithostPageModule {}
