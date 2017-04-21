import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Poll } from '../../../models/poll';
import { PollService } from '../../../services/poll.service';

@Component({
  templateUrl: './poll-form.component.html',
  styleUrls: [ './poll-form.component.scss' ]
})
export class PollFormComponent implements OnInit {

  errorInfo: string;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private pollService: PollService,
    private router: Router
  ) { }

  getOptions(): FormArray {
    return this.form.get('options') as FormArray;
  }

  ngOnInit() {
    this.createForm();
  }

  onNewOption(): void {
    this.getOptions().push(new FormControl(''));
  }

  onSubmit(): void {
    const poll: Poll = this.getControls();
    console.log(poll);

    this.pollService
      .addPoll(poll)
      .subscribe((res) => {
        if (res.message) { return this.errorInfo = res.message; }
        this.router.navigate([ '/' ]);
      });
  }

  onReset(): void {
    this.errorInfo = '';
    this.form.reset({
      pollName: '',
      options: this.fb.array([ '', '' ])
    });
  };

  onRemoveOption(): void {
    const length = this.getOptions().controls.length;
    if (length === 2) { return; };

    this.getOptions().removeAt(length - 1);
  }

  private createForm(): void {
    this.form = this.fb.group({
      pollName: '',
      options: this.fb.array([ '', '' ])
    });
  }

  private getControls(): Poll {
    const name = this.form.get('pollName').value;
    const options = this.form.get('options').value;
    return new Poll(name, options);
  }

}
