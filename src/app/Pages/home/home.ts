import { Component } from '@angular/core';
import { SideBar } from "../../Components/side-bar/side-bar";
import { Header } from "../../Components/header/header";
import { RouterOutlet } from "@angular/router";
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [SideBar, Header, RouterOutlet, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
