import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EdithostPage } from './edithost.page';

const routes: Routes = [
  {
    path: '',
    component: EdithostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EdithostPageRoutingModule {}
