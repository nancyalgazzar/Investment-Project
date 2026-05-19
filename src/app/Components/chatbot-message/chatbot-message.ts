import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chatbot-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chatbot-message.html',
  styleUrl: './chatbot-message.css'
})
export class ChatbotMessage {

  @Input() message: any;

}