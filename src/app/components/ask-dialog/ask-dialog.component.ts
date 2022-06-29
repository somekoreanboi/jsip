import { Component,Inject,OnInit, } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ask-dialog',
  templateUrl: './ask-dialog.component.html',
  styleUrls: ['./ask-dialog.component.scss']
})
export class AskDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) data: { functionHolder: Function }) {
    this.okClicked = data.functionHolder;
}

  ngOnInit(): void {
  }

  okClicked: Function;


}
