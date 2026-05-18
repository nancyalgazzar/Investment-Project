import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000';

  // Fetches a user's logged investment records from the relation link map
  getUserInvestments(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/user_projects?userId=${userId}&_expand=project`);
  }
}
