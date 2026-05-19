import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { marked } from 'marked';

@Component({
  selector: 'app-chatbot-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chatbot-message.html',
  styleUrl: './chatbot-message.css'
})
export class ChatbotMessage {

  @Input() message: any;

  get formattedMessage(): string {
    return marked.parse(this.message.content || '') as string;
  }
}