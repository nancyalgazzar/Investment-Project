import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Header } from "../../Components/header/header";
import { SideBar } from "../../Components/side-bar/side-bar";
import { RouterOutlet, RouterLinkActive } from "@angular/router";
import { ProjectCard } from "../../Components/project-card/project-card";
import { ProjectsService } from '../../Services/projects-service';
import { Project } from '../../Models/projects';
import { Category } from '../../Models/categories';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-project-list',
  imports: [Header, SideBar, RouterOutlet, ProjectCard, RouterLinkActive, FormsModule],
  templateUrl: './project-list.html',
  styleUrl: './project-list.css',
})
export class ProjectList {
  private projectService = inject(ProjectsService);
  private cdr = inject(ChangeDetectorRef);

  projects: Project[] = [];
  allProjects: Project[] = [];
  categories: Category[] = [];

  selectedCategory: string = '';

  search: string = '';

  ngOnInit() {
    this.projectService.getAllProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
        this.allProjects = projects;
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
        this.allProjects = projects;
        this.cdr.detectChanges();
      }
    });
    this.selectedCategory = name;
  }

  searchByProjectName() {
    const value = this.search.toLowerCase().trim();
    if(value) {
      this.projects = this.allProjects.filter((project: Project) => project.name?.toLowerCase().includes(value));
    } else {
      this.projects = this.allProjects;
    }
  }
}
