import { ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { Units } from "../units/units";
import { RouterLink } from '@angular/router';
import { ProjectsService } from '../../Services/projects-service';
import { Project } from '../../Models/projects';

@Component({
  selector: 'app-details-card',
  imports: [Units, RouterLink],
  templateUrl: './details-card.html',
  styleUrl: './details-card.css',
})
export class DetailsCard {
  private projectService = inject(ProjectsService);
  private cdr = inject(ChangeDetectorRef);
  
  @Input() id!: number;
  project! : Project;
  letter: string = '';
  description: string = '';
  mainImage: string = '';
  images: string[] = [];

  

  ngOnInit() {
    this.projectService.getProjectById(this.id).subscribe((project) => {
      this.project = project;
      this.letter = project.description[0];
      this.letter = this.letter.toUpperCase();
      this.description = project.description.slice(1);
      this.mainImage = project.images[0];
      this.images = project.images;
      this.cdr.detectChanges();
    });
  }

  changeImage(image: string): void {
    this.mainImage = image;
  }

}
