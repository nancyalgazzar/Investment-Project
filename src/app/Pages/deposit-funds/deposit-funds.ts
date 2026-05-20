import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { IPayPalConfig, ICreateOrderRequest, NgxPayPalModule } from 'ngx-paypal';
import { NotificationService } from '../../Services/notification-service';
import { ApiService } from '../../Services/api';

@Component({
  selector: 'app-deposit-funds',
  standalone: true,
  imports: [FormsModule, CurrencyPipe, NgxPayPalModule],
  templateUrl: './deposit-funds.html',
  styleUrl: './deposit-funds.css',
})
export class DepositFunds implements OnInit {
  depositAmount: number = 100;

  public payPalConfig?: IPayPalConfig;
  private notificationService = inject(NotificationService);
  private apiService = inject(ApiService);

  ngOnInit() {
    this.initConfig();
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'AcDuWpnV5P7HRs8zAW7n-jiIki5NkCWMt4mKDHxDzU4dpe5LOQRLfX7V8stqweQKXx0vri2qa7rDaDf0',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
              currency_code: 'USD',
              // Use Number().toFixed(2) to satisfy strict PayPal API formatting rules
              value: Number(this.depositAmount).toFixed(2),
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: Number(this.depositAmount).toFixed(2)
                }
              }
            },
            items: [{
                name: `Wallet Deposit`,
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'USD',
                  value: Number(this.depositAmount).toFixed(2),
                },
            }]
        }]
      },
      advanced: { commit: 'true' },
      style: { label: 'paypal', layout: 'vertical', color: 'gold', shape: 'rect' },

      onApprove: (data, actions) => {
        console.log('Deposit approved, awaiting capture...', data);
      },
      onClientAuthorization: (details: any) => {
        console.log('Deposit completed successfully', details);
        this.processDeposit(details);
      },
      onCancel: (data, actions) => {
        this.notificationService.addmessage('Deposit cancelled.', 'warning');
      },
      onError: err => {
        this.notificationService.addmessage('PayPal error during deposit.', 'error');
        console.error('PayPal Deposit Error:', err);
      }
    };
  }

  private processDeposit(details: any): void {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      const userObj = JSON.parse(userStr);
      const user = Array.isArray(userObj) ? userObj[0] : userObj;

      this.apiService.getUser(user.id).subscribe({
        next: (userData) => {
          const currentLiquidity = userData.liquidity || 0;
          // Enforce mathematical addition rather than string concatenation
          const newLiquidity = currentLiquidity + Number(this.depositAmount);

          this.apiService.updateUserLiquidity(user.id, newLiquidity).subscribe({
            next: () => {
              this.notificationService.addmessage(
                `Deposit of $${this.depositAmount} successful! Thank you, ${details.payer.name.given_name}.`,
                'success'
              );
            },
            error: (err) => {
              console.error('Failed to patch user balance update:', err);
              this.notificationService.addmessage('Failed to update account balance.', 'error');
            }
          });
        },
        error: (err) => {
          console.error('Failed to read user liquidity profile:', err);
          this.notificationService.addmessage('Account profile verification failed.', 'error');
        }
      });
    } else {
       this.notificationService.addmessage('User session not found.', 'error');
    }
  }
}
