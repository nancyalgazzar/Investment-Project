import { Component, Input, input } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Project } from '../../Models/projects';

@Component({
  selector: 'app-project-card',
  imports: [RouterLink],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
})
export class ProjectCard {
  @Input() data!: Project;
}
