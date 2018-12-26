
import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-modelos',
  templateUrl: './modelos.component.html',
  styleUrls: ['./modelos.component.css']
})

export class ModelosComponent {

  modal: MatDialogRef<ModalComponent>;

  constructor(private dialog: MatDialog) {}

  openDialog() {
    this.modal = this.dialog.open(ModalComponent);
  }
}
