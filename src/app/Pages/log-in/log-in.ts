import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../Services/authentication-service';
import { Router } from '@angular/router';
import { Users } from '../../Models/users';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './log-in.html',
  styleUrl: './log-in.css'
})
export class LoginComponent {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  showPassword: boolean = false;

  loginData = {
    email: '',
    password: ''
  };

  onSubmit(form: NgForm) {
    if (form.valid) {

      this.authService
        .login(this.loginData.email, this.loginData.password)
        .subscribe({
          next: (res: any) => {

            // if(res!=null) // response is an array that is empty if login is wrong or array contains valid returned user json so i get length of array in check and if there is valid logged in user the array length become > 0
            if (res.length > 0) { //reponse is array [] or [{user}]

              localStorage.setItem(
                'currentUser',
                JSON.stringify(res)
              );

              console.log('Logged in successfully');
              console.log(res); 

              this.router.navigate(['/dashboard']);

            } else {
              console.log(res); 
              alert('Invalid email or password');
            }
          },

          error: (err) => {
            console.error(err);
            alert('Login failed');
          }
        });
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
