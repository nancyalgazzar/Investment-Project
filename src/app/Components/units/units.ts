import { Component, Input } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Project } from '../../Models/projects';

@Component({
  selector: 'app-units',
  imports: [RouterLink],
  templateUrl: './units.html',
  styleUrl: './units.css',
})
export class Units {
    private _project!: Project;

  // Intercept the project Input with a setter to prevent undefined startup errors

  @Input()


 set project(value: Project) {
    this._project = value;
    if (value) {
      this.calcCheck();
    }
  }
 get project(): Project {
    return this._project;
  }



  number : number = 1;
  remainingUnits : number = 1;
  check: number = 0 ;

  ngOnInit(){
    this.generateRandom();
    this.calcCheck();
  }

  // calcCheck() {
  //   this.check = this.number * this.project.unit_price;
  // }

 calcCheck() {
    if (this.project && this.project.unit_price) {    // Ensure check is never calculated as NaN or 0 on startup
      this.check = this.number * this.project.unit_price;
    } else {
      this.check = 0;
    }
  }






  countplus(){
    if (this.number >= 50) return;
    this.number ++;
    this.calcCheck();
  }

  countminus(){
    if (this.number <= 1) return;
    this.number --;
    this.calcCheck();
  }
  generateRandom(){
    this.remainingUnits = Math.floor(Math.random() * 100);
  }

}
