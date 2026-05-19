import { Injectable, signal, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { v4 as uuid } from 'uuid';

import { ChatMessage } from '../Models/chat-message';

@Injectable({
    providedIn: 'root'
})
export class ChatbotService {

    private http = inject(HttpClient);

    messages = signal<ChatMessage[]>([]);

    isTyping = signal(false);

    isOpen = signal(false);

    toggleChat() {

        this.isOpen.update(value => !value);

    }

    sendPrompt(prompt: string) {

        this.addUserMessage(prompt);

    }

    addUserMessage(content: string) {

        const userMessage: ChatMessage = {

            id: uuid(),

            role: 'user',

            content,

            createdAt: new Date()

        };

        this.messages.update(messages => [
            ...messages,
            userMessage
        ]);

        this.askAI(content);

    }

    askAI(message: string) {

        this.isTyping.set(true);

        this.http.post<any>(
            'http://localhost:4000/chat',
            {
                message
            }
        ).subscribe({

            next: (response) => {

                const aiMessage: ChatMessage = {

                    id: uuid(),

                    role: 'assistant',

                    content: response.reply,

                    createdAt: new Date()

                };

                this.messages.update(messages => [
                    ...messages,
                    aiMessage
                ]);

                this.isTyping.set(false);

            },

            error: (error) => {

                console.log(error);

                const errorMessage: ChatMessage = {

                    id: uuid(),

                    role: 'assistant',

                    content:
                        'Sorry, something went wrong.',

                    createdAt: new Date()

                };

                this.messages.update(messages => [
                    ...messages,
                    errorMessage
                ]);

                this.isTyping.set(false);

            }

        });

    }

}