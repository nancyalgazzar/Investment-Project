import { Injectable, inject } from '@angular/core';
import { NotificationService } from './notification-service';
import { ApiService } from './api';

declare var paypal: any;

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private notificationService = inject(NotificationService);
  private apiService = inject(ApiService);


  loadPayPalScript(): Promise<any> {      // load paypal SDK script dynamically and return a promise that resolves when it's loaded
    return new Promise((resolve, reject) => {
      if ((window as any).paypal) {      // If already loaded, resolve immediately
        resolve((window as any).paypal);
        return;
      }

      const script = document.createElement('script');

      //AcDuWpnV5P7HRs8zAW7n-jiIki5NkCWMt4mKDHxDzU4dpe5LOQRLfX7V8stqweQKXx0vri2qa7rDaDf0 => sb within URL
      script.src = 'https://www.paypal.com/sdk/js?client-id=sb&currency=USD';
      script.onload = () => resolve((window as any).paypal);
      script.onerror = (err) => reject(err);
      document.body.appendChild(script);
    });
  }
  renderPayPalButtons(containerId: string, getAmount: () => number) {
    this.loadPayPalScript().then((paypal) => {
      paypal.Buttons({
        // Setup the transaction
        createOrder: (data: any, actions: any) => {
          const amount = getAmount(); // Grabs the live amount from the UI
          if (amount <= 0) {
            this.notificationService.addmessage('Please enter a valid amount greater than 0.', 'warning');
            return;
          }
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: amount.toString(),
                currency_code: 'USD'
              }
            }]
          });
        },

        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
             const amountDeposited = getAmount();
             const userStr = localStorage.getItem('currentUser');
             if (userStr) {
              const user = JSON.parse(userStr);

              //  Get current user data to find their current liquidity
              this.apiService.getUser(user.id).subscribe({
                next: (userData) => {
                  const currentLiquidity = userData.liquidity || 0;
                  const newLiquidity = currentLiquidity + amountDeposited;

                  //  Update the database with the new total
                  this.apiService.updateUserLiquidity(user.id, newLiquidity).subscribe({
                    next: () => {
                      this.notificationService.addmessage(
                        `Deposit of $${amountDeposited} successful!`,
                        'success'
                      );
                    },
                    error: () => this.notificationService.addmessage('Failed to update account balance.', 'error')
                  });
                }
              });
            } else {
               this.notificationService.addmessage('User session not found.', 'error');
            }
            this.notificationService.addmessage(            // Success

              `Deposit successful! Thank you, ${details.payer.name.given_name}.`,
              'success'
            );
          });
        },
        onError: (err: any) => {
          console.error(err);
          this.notificationService.addmessage('Transaction could not be processed.', 'error');
        }

      }).render(`#${containerId}`);
    }).catch(err => {
      this.notificationService.addmessage('Failed to load the payment gateway.', 'error');
    });
  }
}
