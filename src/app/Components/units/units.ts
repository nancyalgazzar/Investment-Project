import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-units',
  imports: [RouterLink],
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
