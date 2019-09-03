import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements OnInit {

  content: string;
  constructor(protected dialogRef: NbDialogRef<AlertModalComponent>) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

}
