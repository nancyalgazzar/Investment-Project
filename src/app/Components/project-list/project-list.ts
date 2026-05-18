import { Component } from '@angular/core';
import { Header } from "../header/header";
import { SideBar } from "../side-bar/side-bar";
import { RouterOutlet } from "@angular/router";
import { ProjectCard } from "../project-card/project-card";

@Component({
  selector: 'app-project-list',
  imports: [Header, SideBar, RouterOutlet, ProjectCard],
  templateUrl: './project-list.html',
  styleUrl: './project-list.css',
})
export class ProjectList {}
