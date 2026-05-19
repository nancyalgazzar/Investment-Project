import { Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { NotificationService } from '../../Services/notification-service';
@Component({
  selector: 'app-toast',
  imports: [NgClass],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast {

  notification = inject(NotificationService)

}
