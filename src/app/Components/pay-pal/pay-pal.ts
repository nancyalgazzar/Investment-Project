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
export class PayPal implements OnInit {
  public payPalConfig?: IPayPalConfig;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private apiService = inject(ApiService);
  private notificationService = inject(NotificationService);

  projectId!: string;
  amount!: number;

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id') || '';
    this.amount = Number(this.route.snapshot.paramMap.get('check')) || 0;

    // Safety check to prevent rendering with 0 values
    if (this.amount > 0) {
      this.initConfig();
    }
  }
// #region old PayPal Configuration
  private initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'AcDuWpnV5P7HRs8zAW7n-jiIki5NkCWMt4mKDHxDzU4dpe5LOQRLfX7V8stqweQKXx0vri2qa7rDaDf0',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: Number(this.amount).toFixed(2),
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: Number(this.amount).toFixed(2)
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
                  value: Number(this.amount).toFixed(2),
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
// #endregion

// #region new PayPal Configuration - Simplified to reduce validation errors
//new
// private initConfig(): void {
//     this.payPalConfig = {
//       currency: 'USD',
//       clientId: 'AcjcRfgnLnb9PjUnGpCUs9VSNqdL9dOPHrzrrPFTu_sY4rXJXuF3KnJyROc-dXi8q3PXocdgxQKvdTQT',
//       createOrderOnClient: (data) => <ICreateOrderRequest>{
//         intent: 'CAPTURE',
//         purchase_units: [
//           {
//             amount: {
//               currency_code: 'USD',
//               // Use fixed 2 decimals always
//               value: Number(this.amount).toFixed(2)
//               // Removed complex 'breakdown' object to reduce validation errors
//             }
//           }
//         ]
//       },
//       advanced: { commit: 'true' },
//       style: { label: 'paypal', layout: 'vertical', color: 'gold', shape: 'rect' },

//       onClientAuthorization: (data) => {
//         this.saveInvestmentToDatabase();
//       },
//       onError: err => {
//         console.error('PayPal Error:', err);
//       }
//     };
//   }
// #endregion

private saveInvestmentToDatabase() {
    const userStr = localStorage.getItem('currentUser');
    let currentUserId: string | number = 1;

    if (userStr) {
      const userObj = JSON.parse(userStr);
      const user = Array.isArray(userObj) ? userObj[0] : userObj;
      currentUserId = user.id;
    }

    const newInvestment = {
      id: Date.now().toString(),
      userId: currentUserId,
      projectId: Number(this.projectId),
      invested_amount: Number(this.amount)
    };

    this.apiService.addInvestment(newInvestment).subscribe({
      next: () => {
        this.apiService.triggerRefresh();
        this.notificationService.addmessage('Investment Successful! Asset added to holdings.', 'success');
        this.router.navigate(['/home/dashboard']);
      },
      error: (err) => {
        console.error('Database write error:', err);
        this.notificationService.addmessage('Payment received, but failed to update database.', 'error');
      }
    });
  }
}
