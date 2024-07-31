import { Component, OnInit } from '@angular/core';
import { MessageServices } from '../../services/message.service';
import { Messages } from '../../interfaces/Messages.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-test',
  templateUrl: './chat-test.component.html',
  styleUrl: './chat-test.component.css'
})
export class ChatTestComponent implements OnInit{
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
  idVenta:number = 0;
  ngOnInit(): void {
    const idVenta = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.idVenta = parseInt(idVenta);
    this.messageService.onMessage().subscribe(payload => {
      this.messages = payload.messages;
    });
    this.messageService.onMessagesByJoin(this.idVenta)
  }

  sendMessage(): void {
    if (this.messageForm.invalid) return this.messageAlert.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No dejes el mensaje vacío'
    });
    this.messageService.sendMessage(this.messageForm.controls['message'].value,this.idVenta,'admin');
    this.messageForm.reset();
  }
}
