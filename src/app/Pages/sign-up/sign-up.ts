import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl,ValidationErrors} from '@angular/forms';
import { AuthenticationService } from '../../Services/authentication-service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css'
})
export class SignUpComponent {

  signUpForm: FormGroup;

  showPassword = false;
  showConfirmPassword = false;

  selectedFileName = '';

  constructor(private fb: FormBuilder,private authService:AuthenticationService) {

    this.signUpForm = this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(3)]],

        lastName: ['', [Validators.required, Validators.minLength(3)]],

        email: ['', [Validators.required,Validators.email]],

        password: ['', [Validators.required,Validators.minLength(8),
          // password have at least one 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character, minimum 8 characters
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          )
        ]],

        confirmPassword: ['', [Validators.required]],

        //verificationId: [null, Validators.required],
        role: ['user', Validators.required]
      },
      {
        validators: this.passwordMatchValidator
      }
    );
  }

  passwordMatchValidator(
    form: AbstractControl
  ): ValidationErrors | null {

    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }

    return null;
  }

  /*
  onFileSelected(event: any) {

    const file = event.target.files[0];

    if (file) {

      this.selectedFileName = file.name;

      this.signUpForm.patchValue({
        verificationId: file
      });
    }
  }
    */

 onSubmit() {

  if (this.signUpForm.valid) {

    const formData = {
      firstName: this.signUpForm.value.firstName,
      lastName: this.signUpForm.value.lastName,
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password,
      role:this.signUpForm.value.role
    };
    

    this.authService.register(formData).subscribe({
      next: (res: any) => {
        console.log(res);
        alert('Account Created Successfully');
        this.signUpForm.reset();
      },

      error: (err) => {
        console.log(err);
      }
    });
  }
}

  get firstName() {
    return this.signUpForm.get('firstName');
  }

  get lastName() {
    return this.signUpForm.get('lastName');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  get verificationId() {
    return this.signUpForm.get('verificationId');
  }

  get role() {
    return this.signUpForm.get('role');
  }
}