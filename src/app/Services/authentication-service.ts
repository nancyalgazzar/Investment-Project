import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  // Register User
  register(userData: any): Observable<any> {
    return this.http.post(this.apiUrl, userData);
  }

  // Get All Users
  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Login
  login(email: string, password: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}?email=${email}&password=${password}`
    );
  }
}