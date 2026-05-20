import { Component, computed, inject, OnInit, signal } from '@angular/core';

import { Project } from '../../Models/projects';
import { Category } from '../../Models/categories';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectsService } from '../../Services/projects-service';
import { NotificationService } from '../../Services/notification-service';
@Component({
  selector: 'app-create-project',
  imports: [ReactiveFormsModule],
  templateUrl: './create-project.html',
  styleUrl: './create-project.css',
})
export class CreateProject {
  notify = inject(NotificationService);
  projectService = inject(ProjectsService);
  fb = inject(FormBuilder); //this the form group builder which is an injected service
  FormObject: FormGroup = //this is the form group object which will be used to bind the form controls
    this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(3)]],
      location: ['', [Validators.maxLength(100)]],
      totalPrice: [0, [Validators.required, Validators.min(0)]],
      unitPrice: [0, [Validators.min(0)]],
      description: ['', [Validators.required, Validators.maxLength(400)]],
      category: [''],
      imageUrls: this.fb.array([]), //this is the form array which will be used to bind the image urls form controls this array is dynamic lenght
    });
  ngOnInit() {
    this.projectService.getCategories().subscribe({
      next: (value) => {
        this.categories.set(value as Category[]);
      },
      error(err) {
        console.log('error fetching data');
      },
    });
    Promise.resolve().then(() => this.AddImageURL());
  }

  get imagesURLS(): FormArray {
    return this.FormObject.get('imageUrls') as FormArray;
  }
  categories = signal<Category[]>([]);
  AddImageURL() {
    this.imagesURLS.push(
      this.fb.control('', [
        Validators.required,
        Validators.pattern(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i),
      ]),
    );
  }
  RemoveImageURL(index: number) {
    if (this.imagesURLS.length > 1) this.imagesURLS.removeAt(index);
  }
  onSubmit() {
    if (this.FormObject.invalid) {
      this.FormObject.markAllAsTouched();
      return;
    }
    const project: Project = {
      id: null,
      name: this.FormObject.value.name,
      description: this.FormObject.value.description,
      category: this.FormObject.value.category,
      location: this.FormObject.value.location,
      price: this.FormObject.value.totalPrice,
      unit_price: this.FormObject.value.unitPrice,
      images: this.imagesURLS.value.filter((url: string) => url.trim() !== ''),
    };
    console.log(project);
    this.projectService.addProject(project).subscribe({
      next: () => {
        this.notify.addmessage('the Project is created sucessfuly', 'success');
        this.Cancel();
      },
      error: (err) => {
        this.notify.addmessage('Error while Creating the Project please try again later', 'error');

        console.log('error', err);
      },
    });
  }
  Cancel() {
    this.imagesURLS.clear();
    this.FormObject.reset();
  }
}
