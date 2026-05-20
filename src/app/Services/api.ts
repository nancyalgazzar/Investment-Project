import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000';

  private refreshSource = new Subject<void>();
  refresh$ = this.refreshSource.asObservable();

  triggerRefresh() {
    this.refreshSource.next();
  }

  getUserInvestments(userId: string | number): Observable<any[]> {
    // The &_expand=project trick combines the investment with the project details
    return this.http.get<any[]>(`${this.baseUrl}/user_projects?userId=${userId}&_expand=project`);

  }

  addInvestment(investment: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/user_projects`, investment);
  }
  // Fetch a single user by ID to get their latest liquidity
  getUser(userId: string | number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users/${userId}`);
  }

  // Update the user's liquidity field
  updateUserLiquidity(userId: string | number, newLiquidity: number): Observable<any> {
    return this.http.patch(`${this.baseUrl}/users/${userId}`, { liquidity: newLiquidity });
  }
}
