import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Header } from "../header/header";
import { SideBar } from "../side-bar/side-bar";
import { RouterOutlet, RouterLinkActive } from "@angular/router";
import { ProjectCard } from "../project-card/project-card";
import { ProjectsService } from '../../Services/projects-service';
import { Project } from '../../Models/projects';
import { Category } from '../../Models/categories';

@Component({
  selector: 'app-project-list',
  imports: [Header, SideBar, RouterOutlet, ProjectCard, RouterLinkActive],
  templateUrl: './project-list.html',
  styleUrl: './project-list.css',
})
export class ProjectList {
  private projectService = inject(ProjectsService);
  private cdr = inject(ChangeDetectorRef);

  projects: Project[] = [];
  categories: Category[] = [];

  selectedCategory: string = '';

  ngOnInit() {
    this.projectService.getAllProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
        this.cdr.detectChanges();
      }
    });
    this.projectService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.cdr.detectChanges();
      }
    });
  }
  filter(name : string) {
    this.projectService.getProjectsByCategory(name).subscribe({
      next: (projects) => {
        this.projects = projects;
        this.cdr.detectChanges();
      }
    });
    this.selectedCategory = name;
  }
}
