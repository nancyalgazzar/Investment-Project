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
  @Input() project!: Project ;
  number : number = 1;
  remainingUnits : number = 1;
  check: number = 0 ;

  ngOnInit(){
    this.generateRandom();
    this.calcCheck();
  }

  calcCheck() {
    this.check = this.number * this.project.unit_price;
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
