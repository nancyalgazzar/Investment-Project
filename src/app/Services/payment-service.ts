import { Injectable, inject } from '@angular/core';
import { NotificationService } from './notification-service';

declare var paypal: any;

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private notificationService = inject(NotificationService);


  loadPayPalScript(): Promise<any> {      // load paypal SDK script dynamically and return a promise that resolves when it's loaded
    return new Promise((resolve, reject) => {
      if ((window as any).paypal) {      // If already loaded, resolve immediately
        resolve((window as any).paypal);
        return;
      }

      const script = document.createElement('script');
      // Note: "test" is the client-id. You will replace "test" with my actual PayPal Client ID later.
      script.src = 'https://www.paypal.com/sdk/js?client-id=test&currency=USD';
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

        // Finalize the transaction
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            // Success! Display a toast using your notification service
            this.notificationService.addmessage(
              `Deposit successful! Thank you, ${details.payer.name.given_name}.`,
              'success'
            );

            // Note: call this.apiService here to update the user's liquidity in db.json
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
