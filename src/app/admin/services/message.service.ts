import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { Messages } from '../interfaces/Messages.interface';

@Injectable({
  providedIn: 'root'
})
export class MessageServices {
  socket!: Socket;
  constructor() {
    // Conectar al servidor al inicializar el servicio
    this.connectServer();
  }

  private connectServer(){
    const idUser = localStorage.getItem('token')
    if(idUser !== null){
      this.socket = io('http://localhost:3000', {
        extraHeaders: {
          token: idUser
        }
      });
    }
  }

  sendMessage(message: string,idVenta:number,by:string): void {
    this.socket.emit('chat', {
      idVenta: idVenta,
      message: message,
      by: by
    });
  }

  onMessage(): Observable<{ messages:Messages[]}> {
    return new Observable(observer => {
      this.socket.on('chat', (payload: { messages:Messages[] }) => observer.next(payload));
      return () => this.socket.off('chat');
    });
  }
  onMessagesByJoin(idVenta:number){
    this.socket.emit('joinChat',{
      idVenta: idVenta
    })
  }
}
