import { Messages } from './../../../../admin/interfaces/Messages.interface';
import { MessageServices } from './../../../../admin/services/message.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-chat-user',
  templateUrl: './chat-user.component.html',
  styleUrl: './chat-user.component.css'
})
export class ChatUserComponent implements OnInit{
  messages: Messages[] = [];
  messageForm:FormGroup = this.fb.group({
    message: ['', [Validators.required]]
  });
  constructor(
    private messageService: MessageServices,
    private fb:FormBuilder,
    private messageAlert:MessageService
  ) {}

  ngOnInit(): void {
    this.messageService.onMessage().subscribe(payload => {
      this.messages = payload.messages;
    });
    this.messageService.onMessagesByJoin(112)
  }

  sendMessage(): void {
    console.log('sendMessage')
    if (this.messageForm.invalid) return this.messageAlert.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No dejes el mensaje vacío'
    });
    this.messageService.sendMessage(this.messageForm.controls['message'].value,112,'user');
    this.messageForm.reset();
  }
}
