import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ChatbotService } from '../../Services/chatbot-service';

@Component({
  selector: 'app-chatbot-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chatbot-input.html',
  styleUrl: './chatbot-input.css'
})
export class ChatbotInput {

  chatbotService = inject(ChatbotService);

  message = '';

  handleKeyDown(event: KeyboardEvent) {

    if(event.key === 'Enter' && !event.shiftKey){

      event.preventDefault();

      this.sendMessage();

    }

  }

  sendMessage() {

    if(!this.message.trim()) return;

    this.chatbotService.addUserMessage(
      this.message.trim()
    );

    this.message = '';

  }

}