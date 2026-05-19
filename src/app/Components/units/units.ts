import { Component } from '@angular/core';

@Component({
  selector: 'app-units',
  imports: [],
  templateUrl: './units.html',
  styleUrl: './units.css',
})
export class Units {
  number : number = 1;

  countplus(){
    this.number ++;
  }

  countminus(){
    this.number --;
  }
}
