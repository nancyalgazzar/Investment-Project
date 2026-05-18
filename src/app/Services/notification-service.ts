import { Injectable, signal } from '@angular/core';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  messageToShow = signal<message[]>([]);
  timers: Map<string, number> = new Map();
  addmessage(m: string, t: msgType) {
    let id = uuid();
    let mes = { msg: m, type: t, id: id };
    this.messageToShow.set([...this.messageToShow(), mes]);
    let timer = setTimeout(() => {
      this.removemsg(id);
    }, 5000);
    this.timers.set(id, timer);
  }
  clear() {
    this.messageToShow.set([]);
  }
  removemsg(id: string) {
    this.messageToShow.update((msgs) => msgs.filter((p) => p.id != id));
    this.timers.delete(id);
  }
}
