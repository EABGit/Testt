import { Component, EventEmitter, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
@Injectable({
  providedIn: 'root',
})
export class ConfirmationDialogComponent {
  private isOpen = new BehaviorSubject<boolean>(false);

  openPopup() {
    this.isOpen.next(true);
  }

  closePopup() {
    this.isOpen.next(false);
  }

  isOpen$() {
    return this.isOpen.asObservable();
  }
}
