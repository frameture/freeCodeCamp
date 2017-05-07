import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { WinService } from '../../../services/win.service';

@Component({
  selector: 'app-win-form',
  templateUrl: './win-form.component.html',
  styleUrls: [ './win-form.component.scss' ]
})
export class WinFormComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private winService: WinService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  onAddWin(): void {
    const title = this.getControl('title');
    const link = this.getControl('link');

    console.log(title, link);
    this.winService
      .addWin(title, link)
      .subscribe((res) => {
        console.log(res);
      });
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      title: '',
      link: ''
    });
  }

  private getControl(control: string): string {
    return this.form.get(control).value;
  }

}
