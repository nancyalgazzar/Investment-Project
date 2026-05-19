import { Component } from '@angular/core';
import { Units } from "../units/units";

@Component({
  selector: 'app-details-card',
  imports: [Units],
  templateUrl: './details-card.html',
  styleUrl: './details-card.css',
})
export class DetailsCard {
  mainImage: string =
    'Images/duck.gif';

  images: string[] = [
    'Images/duck.gif',

    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',

    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',

    'https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1200&auto=format&fit=crop'
  ];


  changeImage(image: string): void {
    this.mainImage = image;
  }

}
