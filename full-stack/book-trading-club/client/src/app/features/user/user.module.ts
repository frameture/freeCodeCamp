import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { UserComponent } from './user.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [ UserComponent ]
})
export class UserModule { }
