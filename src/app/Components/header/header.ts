import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [CurrencyPipe],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  totalNetWorth: number = 1000000;
  avaliableLiquidity: number = 500000;

  
}
