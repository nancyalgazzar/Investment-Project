import { Component } from '@angular/core';
import { SideBar } from "../../Components/side-bar/side-bar";
import { Header } from "../../Components/header/header";
import { RouterOutlet } from "@angular/router";
import { RouterLink } from '@angular/router';
import { ChatbotShell } from "../../Components/chatbot-shell/chatbot-shell";
@Component({
  imports: [SideBar, Header, RouterOutlet, RouterLink, ChatbotShell],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
