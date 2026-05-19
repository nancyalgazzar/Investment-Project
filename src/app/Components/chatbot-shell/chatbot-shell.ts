import {
  Component,
  inject,
  ElementRef,
  ViewChild,
  effect
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { ChatbotService } from '../../Services/chatbot-service';

import { ChatbotInput } from '../chatbot-input/chatbot-input';
import { ChatbotMessage } from '../chatbot-message/chatbot-message';
import { TypingIndicator } from '../typing-indicator/typing-indicator';

@Component({
  selector: 'app-chatbot-shell',
  standalone: true,
  imports: [
    CommonModule,
    ChatbotInput,
    ChatbotMessage,
    TypingIndicator
  ],
  templateUrl: './chatbot-shell.html',
  styleUrl: './chatbot-shell.css'
})
export class ChatbotShell {

  chatbotService = inject(ChatbotService);

  @ViewChild('messagesContainer')
  messagesContainer!: ElementRef;

  constructor() {

    effect(() => {

      this.chatbotService.messages();

      setTimeout(() => {
        this.scrollToBottom();
      });

    });

  }

  scrollToBottom() {

    if(this.messagesContainer){

      const element =
        this.messagesContainer.nativeElement;

      element.scrollTop = element.scrollHeight;

    }

  }

}