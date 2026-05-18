import { Component, inject, OnInit } from '@angular/core';
import { PaymentService } from '../../Services/payment-service';

@Component({
  selector: 'app-deposit-funds',
  imports: [],
  templateUrl: './deposit-funds.html',
  styleUrl: './deposit-funds.css',
})
export class DepositFunds implements OnInit {
  private paymentService = inject(PaymentService);

  ngOnInit() {
    // render the PayPal button inside the div with id="paypal-button-container"
    this.paymentService.initializePayPal('paypal-button-container', 100); // 100 = example amount
  }
}
