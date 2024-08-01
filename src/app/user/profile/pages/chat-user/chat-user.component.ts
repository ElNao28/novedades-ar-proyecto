import { Messages } from './../../../../admin/interfaces/Messages.interface';
import { MessageServices } from './../../../../admin/services/message.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-chat-user',
  templateUrl: './chat-user.component.html',
  styleUrl: './chat-user.component.css'
})
export class ChatUserComponent implements OnInit, OnDestroy{
  messages: Messages[] = [];
  messageForm:FormGroup = this.fb.group({
    message: ['', [Validators.required]]
  });
  constructor(
    private messageService: MessageServices,
    private fb:FormBuilder,
    private messageAlert:MessageService,
    private activatedRoute:ActivatedRoute
  ) {}
  ngOnDestroy(): void {
    this.messageService.offMessagesByJoin(this.idVenta);
  }
  isLoader:boolean = true;
  idVenta:number = 0;
  ngOnInit(): void {
    const idVenta = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.idVenta = parseInt(idVenta);
    this.messageService.onMessage().subscribe(payload => {
      this.messages = payload.messages;
    });
    this.messageService.onMessagesByJoin(parseInt(idVenta))
    setTimeout(() => {
      this.isLoader = false;
    }, 500);
  }

  sendMessage(): void {
    console.log('sendMessage')
    if (this.messageForm.invalid) return this.messageAlert.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No dejes el mensaje vacío'
    });
    this.messageService.sendMessage(this.messageForm.controls['message'].value,this.idVenta,'user');
    this.messageForm.reset();
  }
}
