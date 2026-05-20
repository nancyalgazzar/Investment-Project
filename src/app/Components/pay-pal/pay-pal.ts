import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPayPalConfig, ICreateOrderRequest, NgxPayPalModule } from 'ngx-paypal';
import { ApiService } from '../../Services/api';
import { NotificationService } from '../../Services/notification-service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-pay-pal',
  standalone: true,
  imports: [NgxPayPalModule, CurrencyPipe],
  templateUrl: './pay-pal.html',
  styleUrl: './pay-pal.css',
})
export class PayPal implements OnInit{
  public payPalConfig?: IPayPalConfig;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private apiService = inject(ApiService);
  private notificationService = inject(NotificationService);

  projectId!: string;
  amount!: number;

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id') || '';    // Get the project ID and Amount from the URL route parameters

    this.amount = Number(this.route.snapshot.paramMap.get('check')) || 0;

    this.initConfig();    // Initialize  PayPal configuration

  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'sb', //sandbox. Replace with  Client ID later.
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: this.amount.toString(),
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: this.amount.toString()
                }
              }
            },
            items: [
              {
                name: `Sovereign Unit - Project ID: ${this.projectId}`,
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'USD',
                  value: this.amount.toString(),
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
        color: 'gold',
        shape: 'rect'
      },
      onApprove: (data, actions) => {
        console.log('Transaction approved, awaiting capture...', data);
      },
      onClientAuthorization: (data) => {
        console.log('Transaction completed successfully', data);
        this.saveInvestmentToDatabase();
      },
      onCancel: (data, actions) => {
        this.notificationService.addmessage('Payment cancelled by user.', 'warning');
      },
      onError: err => {
        this.notificationService.addmessage('An error occurred with PayPal.', 'error');
        console.error('PayPal Error:', err);
      }
    };
  }

  private saveInvestmentToDatabase() {
    const userStr = localStorage.getItem('currentUser');

    let currentUserId: string | number = 1;     // Fallback to userId 1 if no logged in user is found | match DB logic


    if (userStr) {
      const user = JSON.parse(userStr);
      currentUserId = user.id;
    }

    const newInvestment = {
      id: Date.now().toString(), // Generate a unique ID
      userId: currentUserId,
      projectId: Number(this.projectId),
      invested_amount: this.amount
    };

    this.apiService.addInvestment(newInvestment).subscribe({
      next: () => {
        this.notificationService.addmessage('Investment Successful! Asset added to holdings.', 'success');
        this.router.navigate(['/home/dashboard']);
      },
      error: () => {
        this.notificationService.addmessage('Payment received, but failed to update database.', 'error');
      }
    });
  }
}
