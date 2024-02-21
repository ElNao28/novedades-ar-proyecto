import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertType } from '../../interfaces/Alert.interface';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  @Input()
  typeAlert:AlertType = {
    type: 'ok',
    message: '',
  };
  @Output()
  alertState = new EventEmitter<boolean>();

  changeState(){
    this.alertState.emit(false)
  }
}
