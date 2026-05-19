import { Component, inject, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaymentService } from '../../Services/payment-service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-deposit-funds',
  standalone: true,
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './deposit-funds.html',
  styleUrl: './deposit-funds.css',
})
export class DepositFunds implements AfterViewInit {
  depositAmount: number = 1000;   // Default deposit amount


  private paymentService = inject(PaymentService);

  ngAfterViewInit() {
    this.paymentService.renderPayPalButtons('paypal-button-container', () => this.depositAmount);    // We pass a function '() => this.depositAmount' so the service always gets the LIVE updated value typed by the user

  }
}
